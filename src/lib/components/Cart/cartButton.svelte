<script lang="ts">
	import { onMount } from 'svelte';
    import CartModal from './CartModal.svelte';
    let showModal = false as boolean; 
	let CartData = [] as any;
	let Products = [] as any;

	const fetchData = async () => {
        const res = await fetch('/api/cart?user_id=1');
        const data = await res.json();
        CartData = data.cart;
        Products = CartData.products;
    };

    // Get the cart data from the backend
    onMount(fetchData);

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

  let UpdateQTY = (id: number, qty: number) => {
	const body = { cartId: CartData.cartId , productId: id, qty: qty };
	fetch('/api/cart', {
	  method: 'PUT',
	  body: JSON.stringify(body)
	})
	.then ((res) => res.json())
	.then(fetchData)
	.then((data) => {
	  console.log(data);
	});
  };

  function handleUpdate(event: CustomEvent) {
	UpdateQTY(event.detail.productId, event.detail.qty);
  }

  function handleRemove(event: CustomEvent) {
	RemoveItem(event.detail.productId);
  }

</script>

<button
	class="bg-white text-black rounded-md py-3 px-3 hover:bg-gray-200 hover:text-black justify-end text-end flex items-end"
	on:click={() => showModal = true}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2 items-start justify-start text-start">
		<path
			d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114 .362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
		></path>
	</svg>
	{#if Products.length > 0}
		<span>{Products.length}</span>
	{/if}
</button>

<!-- Dropdown menu -->
{#if showModal}
	<div class="z-50">
		<CartModal 
			on:close={() => (showModal = false)}
			{...CartData}
			{...Products}
			on:add={handleUpdate}
			on:remove={handleRemove}
		/>
	</div>
{/if}
