<script lang="ts">
  export let imageUrl:string = '';
</script>

<div class="relative w-full aspect-w-3 aspect-h-2 overflow-hidden">
  <img src={imageUrl} alt="Product Image" class="object-cover w-full h-full" />
  <div class="absolute inset-x-0 bottom-0 h-1/3 bg-black opacity-60">
  </div>
</div>