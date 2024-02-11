<!--Home page-->
<script lang="ts"> 
  import PromotionCard from "$lib/components/PromotionCard.svelte";
  import HeroBanner from "$lib/components/HeroBanner.svelte";

  function getProducts() {
    fetch('/api/products?id=1').then(res => res.json()).then(data => console.log(data));
  }
</script>
<!-- hero banner -->
<div class="flex justify-center items-center">
    <HeroBanner />
</div>

<button on:click={getProducts}>CLick me</button>
<!-- promotion items -->
<div class="flex justify-center items-center">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <PromotionCard imageUrl ={"image 2.png"} /> 
    <PromotionCard imageUrl ={"image 3.png"} /> 
    <PromotionCard imageUrl ={"image 4.png"} /> 
    <PromotionCard imageUrl ={"image 2.png"} /> 
    <PromotionCard imageUrl ={"image 3.png"} /> 
    <PromotionCard imageUrl ={"image 4.png"} /> 
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>