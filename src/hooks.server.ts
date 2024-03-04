import { verifyToken } from '$lib/server/auth';
import { findUser } from '$lib/server/db/auth';
import { error } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		const token = authCookie.split(' ')[1];
		try {
			const jwtUser = verifyToken(token);
			const [user] = await findUser(jwtUser.email);
			if (!user) return error(401, '/sign_in');
			return await resolve(event);
		} catch (error) {
			console.log(error);
		}
	}
	return await resolve(event);
}
