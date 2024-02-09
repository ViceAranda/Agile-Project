<script lang="ts"> 
    import ProductCard from "../../components/ProductCard.svelte";
</script>
<div class="flex justify-center">
    <div class="w-1/4">
        <p>filter component</p>
    </div>
    <div class="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
        <ProductCard imageUrl={"image 3.png"} name = {'product name'} price = {999}/>
    </div>
</div>