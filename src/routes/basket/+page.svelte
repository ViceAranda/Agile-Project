<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    let CartData = [] as any;
    let Products = [] as any ;
    let total: number;

    const fetchData = async () => {
        const res = await fetch('/api/cart?user_id=1');
        const data = await res.json();
        CartData = data.cart;
        Products = CartData.products;
    };

    // Get the cart data from the backend
    onMount(fetchData);

    $: total = CartData.final_cost && !isNaN(CartData.final_cost) ? parseFloat(CartData.final_cost.toFixed(2)) : 0;

    let RemoveItem = (id: number) => {
    const body = { cartId: CartData.cartId , productId: id };
    fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify(body)
    })
    .then ((res) => res.json())
    .then(fetchData)
    .then((data) => {
      console.log(data);
    });
  };

</script>

<svelte:head>
    <title> Your Basket</title> 
</svelte:head>


<h1 class="text-3xl font-bold leading-6 text-gray-900 mt-5 mb-10 ml-4 underline underline-offset-auto">
    Your Basket
</h1>
<div class="flex flex-col sm:flex-row h-full">
    <!-- Left Hand Panel -->
    <div class="ml-5 sm:w-full md:w-[80%]">

        {#each Products as product (product.id)}
        <div class="flex shadow-sm border-2 bg-white border-gray-200 rounded-md mb-2">
            <div class="grid grid-cols-6 grid-rows-1 gap-4 w-full items-center justify-start text-start">
                <div >
                    
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <img
                        src={product.img}
                        alt={product.name}
                        class="w-24 h-20 object-cover p-1 border-1 border-gray-200 rounded-lg hover:cursor-pointer"
                        on:click={() => goto(`products/${product.id}`)}
                    />
                    
                </div>
                <div >
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <h3 class="text-lg font-bold leading-6 text-gray-900 hover:cursor-pointer"
                    on:click={() => goto(`products/${product.id}`)}
                    >

                            {product.name}
                    </h3>
                </div>
                <div >
                    <p class="text-sm font-medium leading-6 text-gray-900">
                        Quantity: {product.qty}
                    </p>
                </div>
                <div >
                    <p class="text-sm font-medium leading-6 text-gray-900">Size: {product.size}
                    </p>
                </div>
                <div >
                    <p class="text-sm font-medium leading-6 text-gray-900">Price: £{product.price}
                    </p>
                </div>
                <div class="flex justify-end relative flex-auto items-end">
                    <button
                        class="bg-gray-900 px-2 py-3 mr-2 w-auto h-auto text-white rounded-md hover:bg-gray-200 hover:text-black"
                        on:click={() => RemoveItem(product.id)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      
                    </button>
                </div>
            </div>
        </div>
        {/each}


    </div>
    <div class="items-end justify-end mr-5 sm:mt-0 mt-5 sm:flex-grow w-auto">
        <!-- Right Hand Panel -->
		<div class="grid grid-cols-1 grid-rows-3 gap-4 pl-3 h-full">
			<div class="bg-white rounded-md shadow-lg border-2 border-gray-200 p-3">
                <div>
                    <h1 class="text-3xl mb-2 font-bold underline leading-6 text-gray-900 text-center">
                        Order Summary
                    </h1>
                </div>
			    <div class="mt-5">

                    <div class="grid grid-cols-2 grid-rows-1 gap-4">
                        <div >
                            <p class="text-md font-semibold leading-6 text-gray-900">
                                Sub total: 
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-medium leading-6 text-gray-900">
                                £ {total}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 grid-rows-1 gap-4 mb-4 mt-2">
                        <div >
                            <p class="text-md font-semibold  leading-6 text-gray-900">
                                Shipping
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-medium leading-6 text-gray-900">
                                £ 5.00
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 grid-rows-1 gap-4 divide-y">
                        <div >
                            <p class="text-lg font-semibold leading-6 text-gray-900 mt-5 ">
                                Total: 
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-medium leading-6 text-gray-900 mt-5">
                                £ {total + 5}
                            </p>
                        </div>
                    </div>
                </div>
			    <div class="mt-5">
                    <button
                        class="bg-gray-900 w-full text-white rounded-md py-3 px-4 hover:bg-gray-200 hover:text-black items-center justify-centertext-center"
                        on:click={() => alert("You have Checked Out :)")}
                    >
                        Checkout
                    </button>
                </div>
            </div>
		</div>
	</div>
</div>
