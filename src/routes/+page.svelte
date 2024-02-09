<!--Home page-->
<script lang="ts"> 
  import PromotionCard from "$lib/components/PromotionCard.svelte";
  import HeroBanner from "$lib/components/HeroBanner.svelte";
</script>
<!-- hero banner -->
<div class="flex justify-center items-center">
    <HeroBanner />
</div>
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