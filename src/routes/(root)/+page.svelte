<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import { Avatar, createToaster, Toaster } from '@skeletonlabs/skeleton-svelte';
	import { Heart, MessageSquare, Repeat } from 'lucide-svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { replaceState, pushState } from '$app/navigation';

	let { data } = $props();
	let loading: boolean = $state(true);
	let posts: any[] = $state([]);
	const toaster = createToaster({ placement: 'top' });

	const handleClick = () => {
		postModal.setTrue();
	};

	const listPosts = async () => {
		try {
			const response = await fetch('api/posts');
			if (!response.ok) throw new Error('Failed to fetch posts');
			const data = await response.json();
			console.log(data);
			posts = data.rows;
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};

	const submitPost = async (content: string) => {
		try {
			await fetch('api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ content })
			});
			postModal.setFalse();
			await listPosts();
		} catch (error) {
			console.log(error);
		}
	};

	onMount(async () => {
		if (page.url.searchParams.get('login') === 'success') {
			toaster.success({
				title: `Welcome ${data.user.name}`,
				description: 'You have successfully logged in!',
				closable: false
			});
			replaceState('/', {});
		}
		listPosts();
	});
</script>

<Toaster
	{toaster}
	messageClasses="text-center flex item-center justify-center"
	classes="bg-green-400 text-white "
></Toaster>

<div class="my-5 grid">
	<div class="">
		<label class="col-span-4 label">
			<span class="label-text text-center">Share your good acts to people</span>
			<input class="input btn" type="text" placeholder="Your thoughts..." onclick={handleClick} />
		</label>
	</div>

	<hr class="my-8 hr" />

	<!-- list post -->
	{#if loading}
		<div class="flex items-center justify-between">
			<Jumper size="60" color="#3b82f6" unit="px" duration="1s" />
		</div>
	{:else}
		{#each posts as post}
			<div class="my-2 grid grid-cols-12 card preset-outlined-surface-100-900 p-6" transition:fade>
				<!-- Avatar -->
				<div class="col-span-1 mr-6 justify-items-center">
					<Avatar size="size-12" name={post.name} background="preset-filled-secondary-500">
						{data.user.$id === post.userId ? data.user.name[0].toUpperCase() : '<3'}
					</Avatar>
				</div>

				<div class="col-span-11 grid">
					<div class="my-1">
						<p class="font-semibold">{data.user.name}</p>
						<p class="text-sm text-gray-500">@{data.user.email.split('@')[0]}</p>
					</div>
					<p class="break-words">{post.content}</p>
					<hr class="mt-3 hr" />
					<div class="my-2 grid grid-cols-3 justify-items-center">
						<Heart size="16" />
						<Repeat size="16" />
						<MessageSquare size="16" />
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<Post handleSubmit={submitPost} />
