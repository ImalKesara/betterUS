<script lang="ts">
	import Mode from './Mode.svelte';
	import '@fontsource/kalam';
	import { Skull } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let { user } = $props();

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
	let value = $state('files');
</script>

{#if user}
	<aside class="sidebar">
		<div>
			<div
				class="flex items-center justify-center gap-x-1 preset-outlined-surface-100-900 border-x-0 border-t-0 p-4"
			>
				<span class="text-xl font-bold">BetterUs</span>
				<span class="text-xl">🤍</span>
			</div>
		</div>

		<!-- Navigation -->
		<nav class="sidebar-nav">
			<ul class="nav-list">
				{#each menuItems as item}
					<li class="nav-item">
						<button class="nav-link">
							<span class="nav-icon">{item.icon}</span>

							<span class="nav-text">{item.label}</span>
							{#if item.badge}
								<span class="badge">{item.badge}</span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Profile -->
		<div class=" grid gap-y-2 preset-outlined-surface-100-900 border-x-0 border-b-0 p-4 mb-10">
			<div class="flex gap-x-2 rounded-lg bg-gray-700 p-3">
				
				<div>
					<div class="user-name">{user.name}</div>
					<div class="user-email">@{user.email.split('@')[0]}</div>
				</div>
			</div>
			<div class="flex flex-col items-center gap-2">
				<button class="btn preset-filled-primary-500" onclick={loginOut}>Logout</button>
				<Mode />
			</div>
		</div>
	</aside>
{/if}

