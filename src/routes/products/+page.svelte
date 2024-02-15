<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Filter from '$lib/components/Filter.svelte';

	onMount(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	});
</script>

<div class="flex justify-center">
	<div class="w-1/4">
		<Filter />
	</div>
	<div class="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
		<ProductCard imageUrl={'image 3.png'} name={'product name'} price={999} />
	</div>
</div>
