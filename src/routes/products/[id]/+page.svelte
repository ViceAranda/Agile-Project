<script lang="ts">
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
        if (response instanceof Error) {
            console.error(response);
            return;
        }
        productData = response[0];
        name = productData.name;
        price = productData.price;
        imageUrl = productData.image_url;
    })

	export let size: Number;
	export let quantity: Number;

	async function handleSubmit (size: number, quantity: Number) {

        const body = { cartId: 1, productId: productData.id , qty: quantity, size: size};
        const response = await fetch("/api/cart", { method: "PUT", body: JSON.stringify(body) });
		console.log(response);
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

<svelte:head>
    <title>{name}</title>
    <meta name="description" content="ClassClothCo.co.uk - {name}" />
</svelte:head>


<!-- {#if productData}
    <code>
        <pre>
            {JSON.stringify(productData, null, 2)}
        </pre>
    </code>
{/if} -->

<!-- responsive break point set at 768 px -->

<div class="relative flex flex-col md:flex-row justify-center">
    <div class="left-container md:w-[50%] flex flex-col items-start justify-center">
        <div class="flex product-image bg-white items-center justify-center">
            <img src={imageUrl} alt={name} class="w-[800px] h-[800px] object-contain mx-auto">
        </div>
        {#if $reviewsVisible}
            <div class="reviews w-[100%]">
                <Review />
                <button  class=" text-blue-500 ml-5" on:click={toggleReviews}>hide reviews
                </button>
            </div>
        {/if}
        {#if !$reviewsVisible}
                <button class=" text-blue-500" on:click={toggleReviews}>show reviews
                </button>
        {/if}
    </div>
    <div class="relative right-container md:w-[20%] py-5 px-5">
        <div class="bg-white rounded-md shadow-sm h-full w-full border-2 border-gray-200 px-5 ">
            <h1 class="text-3xl mb-2 font-bold underline leading-6 text-gray-900 mt-6">
                {name}
            </h1>
            <!-- Price -->
            <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-5">
                <div >
                    <h2 class="text-lg font-semibold leading-6 text-gray-900">
                        Price: 
                    </h2>
                </div>
                <div class="text-right">
                    <p class="text-lg font-medium leading-6 text-gray-900">
                        £{price.toFixed(2)}
                    </p>
                </div>
            </div>
        <br>
        <form on:submit={handleSubmit}>
            <!-- <label for="size">Select Size:</label> -->   

            <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-5">
                <div >
                    <p class="text-md font-semibold leading-6 text-gray-900">
                        Select Size: 
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-medium leading-6 text-gray-900">
                        <select bind:value={size} class="w-3 rounded-sm">
                            <option value="1">S</option>
                            <option value="2">M</option>
                            <option value="3">L</option>
                            <option value="4">XL</option>
                            <option value="5">XXL</option>
                        </select>
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-5">
                <div >
                    <p class="text-md font-semibold leading-6 text-gray-900">
                        Select Quantity: 
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-medium leading-6 text-gray-900">
                        <select bind:value={quantity} class="w-3 rounded-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-center mt-5 ">
                <button
                class="bg-gray-900 w-full text-white rounded-md py-3 px-4 hover:bg-gray-200 hover:text-black items-center justify-centertext-center"
                on:click={() => handleSubmit(size, quantity)}
            >
                Add to Basket
            </button>
            </div>
        </form>
        <div>
            <h1 class="text-3xl mb-2 font-bold underline leading-6 text-gray-900 mt-6">
                Product Description
            </h1>
            <p class="text-lg font-medium leading-6 text-gray-900 mt-5 text-wrap ">
                {productData?.description}
            </p>
        </div>
    </div>
</div>
</div>

<!-- Select tags should use same styling -->
<style>
    select {
        @apply bg-white w-full border-2 border-solid border-black p-1 max-w-48;
    }
</style>