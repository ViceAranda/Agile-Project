import { comparePasswords } from '$lib/server/auth/index.js';
import { findUser } from '$lib/server/db/auth.js';
import { fail } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string | null,
			password = formData.get('password') as string | null;

		// Check if data exists
		if (!email) return fail(400, { email, missing: true });
		if (!password) return fail(400, { password, missing: true });

		// Check password
		let storedData: RowDataPacket;
		try {
			[storedData] = await findUser(email);
		} catch (error) {
			console.error('findUser:', error);
			return fail(500, { message: "Couldn't authenticate user. Please, try later..." });
		}

		if (!storedData) {
			console.log('no user found');
			return fail(404, { message: 'User does not exist' });
		}

		const authenticated = comparePasswords(password, storedData.password);
		if (!authenticated) {
			console.log('incorrect password');
			return fail(401, { message: 'Incorrect password' });
		} else return { ok: true };
	}
};
