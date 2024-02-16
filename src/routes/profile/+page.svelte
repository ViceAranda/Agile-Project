<script lang="ts">
    export let name:string = 'james';
    export let email:string = 'james@example.com';
    export let address:string = '123 zzz road';
    //export let orders

</script>

<main class="mx-auto p-8">
    <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Personal Information</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-lg mb-2">Name: {name}</p>
            <p class="text-lg mb-2">Email: {email}</p>
            <p class="text-lg">Address: {address}</p>
        </div>
    </section>

    <section>
        <h2 class="text-2xl font-semibold mb-4">Order History</h2>
        <ul class="list-disc pl-6">
            <li class="text-lg mb-2">Order #1 - Product A - $20.00</li>
            <li class="text-lg mb-2">Order #2 - Product B - $30.00</li>
            <!-- Add more orders as needed -->
        </ul>
    </section>
</main>