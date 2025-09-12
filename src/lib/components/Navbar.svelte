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
		{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
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
			<div class="p-4 flex items-center justify-center gap-x-1 preset-outlined-surface-100-900 border-x-0 border-t-0">
				<span class="text-xl font-bold">BetterUs</span>
				<span class="text-xl">🤍</span>
			</div>
		</div>

		<!-- Navigation -->
		<nav class="sidebar-nav">
			<ul class="nav-list">
				{#each menuItems as item}
					<li class="nav-item">
						<!-- <button
							class="nav-link"
							class:active={activeItem === item.id}
							onclick={() => setActive(item.id)}
						>
							<span class="nav-icon">{item.icon}</span>

							<span class="nav-text">{item.label}</span>
							{#if item.badge}
								<span class="badge">{item.badge}</span>
							{/if}
						</button> -->
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Profile -->
		<div class="sidebar-footer">
			<div class="user-profile">
				<div class="user-avatar">
					<img src="https://i.pravatar.cc/40?img=5" alt="User" />
				</div>

				<div class="user-info">
					<div class="user-name">John Doe</div>
					<div class="user-email">john@example.com</div>
				</div>
				<button class="user-menu">⋮</button>
			</div>
		</div>

		<!-- <h2 class="text-center text-2xl font-bold">BetterUs</h2>
		<div>
			<div class="py-6">
				<div class="flex items-center gap-2 p-2">
					<Avatar size="size-12" name={user.name} background="preset-filled-secondary-500"
						>{user.name[0].toUpperCase()}</Avatar
					>
				</div>
			</div>
		</div> -->

		<div class="flex flex-col items-center gap-4">
			<button class="btn preset-filled-primary-500" onclick={loginOut}>Logout</button>
			<Mode />
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

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-text {
		font-size: 20px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.5px;
	}

	.toggle-btn {
		background: rgba(255, 255, 255, 0.15);
		border: none;
		border-radius: 8px;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: white;
		font-size: 14px;
		transition: all 0.2s ease;
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
		color: rgba(255, 255, 255, 0.8);
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

	.nav-link.active {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.nav-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 20px;
		background: white;
		border-radius: 0 2px 2px 0;
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

	.badge {
		background: #ff4757;
		color: white;
		font-size: 11px;
		padding: 2px 6px;
		border-radius: 10px;
		min-width: 18px;
		text-align: center;
		font-weight: 600;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.sidebar-footer {
		padding: 20px 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.user-profile:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.user-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-info {
		flex: 1;
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

	.user-menu {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.8);
		font-size: 16px;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.user-menu:hover {
		background: rgba(255, 255, 255, 0.15);
		color: white;
	}

	/* Scrollbar styling */
	.sidebar-nav::-webkit-scrollbar {
		width: 6px;
	}

	.sidebar-nav::-webkit-scrollbar-track {
		background: transparent;
	}

	.sidebar-nav::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
	}

	.sidebar-nav::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
		}

		.sidebar.collapsed {
			transform: translateX(0);
			width: 100%;
		}
	}
</style>
