import { createOrder } from '$lib/server/db/orders.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { cart } = await request.json();

	if (!cart) return json({ message: 'Must provide a Cart object' }, { status: 400 });

	try {
		await createOrder(cart);
		return json({ message: 'Successfully placed order' }, { status: 201 });
	} catch (error) {
		console.error('createOrder: ', error);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}
