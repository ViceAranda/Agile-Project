<script lang="ts">
	import type { ActionData } from './$types';
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	let loading = false;
	$: console.log(form);
	$: if (form) loading = false;
	$: if (form?.ok) goto('/sign_in');
</script>

<div class="my-36 mx-auto p-8 w-fit min-w-1/3 h-1/3 bg-zinc-100 rounded-lg shadow">
	<h1 class="text-4xl mb-10">Sign Up</h1>
	<form method="post" on:submit={() => (loading = true)} use:enhance>
		{#if form?.unavailable}
			<p
				transition:fly={{ duration: 1000, y: -20 }}
				class="w-full p-2 bg-red-400 rounded text-white"
			>
				Error: Email is already in use
			</p>
		{:else if form?.missing}
			<p
				transition:fly={{ duration: 1000, y: -20 }}
				class="w-full p-2 bg-red-400 rounded text-white"
			>
				Error: Missing data. Make sure to complete all required fields
			</p>
		{:else if form?.message}
			<p
				transition:fly={{ duration: 1000, y: -20 }}
				class="w-full p-2 bg-red-400 rounded text-white"
			>
				Error: {form.message}
			</p>
		{/if}
		<section class="flex gap-4 my-4">
			<div class="flex flex-col">
				<label for="fname">First Name</label>
				<input
					class="border border-zinc-400 rounded w-auto"
					id="fname"
					name="fname"
					type="text"
					value="Test"
					required
				/>
			</div>
			<div class="flex flex-col">
				<label for="lname">Last Name</label>
				<input
					class="border border-zinc-400 rounded w-auto"
					id="lname"
					name="lname"
					type="text"
					value="3"
					required
				/>
			</div>
		</section>
		<section class="flex flex-col my-4">
			<label for="email">Email</label>
			<input
				class="border border-zinc-400 rounded w-auto"
				id="email"
				name="email"
				type="email"
				value="test@3.com"
				required
			/>
		</section>
		<section class="flex flex-col my-4">
			<label for="password">Password</label>
			<input
				class="border border-zinc-400 rounded w-auto"
				id="password"
				name="password"
				type="password"
				value="Incorrect12!"
				required
			/>
		</section>
		<section class="flex flex-col justify-between gap-4 mt-4">
			<a class="text-blue-500 underline" href="/sign_in">Already have an account?</a>
			<button
				class="py-2 px-4 rounded text-white {loading ? 'bg-zinc-300' : 'bg-zinc-900'}"
				disabled={loading}>Sign Up</button
			>
		</section>
	</form>
</div>
