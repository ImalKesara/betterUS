<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-5-french-toast';
	import { Heart } from 'lucide-svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const { user, profile } = data;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />

<div class="mx-auto grid min-h-screen max-w-6xl grid-cols-12">
	<div class="col-span-3 hidden border-r border-gray-400 md:block">
		<Navbar {user} {profile} />
	</div>

	<main class="col-span-6 px-3">
		<div class="flex items-center justify-center gap-x-1 p-4">
			<span class="text-xl font-bold">BetterUs</span>
			<span class="text-xl">
				<Heart size="22" fill="red" />
			</span>
		</div>
		{@render children?.()}
	</main>

	<div class="col-span-3 hidden border-l border-gray-400 md:block">
		<Footer />
	</div>
</div>
