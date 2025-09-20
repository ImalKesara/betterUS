<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<script>
		const mode = localStorage.getItem('mode') || 'light';
		document.documentElement.setAttribute('data-mode', mode);
	</script>
</svelte:head>

<div class="mode-toggle">
	<button onclick={() => window?.toggleTheme && window.toggleTheme()}>Theme</button>
</div>
