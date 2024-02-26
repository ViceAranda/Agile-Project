import { getProfile, updateProfile } from '$lib/server/db/profile.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const userId = url.searchParams.get('user_id');

	if (!userId) return json({ message: 'No UserID found' }, { status: 400 });

	try {
		const results = await getProfile(userId);
		if (results.length === 0) return json({ message: 'Profile not found' }, { status: 404 });
		else {
			const profile = {
				id: results[0].id,
				email: results[0].email.replaceAll("'", ''),
				firstname: results[0].firstname.replaceAll("'", ''),
				lastname: results[0].lastname.replaceAll("'", ''),
				address: results[0].address.replaceAll("'", '')
			};
			return json({ profile }, { status: 200 });
		}
	} catch (err) {
		console.error(err);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}

export async function PUT({ request }) {
	const { userId, firstname, lastname, address } = await request.json();

	if (!userId) return json({ message: 'No UserID found' }, { status: 400 });

	try {
		const results = await updateProfile(userId, firstname, lastname, address);

		if (results.affectedRows === 0)
			return json({ message: 'Internal Server error' }, { status: 500 });
		else return json({ message: 'Successfully updated profile' }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ message: 'Internal Server error' }, { status: 500 });
	}
}
