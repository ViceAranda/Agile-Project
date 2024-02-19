<script lang="ts">
	import HeroBanner from "$lib/components/HeroBanner.svelte";
    import Review from "$lib/components/Review.svelte";
</script>
<div class="flex justify-center">
    <div class="left-container w-[50%]">
        <div class="carousel bg-yellow-200">
            <HeroBanner/>
        </div>
        <div class="review bg-orange-500">
            <Review />
        </div>
    </div>
    <div class="right-container bg-blue-500">
        <div>this is product description</div>
    </div>
</div>