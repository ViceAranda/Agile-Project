// This file contains queries to the Database regarding products
import { initConnection } from './config';

/**
 * Might throw an error!
 * @returns Products
 */
export async function selectAll() {
    const conn = await initConnection();
    conn.connect();

    const sql = 'SELECT * FROM PRODUCTS';
    const [ rows ] = await conn.query(sql);
    return rows;
}