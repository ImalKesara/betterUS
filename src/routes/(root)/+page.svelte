<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';
	import { fade } from 'svelte/transition';
	import { Heart, MessageSquare, Repeat } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import toast from 'svelte-5-french-toast';
	import { Button } from 'svelte-ux';

	let { data } = $props();
	let loading: boolean = $state(true);
	interface Post {
		$id: string;
		content: string;
		imgUrl: string | null;
		created_at: string;
		updated_at: string;
	}
	let posts: Post[] = $state([]);
	let liked: boolean = $state(false);

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
			const response = await fetch('api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ content })
			});

			if (!response.ok) throw new Error('Failed to create post');

			postModal.setFalse();
			toast.success(response.statusText);
			await listPosts();
		} catch (error) {
			console.log(error);
		}
	};

	let likedPosts: { [postId: string]: boolean } = $state({});
	const toggleLike = async (postId: string) => {
		likedPosts[postId] = !likedPosts[postId];
		console.log($state.snapshot(likedPosts));
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
	<div class="mb-4">
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
		<Button loading class="mt-10">Loading...</Button>
	{:else}
		{#each posts as post (post.$id)}
			<div class="my-2 grid rounded-2xl border-[1px] border-gray-400 p-4" transition:fade>
				<div class="grid">
					<p class="mb-3 break-words">{post.content}</p>
					<div>
						<div class="my-2 grid grid-cols-3 justify-items-center">
							<Button
								size="sm"
								variant="default"
								rounded="full"
								onclick={() => toggleLike(post.$id)}
							>
								<span transition:fade>
									<Heart size="16" fill={likedPosts[post.$id] ? 'red' : 'none'} />
								</span>
							</Button>
							<Repeat size="16" />
							<MessageSquare size="16" />
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
