<script lang="ts">
    import { page } from '$app/stores';
	import type { Product } from '@types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

    export let data: PageData

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

    })
</script>

{#if productData}
    <code>
        <pre>
            {JSON.stringify(productData, null, 2)}
        </pre>
    </code>
{/if}