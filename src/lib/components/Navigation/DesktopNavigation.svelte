<script  lang="ts">
	let pages: string[] = ['Home', 'Boys', 'Girls', 'Sports', 'Footwear'];
	let activePage: string = 'Home';
	function setActivePage(page: string) {
		activePage = page;
	}
    let showMenu = false;
    function toggleNavbar() {
      showMenu = !showMenu;
    }

	let logo = '/logo-no-background 1.png';

	import CartModal from '../Cart/CartModal.svelte'; 
	let showModal = false; //Cart button code [FB]


    
  </script>
  
  <div>
    <div class="bg-black mb-4 shadow-xl">
      <nav
        class="container px-5 py-4 mx-auto md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center justify-between">
			<a href="/">
				<img
					src={logo}
					alt="logo"
					class="ml-[15%] w-50 h-20"
				/>
			</a>
          <!-- Mobile menu button -->
          <div on:click={toggleNavbar} class="flex md:hidden">
            <button
              type="button"
              class="text-white hover:text-gray-400 focus:outline-none focus:text-gray-200"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          class="flex-col mt-3 space-y-4 md:flex md:space-y-0 md:flex-row md:items-start md:space-x-[35vh] items-start justify-start md:mt-0 {showMenu
            ? 'flex'
            : 'hidden'}"
        >
		<div class="grid grid-cols-1 grid-rows-2 gap-4">
			<div>
				<div class="hero bg-gredient-dark h-400px flex flex-col">
					<div class="search-box mx-auto my-auto w-">
						<form class="flex flex-row">
							<input
								type="text"
								name="search"
								id="search"
								placeholder="Search for products..."
								class="form-input border rounded-tl-md rounded-bl-md py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none block md:w-[50vh] focus:outline-none"
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
					</div>
				</div>
			</div>
			<div class="row-start-2 items-center justify-center text-center flex sm:flex-col md:flex-row">
				{#each pages as page}
					<a
						class="text-white bg-black rounded-md py-3 px-4 focus:bg-white hover:bg-gray-100 hover:text-black text-center "

						on:click={() => setActivePage(page)}
						class:active={activePage === page}
						href="/{page === 'Home' ? '' : page.toLowerCase()}"
					>
						{page}
					</a>
				{/each}
			</div>
		</div>
     
		
		<div class="space-y-7">
			<button class="bg-white text-black rounded-md py-3 px-4 hover:bg-gray-200 hover:text-black items-center justify-centertext-center" on:click={() => showModal = true}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
					<path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"></path>
				</svg>
			</button>
			<button class="bg-white text-black rounded-md py-3 px-4 hover:bg-gray-200 hover:text-black items-center justify-centertext-center" on:click={() => showModal = true}>
				
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
					<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114 .362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
				</svg>
			</button>
		</div>

      </nav>

	  {#if showModal}
		  <CartModal on:close={() => showModal = false} />
	  {/if}

    </div>
  </div>

