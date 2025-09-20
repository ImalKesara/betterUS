<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import { Heart, MessageSquare, Repeat } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import toast from 'svelte-5-french-toast';

	let { data } = $props();
	let loading: boolean = $state(true);
	let posts: any[] = $state([]);

	const handleClick = () => {
		postModal.setTrue();
	};

	const listPosts = async () => {
		try {
			const response = await fetch('api/posts');
			if (!response.ok) throw new Error('Failed to fetch posts');
			const data = await response.json();
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
			toast.success(`Welcome ${data.user.name}`);
			replaceState(resolve('/'), {});
		}
		listPosts();
	});
</script>

<div class="my-5 grid">
	<div class="relative">
		<label class="label col-span-4">
			<input
				type="text"
				class="w-full border-b-[1px] border-gray-400 p-2 focus:outline-none"
				placeholder="Your thoughts..."
				onclick={handleClick}
			/>

			<Post handleSubmit={submitPost} />
		</label>
	</div>

	<!-- list post -->
	{#if loading}
		<div class="flex items-center justify-between">
			<Jumper size="60" color="#3b82f6" unit="px" duration="1s" />
		</div>
	{:else}
		{#each posts as post}
			<div class="my-2 grid p-3" transition:fade>
				<!-- Avatar -->
				<div class="mb-2 flex items-center justify-start gap-x-2">
					<div class="">
						<p class="font-semibold">{post.name}</p>
						<p class="text-sm text-gray-500">@{post.email.split('@')[0]}</p>
					</div>
				</div>

				<div class="grid">
					<p class="break-words">{post.content}</p>
					<hr class="hr mt-3" />
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
