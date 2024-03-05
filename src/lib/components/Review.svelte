<script>
    export let customerName = "James";
    export let productName = "Uniform";
    export let score = 1;
    export let comments = "";
</script>
  
<div class="customer-review border p-4 m-4 rounded-lg shadow-sm">
    <h3 class="text-xl font-bold underline underline-offset-1  mb-2 text-gray-800">
        {customerName}'s Review
    </h3>
    <p class="text-lg font-semibold leading-6 text-gray-900">
        Product: {productName}
    </p>
    <p class="">
        Score: {score} out of 5
    </p>
    <p class="">
        Comments: {comments}
    </p>
</div>

