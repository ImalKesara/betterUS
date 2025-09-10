<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';
	import { createToaster, Toaster } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	const toaster = createToaster({ placement: 'top' });

	const handleClick = () => {
		postModal.setTrue();
	};

	const submitPost = (data) => {
		console.log(data);
	};

	onMount(() => {
		if (data.user) {
			toaster.success({
				title: `Welcome back ${data.user.name}`,
				description: 'You have successfully logged in!',
				closable: true
			});
		}
	});
</script>

<Toaster {toaster}></Toaster>

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
