import { json } from '@sveltejs/kit';
import { fuzzySelect, selectAll, selectByCategory, selectById } from '$lib/server/db/products';

/**
 * 
 * GET operation on products. It can perform:
 * - Select All
 * - Select Single Product
 * - Select By Category
 * - Select By Search term.
 * 
 * Searching by a term performs fuzzy search on the database based on category names, and product names.
 * 
 * Use it as:
 * - `fetch('/api/products')`
 * - `fetch('/api/products?id=123')`
 * - `fetch('/api/products?category_id=123')`
 * - `fetch('/api/products?search_term=shirt')`
 * 
 * Search is conducted by preference as:
 * 1. Product id
 * 2. Category id
 * 3. Fuzzy term
 * 4. Default general search
*/
export async function GET({ url }) {
    
    const productId = url.searchParams.get('id');
    const categoryId = url.searchParams.get('category_id');
    //const schoolId = url.searchParams.get('school_id');
    const searchTerm = url.searchParams.get('search_term');

    try {
        let results;

        if (productId) results = await selectById(productId);
        else if (categoryId) results = await selectByCategory(categoryId);
        //else if (schoolId) results = await selectBySchool(schoolId);
        else if (searchTerm) results = await fuzzySelect(searchTerm);
        else results = await selectAll();
        
        return json(results);
    } catch (error) {
        // Error log for devs
        console.error(error);
        // Error for users
        return json({message: 'Server-side error'}, { status: 500 });
    }
}
