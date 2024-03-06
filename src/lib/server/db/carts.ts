import type { RowDataPacket } from 'mysql2';
import { initConnection } from './config';
import type { Cart } from '@types';

export async function getCart(userId: string): Promise<Cart | null> {
	const conn = await initConnection();
	conn.connect();

	const escapedId = conn.escapeId(userId).replaceAll('`', '');

	const sql = `SELECT u.id AS user_id, c.id AS cart_id, p.id AS product_id, p.name AS product, p.image_url AS img, p.price AS price, cat.name AS category, p.description AS description,
    ci.qty AS qty, p.size AS size, p.fit AS fit, ROUND(price * qty, 2) AS total_cost
    FROM USERS AS u
    JOIN CARTS c ON u.id = c.user_id
    JOIN CART_ITEMS ci ON c.id = ci.cart_id
    JOIN PRODUCTS p ON ci.product_id = p.id
    JOIN PRODUCT_CATEGORIES pc ON p.id = pc.product_id
    JOIN CATEGORIES cat ON pc.category_id = cat.id
    WHERE user_id = ${escapedId}`;

	const [rows] = (await conn.query(sql)) as RowDataPacket[][];
	conn.destroy();

	type ExpectedRow = {
		user_id: number;
		cart_id: number;
		product_id: number;
		product: string;
		price: number;
		qty: number;
		category: string;
		description: string;
		size: number;
		fit: string;
		img: string;
		total_cost: number;
	};

	if (rows.length === 0) return null;
	let final_cost = 0;
	const result = {
		userId: (rows[0] as ExpectedRow).user_id,
		cartId: (rows[0] as ExpectedRow).cart_id,
		products: rows.map((row: unknown) => {
			final_cost += (row as ExpectedRow).total_cost;
			return {
				id: (row as ExpectedRow).product_id,
				name: (row as ExpectedRow).product,
				price: (row as ExpectedRow).price,
				qty: (row as ExpectedRow).qty,
				category: (row as ExpectedRow).category,
				description: (row as ExpectedRow).description,
				size: (row as ExpectedRow).size,
				fit: (row as ExpectedRow).fit,
				img: (row as ExpectedRow).img,
				total_cost: (row as ExpectedRow).total_cost
			};
		}),
		final_cost
	};
	return result;
}

export async function addItem(cartId: string, productId: string, qty: number) {
	const conn = await initConnection();
	conn.connect();

	const escapedCartId = conn.escape(cartId);
	const escapedProductId = conn.escape(productId);
	const escapedQty = conn.escape(qty);

	// Check if product has already been added
	const [rows] = await conn.query('SELECT * FROM CART_ITEMS WHERE cart_id = ? AND product_id = ?', [
		escapedCartId,
		escapedProductId
	]);
	if (Array.isArray(rows) && rows.length > 0) {
		// If product is on the cart, update qty
		const sql = 'UPDATE CART_ITEMS SET qty = ? WHERE cart_id = ? AND product_id = ?';
		const [affectedRows] = await conn.query(sql, [escapedQty, escapedCartId, escapedProductId]);
		conn.destroy;
		return affectedRows;
	}

	// Else, add new item to cart
	const sql = 'INSERT INTO CART_ITEMS VALUES (?,?,?)';
	const [affectedRows] = await conn.query(sql, [escapedCartId, escapedProductId, escapedQty]);
	conn.destroy;
	return affectedRows;
}

export async function deleteItem(cartId: string, productId: string) {
	const conn = await initConnection();
	conn.connect();

	const escapedCartId = conn.escape(cartId);
	const escapedProductId = conn.escape(productId);

	const sql = 'DELETE FROM CART_ITEMS WHERE cart_id = ? AND product_id = ?';

	const [results] = await conn.query(sql, [escapedCartId, escapedProductId]);

	conn.destroy;
	return results;
}
