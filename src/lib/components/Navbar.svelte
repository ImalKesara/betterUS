<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { ArrowLeft, Paperclip, Bell, Calendar, CircleUser, Menu } from 'lucide-svelte';
	import Mode from './Mode.svelte';
	import { page } from '$app/state';
	import '@fontsource/kalam';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import { Skull } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let { user } = $props();

	const navItems = [
		{ name: 'Home', path: '/', icon: '🏠' },
		{ name: 'Profile', path: user ? `/profile/${user.$id}` : '/login', icon: '👤' },
		{ name: 'Messages', path: '/messages', icon: '✉️' },
		{ name: 'Notifications', path: '/notifications', icon: '🔔' }
	];

	const loginOut = async () => {
		const response = await fetch('/api/login-out', {
			method: 'POST'
		});
		if (response.ok) {
			goto('/auth/login');
		}
	};
</script>

{#if user}
	<aside class="grid gap-4 p-4">
		<h2 class="text-center text-2xl font-bold">BetterUs</h2>
		<div>
			<div class="py-6">
				<div class="flex items-center gap-2 p-2">
					<Avatar size="size-12" name={user.name}>{user.name[0].toUpperCase()}</Avatar>
					<div>
						<p class="font-semibold">{user.name || user.email}</p>
						<p class="text-sm text-gray-500">@{user.email.split('@')[0]}</p>
					</div>
				</div>
			</div>

			<nav class="space-y-2">
				{#each navItems as item}
					<a
						href={item.path}
						class="flex items-center rounded-lg p-2 hover:bg-blue-100 {page.url.pathname ===
						item.path
							? 'bg-blue-100 text-blue-600'
							: 'text-gray-700'}"
					>
						<span class="mr-3">{item.icon}</span>
						<span>{item.name}</span>
					</a>
				{/each}
			</nav>
		</div>

		<div class="flex flex-col items-center gap-4">
			<button class="btn preset-filled-primary-500" onclick={loginOut}>Logout</button>
			<Mode />
		</div>
	</aside>
{/if}
