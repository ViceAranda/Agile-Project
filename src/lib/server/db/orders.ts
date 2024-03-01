import type { Cart } from '@types';
import { initConnection } from './config';
import type { ResultSetHeader } from 'mysql2';

export async function createOrder(cart: Cart) {
	const conn = await initConnection();
	conn.connect();

	await conn.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
	await conn.beginTransaction();

	try {
		const orderSql = 'INSERT INTO ORDERS (user_id, cost, state_id) VALUES (?, ?, ?)';
		const [orderResult] = (await conn.query(orderSql, [
			cart.userId,
			cart.final_cost,
			1
		])) as ResultSetHeader[];

		const { insertId } = orderResult;

		let itemsSql = 'INSERT INTO ORDER_ITEMS (order_id, product_id, qty) VALUES ';
		for (const p of cart.products) {
			itemsSql += `(${insertId}, ${p.id}, ${p.qty}),`;
		}
		itemsSql = itemsSql.slice(0, -1);

		const [itemsResult] = (await conn.query(itemsSql)) as ResultSetHeader[];
		console.log('inserted items');

		conn.commit();
		conn.destroy();

		console.log('commited');
		return [orderResult, itemsResult];
	} catch (error) {
		conn.rollback();
		conn.destroy();
		throw error;
	}
}
