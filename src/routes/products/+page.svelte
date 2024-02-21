<script lang="ts">
	// Importing necessary modules and components
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/productsCard/ProductCard.svelte';
	import Filter from '$lib/components/Filter.svelte';

	// Initializing variables
	let Data = [] as any;
	let URLCat: string | null;
	let URLSearchTerm: string | null;
	let filteredData: any[] = [];

	// Fetching data from API on component mount
	onMount(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => {
				Data = data;
				filteredData = Data; // Setting the fetched data to Data and filteredData
			})
			// .then(()=> console.log(Data))
			.catch((err) => console.log(err)); // Logging any errors
	});

	// Reactive statement to get URL parameters and apply filters
    $: {
        URLCat = $page.url.searchParams.get('cat');
        URLSearchTerm = $page.url.searchParams.get('SubCat');

        // Reset filteredProducts to Data before applying each filter
        let filteredProducts = [...Data];

        // Filter by category if URLCat is present
        if (URLCat) {
            filteredProducts = filterByCategory(filteredProducts, URLCat);
        }

        // Apply the search term filter
        if (URLSearchTerm) {
            filteredProducts = filterBySearchTerm(filteredProducts, URLSearchTerm);
        }

        filteredData = filteredProducts; // Update filteredData with the filtered products
    }

	// Function to filter products by category
	function filterByCategory(products: any[], category: string) {
		let categoryId: any;
		switch (category.toLowerCase()) {
			case 'boys':
				categoryId = 1;
				break;
			case 'girls':
				categoryId = 2;
				break;
			case 'sports':
				categoryId = 3;
				break;
			case 'footwear':
				categoryId = 4;
				break;
			default:
				categoryId = null;
		}

		// If categoryId is set, filter products based on it
		if (categoryId) {
			return products.filter((product) => parseInt(product.nav_category) === categoryId);
		}

		// If categoryId is not set, return all products
		return products;
	}

	// Function to filter products by price
	function filterByPrice(products: any[], selectedPrice: string[]) {
		if (!selectedPrice.length) return products; // If no price is selected, return all products

		// Filter products based on selected price
		return products.filter((product) => {
			return selectedPrice.some((priceRange) => {
				if (priceRange.includes('+')) {
					let minPrice = Number(priceRange.split('+')[0]);
					return product.price >= minPrice;
				} else if (priceRange.includes('-')) {
					let [minPrice, maxPrice] = priceRange.split('-').map(Number);
					return product.price >= minPrice && product.price <= maxPrice;
				} else {
					return product.price === Number(priceRange);
				}
			});
		});
	}

	// Function to filter products by size
	function filterBySize(products: any[], selectedSize: string[]) {
		if (!selectedSize.length) return products; // If no size is selected, return all products

		// Filter products based on selected size
		return products.filter((product) => {
			return selectedSize.some((sizeRange) => {
				if (sizeRange.includes('+')) {
					let minSize = Number(sizeRange.split('+')[0]);
					return product.size >= minSize;
				} else if (sizeRange.includes('-')) {
					let [minSize, maxSize] = sizeRange.split('-').map(Number);
					return product.size >= minSize && product.size <= maxSize;
				} else {
					return product.size === Number(sizeRange);
				}
			});
		});
	}

	// Function to filter products by fit
	function filterByFit(products: any[], selectedFit: string[]) {
		if (!selectedFit.length) return products; // If no fit is selected, return all products

		// Filter products based on selected fit
		return products.filter((product) => {
			return selectedFit.includes(product.fit);
		});
	}

	function filterBySearchTerm(products: any[], URLSearchTerm: string) {
		if (!URLSearchTerm) return products; // If no search term is provided, return all products

		// Convert the search term to lower case
		const lowerCaseSearchTerm = URLSearchTerm.toLowerCase();

		// Filter products based on the search term
		return products.filter((product) => {
			// Convert the product name to lower case and check if it includes the search term
			return product.name.toLowerCase().includes(lowerCaseSearchTerm);
		});
	}

	// Function to handle filter change
	const handleFilterChange = (event: CustomEvent) => {
		const { selectedPrice, selectedSize, selectedFit } = event.detail;

		// Reset filteredProducts to Data before applying each filter
		let filteredProducts = [...Data];

		// Apply filters if any filter is selected
		if (selectedPrice.length) {
			filteredProducts = filterByPrice(filteredProducts, selectedPrice);
		}
		if (selectedSize.length) {
			filteredProducts = filterBySize(filteredProducts, selectedSize);
		}
		if (selectedFit.length) {
			filteredProducts = filterByFit(filteredProducts, selectedFit);
		}

		// Apply the search term filter
		if (URLSearchTerm) {
			filteredProducts = filterBySearchTerm(filteredProducts, URLSearchTerm);
		}

		filteredData = filteredProducts; // Update filteredData with the filtered products
	};
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<!-- HTML markup for the page -->
<div class="flex justify-center">
	<div class="w-[25%]">
		<!-- Filter component with filterChange event handler -->
		<Filter on:filterChange={handleFilterChange} />
	</div>
	<div class="ml-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
		<!-- Loop through filteredData and display ProductCard for each product -->
		{#each filteredData as product (product.id)}
			<ProductCard
				id={product.id}
				imageUrl={'image 3.png'}
				name={product.name}
				price={product.price}
			/>
		{/each}
	</div>
</div>
