<script lang="ts">
	import '../../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';
	import { Toaster } from 'svelte-sonner';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster richColors></Toaster>

<!-- Main Content -->
<main class="relative mx-auto max-w-2xl flex-1 border-y-0 p-4 text-black">
	{@render children?.()}
</main>
