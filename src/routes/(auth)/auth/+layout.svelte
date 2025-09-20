<script lang="ts">
	import '../../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';
	import { Toaster } from 'svelte-5-french-toast';
	

	let { children }: { children: Snippet } = $props();
</script>

<Toaster />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Main Content -->
<main class="relative mx-auto max-w-2xl flex-1 border-y-0 p-4">
	{@render children?.()}
</main>
