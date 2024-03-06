<script lang="ts">
	import type { Product } from '@types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
    import Review from "$lib/components/Review.svelte";
    export let data: PageData
    let name: string = '';
    let price: Number = 0;
    let imageUrl: string = '';

    let productID: any;
    let productData: Product;


    const FetchData = async () => {
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
    }

    onMount(async () => {
        productID = data.id;
        await FetchData();
    });

	export let quantity: any;

	async function handleSubmit ( quantity: any) {

        const body = { 
            cartId: 1,
            productId: Number(productID),
            qty: Number(quantity)
        };

        const response = await fetch("/api/cart", { 
            method: "PUT", 
            body: JSON.stringify(body) 
        });
        if (response.ok) {
            window.location.reload();
            
        } else {
            console.error('Failed to add item to cart');
        }
	}

</script>

<svelte:head>
    <title>{name}</title>
    <meta name="description" content="ClassClothCo.co.uk - {name}" />
</svelte:head>

<!-- responsive break point set at 768 px -->

<div class="relative flex flex-col md:flex-row justify-center">
    <div class="left-container md:w-[50%] flex flex-col items-start justify-center">
        <div class="flex product-image bg-white items-center justify-center">
            <img src={imageUrl} alt={name} class="w-[800px] h-[800px] object-contain mx-auto">
        </div>
            <div class="reviews w-[100%]">
                <Review />
            </div>

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
            <!-- <label for="size">Select Size:</label> -->   

            <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-5">
                <div >
                    <p class="text-md font-semibold leading-6 text-gray-900">
                        Select Size: 
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-medium leading-6 text-gray-900">
                        <select class="w-3 rounded-sm">
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
                on:click={() => handleSubmit(quantity)}
            >
                Add to Basket
            </button>
            </div>
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