<script lang="ts">
	import Mode from './Mode.svelte';
	import '@fontsource/kalam';
	import { goto } from '$app/navigation';
	import { Button } from 'svelte-ux';
	import { Avatar } from 'svelte-ux';

	let { user, profile } = $props();

	const menuItems = [
		{ id: 'dashboard', label: 'Home', icon: '📊' },
		{ id: 'users', label: 'Users', icon: '👥' },
		{ id: 'analytics', label: 'Analytics', icon: '📈' },
		{ id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' },
		{ id: 'help', label: 'Help & Support', icon: '❓' }
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
	<aside class="grid h-screen place-items-center gap-4">
		<div class="flex gap-2">
			<img src={profile.avatarUrl} alt="profile" class="h-10 w-10 rounded-full object-cover" />
			<div class="text-sm">
				<p>{user.name}</p>
				<p class="text-gray-400">@{user.email.split('@')[0]}</p>
			</div>
		</div>

		<!-- Navigation -->
		<nav>
			<ul class="grid gap-y-5">
				{#each menuItems as item}
					<li>
						<Button class="w-full items-start justify-start py-3 text-start">{item.label}</Button>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Profile -->
		<div class=" mb-10 grid gap-y-2 border-x-0 border-b-0 p-4">
			<div class="flex flex-col items-center gap-2">
				<Button variant="fill" color="primary" onclick={loginOut}>Logout</Button>
				<Mode />
			</div>
		</div>
	</aside>
{/if}
