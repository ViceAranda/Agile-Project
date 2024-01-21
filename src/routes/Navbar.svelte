<!-- src/Navbar.svelte -->
<script lang="ts">
  export let pages: string[] = [];
  export let activePage: string = '';
  
  function setActivePage(page: string) {
    activePage = page;
  }
</script>

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

<nav>
  {#each pages as page}
    <a on:click={() => setActivePage(page)} class:active={activePage === page}>{page}</a>
  {/each}
</nav>
