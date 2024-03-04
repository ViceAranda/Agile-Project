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
	conn.destroy();

	return result.length === 0;
}

export async function createUser(user: User): Promise<ResultSetHeader> {
	const conn = await initConnection();
	conn.connect();

	const sql = 'INSERT INTO USERS SET ?';
	const [result] = await conn.query(sql, user);
	conn.destroy();

	return result as ResultSetHeader;
}

export async function findUser(email: string) {
	const conn = await initConnection();
	conn.connect();

	const sql = 'SELECT password FROM USERS WHERE email = ?';
	const [result] = await conn.query(sql, [email]);
	conn.destroy();

	return result as RowDataPacket[];
}
