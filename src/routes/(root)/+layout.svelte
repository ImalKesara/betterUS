<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-sonner';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const user = data.user;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster richColors></Toaster>

<div class="mx-auto flex min-h-screen max-w-6xl">
	<!-- Left Sidebar -->
	<Navbar {user} />

	<!-- Main Content -->
	<main class="mx-auto max-w-2xl flex-1 preset-outlined-surface-100-900 border-y-0 p-4">
		{@render children?.()}
	</main>

	<!-- Right Sidebar -->
	<Footer />
</div>
