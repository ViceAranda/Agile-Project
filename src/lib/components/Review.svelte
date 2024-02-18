<script>
    export let customerName = "James";
    export let productName = "Uniform";
    export let score = 1;
    export let comments = "";
</script>
  
<div class="customer-review border p-4 m-4 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-2 text-gray-800">{customerName}'s Review</h3>
    <p>Product: {productName}</p>
    <p>Score: {score} </p>
    <p>Comments: {comments}</p>
</div>

