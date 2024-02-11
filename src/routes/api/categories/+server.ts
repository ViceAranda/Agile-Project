import { json } from '@sveltejs/kit';
import { selectAll } from '$lib/server/db/categories';

/** @type {import('./$types').RequestHandler}
 * 
 * GET operation on categories. Gets every category available.
 * Use it as:
 * - `fetch('/api/categories')`
*/
export async function GET({ url }) {
    console.log('Request data: ', url);

    try {
        const results = await selectAll();
        console.log(results);
        return json(results);
    } catch (error) {
        // Error log for devs
        console.error(error);
        // Error for users
        return json({message: 'Server-side error'}, { status: 500 });
    }
}