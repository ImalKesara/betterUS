<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';
	import { createToaster, Toaster } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { data } = $props();
	const toaster = createToaster({ placement: 'top' });

	const handleClick = () => {
		postModal.setTrue();
	};

	const submitPost = (data) => {
		console.log(data);
	};

	onMount(() => {
		if (page.url.searchParams.get('login') === 'success') {
			toaster.success({
				title: `Welcome ${data.user.name}`,
				description: 'You have successfully logged in!',
				closable: false
			});
			history.replaceState({}, '', '/');
		}
	});
</script>

<Toaster {toaster} classes="bg-green-400 text-white "></Toaster>

<div class="my-5 grid">
	<div class="">
		<label class="col-span-4 label">
			<span class="label-text text-center">Share your good acts to people</span>
			<input class="input btn" type="text" placeholder="Your thoughts..." onclick={handleClick} />
		</label>
	</div>

	<hr class="my-8 hr" />
</div>

<Post handleSubmit={submitPost} />
