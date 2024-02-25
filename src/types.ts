export type User = {
	email: string;
	password: string;
	name: string;
	lastname: string;
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
