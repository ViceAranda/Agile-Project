import { addItem, deleteItem, getCart } from '$lib/server/db/carts.js';
import { json } from '@sveltejs/kit';
import type { ResultSetHeader } from 'mysql2';

/**
 * Get user's cart
 */
export async function GET({ url }) {
	const userId = url.searchParams.get('user_id');

	if (!userId) return json({ message: 'No UserID found' }, { status: 400 });

	try {
		const results = await getCart(userId);
		if (results) return json({ cart: results }, { status: 200 });
		else return json({ message: 'Cart not found' }, { status: 404 });
	} catch (err) {
		console.error(err);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}

/**
 * Add Item to user's cart
 */
export async function PUT({ request }) {
	const { cartId, productId, qty, size } = await request.json();
	if (!cartId) return json({ message: 'Must provide a Cart ID' }, { status: 400 });
	if (!productId) return json({ message: 'Must provide a Product ID' }, { status: 400 });

	try {
		await addItem(cartId, productId, qty, size || 0);
		return json({ message: 'Successfully updated cart items!' }, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}

/**
 * Removes item from user's cart
 * @param param0
 */
export async function DELETE({ request }) {
	const { cartId, productId } = await request.json();
	if (!cartId) return json({ message: 'Must provide a Cart ID' }, { status: 400 });
	if (!productId) return json({ message: 'Must provide a Product ID' }, { status: 400 });

	try {
		const results = await deleteItem(cartId, productId);
		if ((results as ResultSetHeader).affectedRows >= 0)
			return json({ message: 'Successfully deleted item from cart' }, { status: 200 });
		else {
			console.error(new Error(`Error while deleting product ${productId} in cart ${cartId}`));
			return json({ message: 'Internal Server error' }, { status: 500 });
		}
	} catch (error) {
		console.error(error);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}
