export type User = {
	email: string;
	password: string;
	fname: string;
	lname: string;
	address: string;
	region_id: string;
	location_id: string;
};

export type Product = {
	id: number;
	name: string;
	description: string;
	price: 15.99;
	categories: string[];
	stock: number;
	size: number;
	fit: string;
	imageUrl: string;
};

export type Cart = {
	userId: number;
	cartId: number;
	products: {
		id: number;
		name: string;
		price: number;
		qty: number;
		category: string;
		description: string;
		size: number;
		fit: string;
		total_cost: number;
	}[];
	final_cost: number;
};
