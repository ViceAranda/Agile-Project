<script lang="ts">
    export let imageUrl:string = '';
    export let name:string = '';
    export let price:Number = 0;
</script>

<div class="relative w-full overflow-hidden rounded-lg">
<div>
    <img src={imageUrl} alt="Product Image" class="object-cover rounded-t-lg" />
</div>
<div class="p-4 bg-white">
    <p class="text-xl font-semibold mb-2">{name}</p>
    <p class="text-lg text-gray-700">£{price.toFixed(2)}</p>
</div>
</div>