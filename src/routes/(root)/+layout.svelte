<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-5-french-toast';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const { user, profile } = data;
	console.log(profile);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />

<div class="mx-auto flex min-h-screen max-w-6xl">
	<Navbar {user} {profile}/>

	<main class="mx-auto max-w-2xl flex-1 border-[1px] border-y-0 border-gray-400 p-4">
		<div class="flex items-center justify-center gap-x-1 p-4">
			<span class="text-xl font-bold">BetterUs</span>
			<span class="text-xl">🤍</span>
		</div>
		{@render children?.()}
	</main>

	<Footer />
</div>
