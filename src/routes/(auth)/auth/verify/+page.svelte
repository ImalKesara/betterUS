<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const verifyAccount = async () => {
		// Logic to verify the account goes here
		const response = await fetch('/api/verify-account', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: page.url.searchParams.get('userId'),
				secret: page.url.searchParams.get('secret')
			})
		});
		if (response.ok) {
			goto('/');
		} else {
			alert('Failed to verify account.');
		}
	};
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
	<p>Verify your account here</p>
	<button class=" btn preset-filled-success-500" onclick={verifyAccount}>Verify</button>
</div>
