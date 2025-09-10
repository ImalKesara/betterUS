<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { postModal } from '$lib/state/modal.svelte';

	let { data } = $props();

	const handleClick = () => {
		postModal.setTrue();
	};

	const submitPost = (data) => {
		console.log(data);
	};
</script>

<div class="my-5 grid">
	<div class="">
		<label class="col-span-4 label">
			<span class="label-text text-center">Share your good acts to people</span>
			<input class="input btn" type="text" placeholder="Your thoughts..." onclick={handleClick} />
		</label>
	</div>

	<hr class="hr my-8">
</div>

<Post handleSubmit={submitPost} />
