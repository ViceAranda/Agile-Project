<script lang="ts">
    
    import { page } from '$app/stores';
	import type { Product } from '@types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
    import Review from "$lib/components/Review.svelte";
    import { writable } from 'svelte/store';

    export let data: PageData

    let name: string = '';
    let price: Number = 0;
    let imageUrl: string = '';

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
        imageUrl = productData.image_url;
        
        console.log(productData.imageUrl);
        console.log("The image url is: " + imageUrl);

    })

	export let size: string = '';
	export let quantity: Number;

	function handleSubmit() {
		alert(`submitted option ${size} ${quantity}`);
	}

    // Store to manage the visibility state of the reviews
    // hide reviews when < 768 px to improve mobile browsing experience
    const reviewsVisible = writable(true);

    // Function to update reviewsVisible based on screen width
    const updateVisibility = () => {
    reviewsVisible.set(window.innerWidth > 768); // Set to true if screen width is greater than 768 pixels, otherwise false
    };

    // Subscribe to window resize events to update reviewsVisible dynamically
    window.addEventListener('resize', updateVisibility);

    // Function to toggle the visibility of the reviews
    const toggleReviews = () => {
    reviewsVisible.update(value => !value);
};

</script>


<!-- {#if productData}
    <code>
        <pre>
            {JSON.stringify(productData, null, 2)}
        </pre>
    </code>
{/if} -->

<!-- responsive break point set at 768 px -->
<div class="flex flex-col md:flex-row justify-center">
    <div class="left-container md:w-[50%] flex flex-col items-start justify-center">
        <div class="product-image bg-white">
            <img src={imageUrl} alt="product image" class="max-w-full h-auto">
        </div>
        {#if $reviewsVisible}
            <div class="reviews w-[100%]">
                <Review />
                <button  class=" text-blue-500" on:click={toggleReviews}>hide reviews</button>
            </div>
        {/if}
        {#if !$reviewsVisible}
                <button class=" text-blue-500" on:click={toggleReviews}>show reviews</button>
        {/if}
    </div>
    <div class="right-container md:w-[20%] px-4">
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
        
            <button class=" bg-black text-gray-200 text-center w-full max-w-48 p-1" type="submit">ADD TO BASKET</button>
        </form>
    </div>
</div>

<!-- Select tags should use same styling -->
<style>
    select {
        @apply bg-white w-full border-2 border-solid border-black p-1 max-w-48;
    }
</style>