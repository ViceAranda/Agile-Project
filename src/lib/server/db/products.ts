// This file contains queries to the Database regarding products
import type { RowDataPacket } from 'mysql2';
import { initConnection } from './config';

/**
 * Might throw an error!
 * @returns Products
 */
export async function selectAll(): Promise<RowDataPacket[]> {
	const conn = await initConnection();
	conn.connect();

	const sql = `SELECT p.id , p.name, p.description , p.price , p.stock , p.${`size`}, p.fit, p.nav_category , c.name as category  FROM PRODUCTS p 
    JOIN PRODUCT_CATEGORIES pc ON p.id = pc.product_id 
    JOIN CATEGORIES c ON pc.category_id = c.id
    ORDER BY p.id`;
	const [rows] = await conn.query(sql);

	conn.destroy();
	return rows as RowDataPacket[];
}

/**
 * Get product by id. Might throw an error!
 * @returns Products
 */
export async function selectById(id: string): Promise<RowDataPacket[]> {
	const conn = await initConnection();
	conn.connect();

	const escapedId = conn.escapeId(id).replaceAll('`', '');

	const sql = `SELECT p.id , p.name, p.description , p.price , p.stock , p.${`size`}, p.fit, c.name as category  FROM PRODUCTS p 
    JOIN PRODUCT_CATEGORIES pc ON p.id = pc.product_id 
    JOIN CATEGORIES c ON pc.category_id = c.id
    WHERE p.id=${escapedId}
    ORDER BY p.id`;
	const [rows] = await conn.query(sql);

	conn.destroy();
	return rows as RowDataPacket[];
}

/**
 * Might throw error
 * @param category
 * @returns List of Products
 */
export async function selectByCategory(categoryId: string): Promise<RowDataPacket[]> {
	const conn = await initConnection();
	conn.connect();

	const escapedId = conn.escapeId(categoryId).replaceAll('`', '');

	const sql = `SELECT p.id , p.name, p.description , p.price , p.stock , p.${`size`}, p.fit, c.name as category  FROM PRODUCTS p 
    JOIN PRODUCT_CATEGORIES pc ON p.id = pc.product_id 
    JOIN CATEGORIES c ON pc.category_id = c.id
    WHERE c.id=${escapedId}
    ORDER BY p.id`;

	const [rows] = await conn.query(sql);
	conn.destroy();
	return rows as RowDataPacket[];
}

/**
 * Might throw error
 * @param schoolId
 * @returns List of Products
 */
/*export async function selectBySchool(schoolId: string) {
    const conn = await initConnection();
    conn.connect();

    const sql = `SELECT PRODUCTS.* FROM PRODUCTS
    INNER JOIN SCHOOLS ON PRODUCTS.school_id = SCHOOLS.id
    WHERE SCHOOLS.id = ` + conn.escapeId(schoolId);

    const [ rows ] = await conn.query(sql);
    conn.destroy();
    return rows;
}*/

/**
 * Matches search term agains product and categories' names.
 * Might throw error
 * @param searchTerm
 * @returns List of Products
 */
export async function fuzzySelect(searchTerm: string): Promise<RowDataPacket[]> {
	const conn = await initConnection();
	conn.connect();

	const escapedTerm = conn.escape(searchTerm).replace(/^'(.*)'$/, '$1');
	const sql = `SELECT p.id , p.name, p.description , p.price , p.stock , p.${`size`}, p.fit, c.name as category  FROM PRODUCTS p 
    JOIN PRODUCT_CATEGORIES pc ON p.id = pc.product_id 
    JOIN CATEGORIES c ON pc.category_id = c.id
    WHERE p.name LIKE '%${escapedTerm}%' OR c.name LIKE '%${escapedTerm}%'
    ORDER BY p.id`;

	const [rows] = await conn.query(sql);
	conn.destroy();
	return rows as RowDataPacket[];
}
