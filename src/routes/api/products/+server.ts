import { json } from '@sveltejs/kit';
import { selectAll } from '$lib/server/db/products';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log('Request data: ', url);

    try {
        const results = await selectAll();
        console.log(results);
        
        return json(results);
    } catch (error) {
        console.error(error);
        return json({msg: 'Server-side error'})
    }
}