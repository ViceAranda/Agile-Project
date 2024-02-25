<script lang="ts">
    
    
    
    import { page } from '$app/stores';
	import type { Product } from '@types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

    export let data: PageData

    let name: string = 'Product 1';
    let price: Number = 0;

    let productID = data.id,
        productData: Product;
    onMount(async () => {
        const response = await fetch(`/api/products?id=${productID}`)
            .then(res => res.json() as Promise<Product[]>)
            .catch(err => new Error(err));
        
        console.log(response);
        if (response instanceof Error) {
            console.error(response);
            return;
        }
        productData = response[0];

        name = productData.name;
        price = productData.price;

    })


    import Review from "$lib/components/Review.svelte";
    export let imageUrl: string = '/image 1.png';
	//export let name: string = 'Product 1';
	//export let price: Number = 0;
	// export let id: string = '';
	export let size: string = '';
	export let quantity: Number;

	function handleSubmit() {
		alert(`submitted option ${size} ${quantity}`);
	}

</script>



{#if productData}
    <code>
        <pre>
            {JSON.stringify(productData, null, 2)}
        </pre>
    </code>
{/if}



<div class="flex justify-center">
    <div class="left-container w-[50%]">
        <div class="product-image bg-yellow-200">
            <img src={imageUrl} alt="product image">
        </div>
        <div class="review bg-orange-500">
            <Review />
        </div>
    </div>
    <div class="right-container w-[20%] px-4">
        <h1 class=" text-4xl">{name}</h1>
        <p class="text-lg ">
            £{price.toFixed(2)}
        </p>
        <br>
        <form on:submit={handleSubmit}>
            <!-- <label for="size">Select Size:</label> -->
            <select bind:value={size}>
                <option value="">Select Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
            </select>
        
            <br>
            <br>
        
            <!-- <label for="quantity">Select Quantity:</label> -->
            <select bind:value={quantity}>
                <option value="">Select Quantity</option>
                <option value="2">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        
            <br>
            <br>
        
            <button class=" bg-black text-gray-200" type="submit">Add to basket</button>
        </form>
    </div>
</div>
