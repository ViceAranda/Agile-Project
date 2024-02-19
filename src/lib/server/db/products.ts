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
 * Get product by id. Might throw an error!
 * @returns Products
 */
export async function selectById(id: string) {
    const conn = await initConnection();
    conn.connect();

    const sql = 'SELECT * FROM PRODUCTS WHERE id = ' + conn.escapeId(id);
    const [ rows ] = await conn.query(sql);

    conn.destroy();
    return rows;
}

/**
 * Might throw error
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

/**
 * Might throw error
 * @param schoolId 
 * @returns List of Products
 */
export async function selectBySchool(schoolId: string) {
    const conn = await initConnection();
    conn.connect();

    const sql = `SELECT PRODUCTS.* FROM PRODUCTS
    INNER JOIN SCHOOLS ON PRODUCTS.school_id = SCHOOLS.id
    WHERE SCHOOLS.id = ` + conn.escapeId(schoolId);

    const [ rows ] = await conn.query(sql);
    conn.destroy();
    return rows;
}

/**
 * Matches search term agains product and categories' names.
 * Might throw error
 * @param searchTerm 
 * @returns List of Products
 */
export async function fuzzySelect(searchTerm: string) {
    const conn = await initConnection();
    conn.connect();

    const escapedTerm = conn.escape(searchTerm).replace(/^'(.*)'$/, '$1');
    const sql = `SELECT P.* ,C.name AS category FROM PRODUCTS AS P
    JOIN PRODUCT_CATEGORIES ON P.id = PRODUCT_CATEGORIES.product_id
    JOIN CATEGORIES AS C ON PRODUCT_CATEGORIES.category_id = C.id
    WHERE P.name LIKE '%${escapedTerm}%' OR C.name LIKE '%${escapedTerm}%'
    ORDER BY category;`;

    const [ rows ] = await conn.query(sql);
    conn.destroy();
    return rows;
}