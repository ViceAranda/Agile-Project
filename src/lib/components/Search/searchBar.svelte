<script lang="ts">
	let searchValue = '';
	let searchResults: any[] = [];

	function search(event: any) {
		searchValue = event.target.value;
		// Update searchResults based on searchValue
		fetch(`/api/products?search_term=${searchValue}`)
			.then((res) => res.json())
			.then((data) => { searchResults = data; })
			.catch((err) => console.log(err));
	}
</script>

<div class="z-auto hero bg-gredient-dark h-400px flex flex-col">
	<div class="search-box mx-auto my-auto w-">
		<form class="flex flex-row">
			<input
				type="text"
				bind:value={searchValue}
				on:input={search}
                on:blur={() => setTimeout(() => searchValue = '', 200)}
				class="form-input border rounded-tl-md rounded-bl-md py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none block md:w-[50vh] focus:outline-none"
				placeholder="Search..."
			/>

			<span
				class="flex items-center bg-white rounded rounded-l-none border-0 px-3 font-bold text-black"
			>
				<button class="rounded-tr-md rounded-br-md bg-white focus:outline-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="pointer-events-none cursor-pointer w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</span>
		</form>
        {#if searchValue}
            <div class="absolute w-full top-full mt-1 bg-white border rounded-md shadow-md z-20 overflow-auto max-h-60">
                {#if searchResults.length === 0}
                    <div class="p-2">No results found</div>
                {:else}
                    <div class="p-2 font-bold">
                        <a href={`/products/?cat=&SubCat=${encodeURIComponent(searchValue)}`}>
                            {searchValue}
                    </a>
                </div> <!-- Add this line -->
                    {#each searchResults as result (result.id)} <!-- Assuming result has an 'id' property -->
                        <div class="p-2 hover:bg-gray-200">
                            <a href={`/${encodeURIComponent(result.id)}`}> <!-- Assuming result has a 'name' property -->
                                {result.name} <!-- Display the 'name' property of the result -->
                            </a>
                        </div>
                    {/each}
                {/if}
            </div>
        {/if}
	</div>
</div>
