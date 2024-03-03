import { format, type ResultSetHeader, type RowDataPacket } from 'mysql2';
import { initConnection } from './config';

export async function getProfile(userId: string): Promise<RowDataPacket> {
	const conn = await initConnection();
	conn.connect();

	const escapedId = conn.escape(userId);

	const sql =
		'SELECT u.id AS id, u.email AS email, u.fname AS firstname, u.lname AS lastname, u.address AS address \
    FROM USERS AS u\
    WHERE u.id = ' + escapedId;

	const [row] = await conn.query(sql, escapedId);
	conn.destroy();

	return row as RowDataPacket;
}

export async function updateProfile(
	userId: string,
	firstname?: string,
	lastname?: string,
	address?: string
) {
	const conn = await initConnection();
	conn.connect();

	const escapedId = conn.escape(userId),
		escapedFirstname = firstname ? conn.escape(firstname) : null,
		escapedLastname = lastname ? conn.escape(lastname) : null,
		escapedAddress = address ? conn.escape(address) : null;

	const sql =
		'UPDATE USERS SET \
	fname = COALESCE(?, fname),\
	lname = COALESCE(?, lname),\
	address = COALESCE(?, address)\
	WHERE id = ?';

	console.log(format(sql, [escapedFirstname, escapedLastname, escapedAddress, escapedId]));
	const [result] = (await conn.query(sql, [
		escapedFirstname,
		escapedLastname,
		escapedAddress,
		escapedId
	])) as ResultSetHeader[];
	conn.destroy();

	return result;
}
