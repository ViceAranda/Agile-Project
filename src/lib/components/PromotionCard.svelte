<script lang="ts">
  export let imageUrl:string = '';
  export let title:string = '';
  export let description:string = '';
</script>

<div class="relative flex-grow w-full h-full overflow-hidden shadow-lg rounded-md">
<img 
src={imageUrl} 
alt="Product Image" 
class="object-cover w-full h-96 bg-transparent" 
/>
<div class="absolute inset-x-0 bottom-0 h-1/3 bg-black transition-opacity duration-200 ease-in-out opacity-[75%] hover:opacity-100 hover:h-full">
    <div class="relative transition-all items-center justify-center duration-200 ease-in-out transform">
        <h3 class="text-white text-center text-2xl font-bold">{title}</h3>
        <p class="text-white text-center text-lg">{description}</p>
  </div>
</div>
</div>