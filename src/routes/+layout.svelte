<script lang="ts">
  import DesktopNavigation from "../lib/components/Navigation/DesktopNavigation.svelte";
  import DesktopFooter from "../lib/components/Footer/DesktopFooter.svelte";
  import "../app.css";
</script>

<header>
  <!-- there should be conditions to decide desktop or mobile components to be rendered -->
  <DesktopNavigation />
</header>

<main>
  <!-- this is where +page.svelte content sit-->
  <slot />
</main>


<footer>
  <!-- conditions to be added -->
  <DesktopFooter />
</footer>
