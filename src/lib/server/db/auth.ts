import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { initConnection } from './config';
import type { User } from '@types';

/**
 * Checks if the provided email is still available
 * @param email
 * @returns true if email is available, otherwise false
 */
export async function checkEmailAvailable(email: string): Promise<boolean> {
	const conn = await initConnection();
	conn.connect();

	const sql = 'SELECT id FROM USERS WHERE email = ?';
	const [result] = (await conn.query(sql, email)) as RowDataPacket[];

	return result.length === 0;
}

export async function createUser(user: User): Promise<ResultSetHeader> {
	const conn = await initConnection();
	conn.connect();

	const sql = 'INSERT INTO USERS SET ?';
	const [result] = await conn.query(sql, user);

	return result as ResultSetHeader;
}

export async function getUser(email: string, password: string): Promise<RowDataPacket> {
	const conn = await initConnection();
	conn.connect();

	const sql = 'SELECT * FROM USERS WHERE email = ? AND password = ?';
	const [result] = (await conn.query(sql, [email, password])) as RowDataPacket[];

	return result;
}
