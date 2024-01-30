<!-- src/Navbar.svelte -->
<script lang="ts">
  let pages: string[] = ['Home', 'Boys', 'Girls', 'Sports', 'Footwear', 'dbConnection'];
  let activePage: string = 'Home';
  function setActivePage(page: string) {
    activePage = page;
  }
</script>
<nav>
  {#each pages as page}
    <a on:click={() => setActivePage(page)} class:active={activePage === page} href="/{page === 'Home'? '' : page.toLowerCase()}">{page}</a>
  {/each}
</nav>

<style>
  nav {
    display:flex;
    justify-content: center;
    background-color: #000;
    padding: 1em;
  }

  a {
    display: block;
    color: white;
    margin-right: 1em;
    text-decoration: none;
    cursor: pointer;
    padding: 0.5em; /* Add padding for better visual appearance */
    transition: background-color 0.3s; /* Add transition for smooth hover effect */
  }

  a:hover {
    background-color: #555; /* Change: Gray background color on hover */
  }

  .active {
    background-color: #555;
  }
</style>

