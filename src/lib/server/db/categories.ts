// This file contains queries to the Database regarding categories
import { initConnection } from './config';

/**
 * Gets every available category. Might throw an error!
 * @returns List of categories.
 */
export async function selectAll() {
    const conn = await initConnection();
    conn.connect();

    const sql = 'SELECT * FROM CATEGORIES';
    const [ rows ] = await conn.query(sql);

    conn.destroy();
    return rows;
}
