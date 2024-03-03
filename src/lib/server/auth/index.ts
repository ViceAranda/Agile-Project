import bcrypt from 'bcryptjs';

/**
 * Generates a salt and hashes the provided password with it.
 * @param password
 * @returns hashedPassword
 */
export function securePassword(password: string): string {
	const hash = bcrypt.hashSync(password, 16);
	return hash;
}

/**
 * Compares user-provided password with stored hash.
 * @param password
 * @param storedHash
 * @returns boolean
 */
export function comparePasswords(password: string, storedHash: string) {
	console.log(password, storedHash);
	return bcrypt.compareSync(password, storedHash);
}
