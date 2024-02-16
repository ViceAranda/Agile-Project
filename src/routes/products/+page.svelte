<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from '$lib/components/productsCard/ProductCard.svelte';
	import Filter from '$lib/components/Filter.svelte';

	let Data = [] as any;
	let selectedPrice: any, selectedSize: any, selectedFit: any;

	onMount(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => Data = data)
			.catch((err) => console.log(err));
	});

	const handleFilterChange = (event: { detail: { selectedPrice: any; selectedSize: any; selectedFit: any; }; }) => {
		({ selectedPrice, selectedSize, selectedFit } = event.detail);
	};

	$: filteredData = Data.filter((product: { price: any; size: any; fit: any; }) => {
		return (!selectedPrice || product.price === selectedPrice) &&
			   (!selectedSize || product.size === selectedSize) &&
			   (!selectedFit || product.fit === selectedFit);
	});
</script>

<div class="flex justify-center">
	<div class="w-[25%]">
		<Filter 
		on:filterChange={handleFilterChange} />
	</div>
	<div class="ml-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
		{#each filteredData as product (product.id)}
			<ProductCard
				id={product.id} 
				imageUrl={"image 3.png"} 
				name={product.name} 
				price={product.price} 
			/>
		{/each}
	</div>
</div>