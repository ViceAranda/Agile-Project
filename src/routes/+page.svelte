<!--Home page-->
<script lang="ts"> 
  import PromotionCard from "$lib/components/PromotionCard.svelte";
  import HeroBanner from "$lib/components/HeroBanner.svelte";

</script>

<svelte:head>
    <title>ClassClothCo.co.uk</title> 
</svelte:head>

<!-- hero banner -->
<div class="flex justify-center items-center">
    <HeroBanner />
</div>

<!-- <button on:click={getProducts}>CLick me</button> -->
<!-- promotion items -->
<div class="flex justify-center items-center">
  <div class="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-20">
    <PromotionCard 
    imageUrl ={"./shirt_longSleeve.jpg"}
    title={"Long Sleeve Shirt"} 
    description={"A long sleeve shirt is a wardrobe staple for any season."}
    /> 
    <PromotionCard 
    imageUrl ={"./skirt_pleated.jpg"} 
    title={"Plated Skirt"}
    description={"A pleated skirt is a wardrobe staple for any season."}
    /> 
    <PromotionCard 
    imageUrl ={"./jacket_fleece.jpg"} 
    title={"Jack Fleece"}
    description={"A fleece jacket is a wardrobe staple for any season."}
    /> 
    <PromotionCard 
    imageUrl ={"./polo_white.jpg"} 
    title={"White Polo Shirt"}
    description={"A white polo shirt is a wardrobe staple for any season."}
    /> 
    <PromotionCard 
    imageUrl={"./sweater_vneck.jpg"} 
    title={"V-Neck Sweater"}
    description={"A v-neck sweater is a wardrobe staple for any season."}
    /> 
    <PromotionCard 
    imageUrl ={"./tshirt_gym.jpeg"} 
    title={"Gym T-Shirt"}
    description={"A gym t-shirt is a wardrobe staple for any season."}
    /> 
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>