import { securePassword } from '$lib/server/auth/index.js';
import { checkEmailAvailable, createUser } from '$lib/server/db/auth.js';
import { fail } from '@sveltejs/kit';
import type { User } from '@types';
import type { ResultSetHeader } from 'mysql2';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const fname = formData.get('fname') as string | null,
			lname = formData.get('lname') as string | null,
			email = formData.get('email') as string | null,
			password = formData.get('password') as string | null;

		// Check if data exists
		if (!email) return fail(400, { email, missing: true });
		if (!password) return fail(400, { password, missing: true });
		if (!fname) return fail(400, { fname, missing: true });
		if (!lname) return fail(400, { lname, missing: true });

		// Check if email already in use
		let emailAvailable = false;
		try {
			emailAvailable = await checkEmailAvailable(email as string);
		} catch (error) {
			console.error('checkEmailAvailable: ', error);
			return fail(500, { message: 'Internal Server error. Please, try later...' });
		}
		if (!emailAvailable) {
			console.log('email not available');
			return fail(409, { email, unavailable: true });
		}

		// Secure provided password by hashing it.
		const hashedPassword = securePassword(password);

		// Store new user into DB
		const newUser: User = {
			fname,
			lname,
			email,
			password: hashedPassword,
			address: '',
			region_id: '-1',
			location_id: '-1'
		};
		let result: ResultSetHeader;
		try {
			result = await createUser(newUser);
		} catch (error) {
			console.error('createUser:', error);
			return fail(500, { message: "Couldn't create new user. Please, try later..." });
		}

		if (result.affectedRows === 0) {
			console.error('Database did not insert a new user');
			return fail(500, { message: "Couldn't create new user. Please, try later..." });
		} else {
			console.log('Successful sign up');
			return { ok: true };
		}
	}
};
