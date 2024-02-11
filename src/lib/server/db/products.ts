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

    conn.destroy();
    return rows;
}

/**
 * Might return errors
 * @param category 
 * @returns List of Products
 */
export async function selectByCategory(category: string) {
    const conn = await initConnection();
    conn.connect();

    const sql = `SELECT PRODUCTS.* FROM PRODUCTS 
    INNER JOIN CATEGORIES ON PRODUCTS.category_id = CATEGORIES.id 
    WHERE CATEGORIES.name = ` + conn.escape(category);

    const [ rows ] = await conn.query(sql);
    conn.destroy();
    return rows;
}