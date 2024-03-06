<script  lang="ts">
	let pages: string[] = ['Boys', 'Girls', 'Sports', 'Footwear'];
	let activePage: string = 'Home';

	
	function setActivePage(page: string) {
		activePage = page;
	}
    let showMenu = false;
    function toggleNavbar() {
      showMenu = !showMenu;
    }

	let logo = '/logo-no-background 1.png';

	import SearchBar from '../Search/searchBar.svelte';
	import CartButton from '../Cart/cartButton.svelte';
	import UserAccount from '../accounts/userAccount.svelte';
  </script>
  
  <div class="space-x-1 ">
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
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
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
			<div class="relative">
				<SearchBar />
			</div>
			<div class="row-start-2 items-center justify-center text-center flex sm:flex-col md:flex-row">
				{#each pages as page}
					<a
						class="text-white bg-black rounded-md py-3 px-4 focus:bg-white hover:bg-gray-100 hover:text-black text-center"
						on:click={() => setActivePage(page)}
						class:active={activePage === page}
						href="/products?cat={page === 'Home' ? '' : encodeURIComponent(page)}"
					>
						{page}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex space-x-1 items-center justify-center sm:justify-start text-center">
			<UserAccount />
			<CartButton  />
		</div>

      </nav>
    </div>
  </div>

