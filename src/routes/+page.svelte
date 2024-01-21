<!-- src/App.svelte -->
<script lang="ts">
    import Navbar from './Navbar.svelte';
  
    let pages: string[] = ['Home', 'Boys', 'Girls', 'Sports', 'Footwear'];
    let activePage: string = 'Home';
  </script>
  
  <Navbar {pages} {activePage} />
  
  <main>
    <!-- Your main content goes here -->
    <h1>{activePage} Page Content test</h1>
  </main>
  
