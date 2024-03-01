<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	export let formResult: ActionResult;
</script>

<section>
	<form method="post" use:enhance>
		{#if formResult.type === 'error'}
			{formResult.error}
		{/if}
		<div class="group">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required />
		</div>

		<div class="group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />
		</div>

		<div class="submit-container">
			<button type="submit">Sign In</button>
		</div>
	</form>

	<div class="actions">
		<a href="/auth/sign_up">Sign Up</a>
	</div>
</section>
