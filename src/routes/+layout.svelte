<script>
    import "../app.css";
    import DesktopNavigation from "../components/Navigation/DesktopNavigation.svelte";
    import DesktopFooter from "../components/Footer/DesktopFooter.svelte";
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
