<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	import {
		ArrowLeft,
		Paperclip,
		Bell,
		Calendar,
		CircleUser,
		Menu,
		Icon,
		Folder,
		Image,
		Music,
		Video,
		Settings,
		Heart
	} from 'lucide-svelte';
	import Mode from './Mode.svelte';
	import { page } from '$app/state';
	import '@fontsource/kalam';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
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
				<Avatar name={user.name} style="background-color: #bada55; color: black;" size="size-10" />
				<div>
					<div class="user-name">{user.name}</div>
					<div class="user-email">@{user.email.split('@')[0]}</div>
				</div>
			</div>
			<div class="flex flex-col items-center gap-4">
				<button class="btn preset-filled-primary-500" onclick={loginOut}>Logout</button>
				<Mode />
			</div>
		</div>
	</aside>
{/if}

<style>
	.sidebar {
		top: 0;
		left: 0;
		height: 100vh;
		width: 280px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		z-index: 1000;
	}

	.sidebar-nav {
		flex: 1;
		padding: 20px 0;
		overflow-y: auto;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0 16px;
	}

	.nav-item {
		margin-bottom: 4px;
	}

	.nav-link {
		width: 100%;
		padding: 12px 16px;
		background: transparent;
		border: none;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		transform: translateX(4px);
	}

	.nav-icon {
		font-size: 18px;
		min-width: 20px;
		text-align: center;
	}

	.nav-text {
		flex: 1;
		text-align: left;
		white-space: nowrap;
	}

	.user-name {
		color: white;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 2px;
	}

	.user-email {
		color: rgba(255, 255, 255, 0.7);
		font-size: 12px;
	}
</style>
