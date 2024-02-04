<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { cartItems } from './cartStore'; //Currently hardcoded

    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }
</script>

<div class="fixed z-20 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" on:click={close} >

    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" on:click|stopPropagation>
        <h3 class="text-lg font-medium leading-6 text-gray-900">Your Cart</h3>
        <ul class="mt-2">
            {#each $cartItems as item}
                <li class="py-2">{item.name} - Quantity: {item.quantity}</li>
            {/each}
        </ul>
        <div class="mt-4">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" on:click={close}>Close</button>
        </div>
    </div>
</div>

<style>
    /* Additional styling can go here */
</style>
