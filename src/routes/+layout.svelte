<script>
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
</script>
<header>
  <Navbar />
</header>

<main>
  <slot />
</main>
<footer>
  <Footer />
</footer>
