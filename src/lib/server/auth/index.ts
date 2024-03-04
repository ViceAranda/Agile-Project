import type { User } from '@types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { ResultSetHeader } from 'mysql2';
import { insertUser } from '../db/auth';
import type { Cookies } from '@sveltejs/kit';
import { JWT_ACCESS_SECRET } from '$env/static/private';

/**
 * Generates a salt and hashes the provided password with it.
 * @param password
 * @returns hashedPassword
 */
export function securePassword(password: string): string {
	const hash = bcrypt.hashSync(password, 16);
	return hash;
}

/**
 * Compares user-provided password with stored hash.
 * @param password
 * @param storedHash
 * @returns boolean
 */
export function comparePasswords(password: string, storedHash: string) {
	console.log(password, storedHash);
	return bcrypt.compareSync(password, storedHash);
}

export async function registerUser(user: User): Promise<string | null> {
	let result: ResultSetHeader;
	try {
		result = await insertUser(user);
		if (result.affectedRows === 0) return null;
		const token = getJWT(user);
		return token;
	} catch (error) {
		console.error('insertUser: ', error);
		return null;
	}
}

export function getJWT(user: User) {
	const token = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: '2d' });
	return token;
}

export function verifyToken(token: string): User {
	return jwt.verify(token, JWT_ACCESS_SECRET) as User;
}

export function setAuthToken(cookies: Cookies, token: string) {
	cookies.set('AuthorizationToken', `Bearer ${token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/'
	});
}
