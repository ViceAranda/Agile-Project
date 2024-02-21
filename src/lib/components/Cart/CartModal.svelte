<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cartItems } from './cartStore'; //Currently hardcoded

	let cart: any = cartItems;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function addToCart(item: { id: any }) {
		const found = cart.find((cartItem: { id: any }) => cartItem.id === item.id);
		if (found) {
			found.quantity += 1;
		} else {
			cart = [...cart, { ...item }];
		}
	}

	function removeFromCart(item: { id: any }) {
		const found = cart.find((cartItem: { id: any }) => cartItem.id === item.id);
		if (found) {
			found.quantity -= 1;
			if (found.quantity <= 0) {
				cart = cart.filter((cartItem: { id: any }) => cartItem.id !== item.id);
			}
		}
	}

	let total: number;
	$: total = $cart.reduce(
		(acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
		0
	);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="fixed z-20 inset-0 bg-white bg-opacity-100 p-10 justify-center items-center h-screen w-screen"
	on:click={close}
>
	<div class="relative flex">
        <div class="absolute right-[2%] top-0 items-end justify-end text-end">
            <button
                class="px-4 py-2 font-extrabold  bg-gray-900 text-white rounded hover:bg-red-700"
                on:click={close}
            >
                X
            </button>
        </div>
    
        <div class="relative mx-auto mt-10 ml-10 w-full" on:click|stopPropagation>
            <h3 class="text-2xl font-bold leading-6 text-gray-900">Your Basket</h3>
            <div class="flex items-center justify-end text-end mr-[5%]">
                <p class="text-lg font-bold leading-6 text-gray-900">
                    Total: £ {total}
                </p>
            </div>
            <ul class="mt-2">
                {#each $cart as item}
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-lg border-2 border-gray-200 rounded-md mt-4 mb-4 w-[95%]"
                >
                    <div class="flex">
                            <img
                                src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Nike Air Max 90"
                                class="w-24 h-30 object-cover p-1 border-1 border-gray-200 rounded-lg"
                            />
                            <li class="ml-6">
                                <div class="grid grid-cols-1 grid-rows-1 gap-3 mb-3">
                                    <div>
                                        <h3 class="text-lg font-bold leading-6 text-gray-900">{item.name}</h3>
                                        <p class="text-sm font-medium leading-6 text-gray-900">Price: ${item.price}</p>
                                        <p class="text-sm font-medium leading-6 text-gray-900">Size: {item.size}</p>
                                        <p class="text-sm font-medium leading-6 text-gray-900">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <div class="relative flex items-center justify-end bottom-1 right-[5%]">
                            <div class="flex flex-col row-start-2">
                                <button
                                    class="px-2 py-1 mb-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                    on:click={() => addToCart(item)}>Add</button
                                >
                                <button
                                    class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    on:click={() => removeFromCart(item)}>Remove</button
                                >
                            </div>
                        </div>
                    </div>
                {/each}
            </ul>
        </div>

    </div>

	
</div>
