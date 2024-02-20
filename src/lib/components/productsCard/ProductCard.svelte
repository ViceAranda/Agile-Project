<script lang="ts">
	export let imageUrl: string = '';
	export let name: string = '';
	export let price: Number = 0;
	export let id: string = '';
</script>

<div class="w-[80%] h-auto overflow-hidden rounded-lg shadow-lg mb-4">
	<div>
		<a href="products/{id}">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={imageUrl}
				alt="Product Image"
				class="object-cover rounded-t-lg items-center w-full h-60"
			/>
			<div class="p-4 bg-gray-50 items-center">
				<p class="text-xl font-semibold mb-2 overflow-hidden whitespace-nowrap">
					{name}
				</p>
				<p class="text-lg">
					£{price.toFixed(2)}
				</p>
			</div>
		</a>
	</div>
</div>
