import { json } from '@sveltejs/kit';
import { selectAll, selectByCategory, selectById } from '$lib/server/db/products';

/**
 * 
 * GET operation on products. It can perform:
 * - Select All
 * - Select Single Product
 * - Select By Category
 * - Select By School [PENDING]
 * 
 * Use it as:
 * - `fetch('/api/products')`
 * - `fetch('/api/products?id=123')`
 * - `fetch('/api/products?category=Shoewear')`
*/
export async function GET({ url }) {
    console.log('Request data: ', url);
    const productId = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    try {
        let results;
        if (productId) results = await selectById(parseInt(productId));
        else if (category) results = await selectByCategory(category);
        else results = await selectAll();
        
        console.log(results);
        return json(results);
    } catch (error) {
        // Error log for devs
        console.error(error);
        // Error for users
        return json({message: 'Server-side error'}, { status: 500 });
    }
}