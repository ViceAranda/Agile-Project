<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	export let CartData = [] as any;
    export let Products = [] as any ;
    let total: number;

	const dispatch = createEventDispatcher();

	function close() {	dispatch('close');	}

    function navigateAndClose() {
        goto('/basket'); 
        dispatch('close'); 
    }

    $: total = CartData.final_cost && !isNaN(CartData.final_cost) ? parseFloat(CartData.final_cost.toFixed(2)) : 0;


function handleUpdate(id: number, qty: number) {
	dispatch('add', {cartId: CartData.cartId , productId: id, qty: qty });
}

function handleRemove(id: number) {
	dispatch('remove', { cartId: CartData.cartId , productId: id });
}


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="modal fixed z-20 inset-0 bg-white bg-opacity-100 p-10 justify-center items-center h-screen w-screen"
	on:click={close}
>

	<div class="modal-overlay relative flex">
		<div class="absolute right-[2%] top-0 items-end justify-end text-end">
			<button
				class="px-4 py-2 font-extrabold bg-gray-900 text-white rounded hover:bg-gray-200 hover:text-black"
				on:click={close}
			>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>              
			</button>
		</div>

		<div class="relative mx-auto mt-10 ml-10 w-full" on:click|stopPropagation>
			<h3 class="text-2xl font-bold leading-6 text-gray-900">Your Cart</h3>
			<div class="flex items-center justify-end text-end mr-[5%] mb-2">
				<p class="text-lg font-bold leading-6 text-gray-900">
					Total: £ {total}
				</p>
			</div>
			{#each Products as product (product.id)}
			<div class="flex shadow-sm border-2 bg-white border-gray-200 rounded-md mb-2 pb-2 pt-2">
			<div class="grid grid-cols-6 grid-rows-1 gap-4 w-full items-center justify-start text-start">
                <div >
                    <a href="/product/{product.id}">
                    <img
                        src={product.img}
                        alt={product.name}
                        class="w-24 h-20 object-cover p-1 border-1 border-gray-200 rounded-lg"
                    />
                    </a>
                </div>
                <div >
                    <h3 class="text-lg font-bold leading-6 text-gray-900">
                        <a href="/product/{product.id}">
                            {product.name}
                        </a>
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
						<div class="relative flex items-center justify-end bottom-1 right-[5%]">
							<div class="flex flex-col row-start-2">
								<div class="grid grid-cols-2 grid-rows-1 gap-4 mt-2 mb-2">
									<div>
										<button
											class="px-2 py-1 mb-2 bg-black text-white rounded hover:bg-gray-200 hover:text-black"
											on:click={() => handleUpdate(product.id, product.qty + 1)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												/>
											</svg>
										</button>
									</div>
									<div>
										<button
											class="px-2 py-1 mb-2 bg-black text-white rounded hover:bg-gray-200 hover:text-black"
											on:click={() => handleUpdate(product.id, product.qty - 1)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
											</svg>
										</button>
									</div>
								</div>
								<button
									class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-200 hover:text-red-500"
									on:click={() => handleRemove(product.id)}>Remove</button
								>
							</div>

						</div>
					</div>
					</div>
                    {/each}
                    <div class="flex items-end justify-end mr-[5%]">

                        <button class="px-10 py-3 bg-black text-white rounded hover:bg-gray-200 hover:text-black" on:click={navigateAndClose}>
                            Got to Checkout
                        </button>
                        
                    </div>
			
		</div>
	</div>
</div>

