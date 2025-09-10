<script lang="ts">
	import '../../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Main Content -->
<main class="mx-auto flex-1 border-y-0 p-4 relative max-w-2xl text-black">
	<div class=" absolute blur-3xl top-60 left-30 rounded-full  h-[450px] w-[450px] -z-10 bg-primary-100 dark:bg-secondary-50-950">1</div>
	{@render children?.()}
</main>



