<script lang="ts">
	import { postModal } from '$lib/state/modal.svelte';
	import { Heart, ImagePlus, MessageSquare, Repeat, Smile } from 'lucide-svelte';
	import { Button, Dialog, TextField, Toggle } from 'svelte-ux';
	import { fade } from 'svelte/transition';
	// import X from 'phosphor-svelte/lib/X';
	let { handleSubmit } = $props();
	let text: string = $state('');
</script>

<Dialog
	bind:open={postModal.value}
	class="fixed top-5 left-1/2 grid w-full max-w-2xl -translate-x-1/2 gap-y-2 rounded-2xl p-4"
	persistent
>
	<div class="flex justify-between">
		<Button variant="default" size="md" color="default" onclick={() => postModal.setFalse()}
			>Cancel</Button
		>
		<Button variant="fill-outline" size="md" color="default" class="border-none text-white"
			>Post</Button
		>
	</div>

	<TextField
		label="Share your good acts"
		class="text-xl"
		multiline
		classes={{ input: 'h-[100px]' }}
	/>

	<hr />

	<div class="grid">
		<div class="my-2 grid grid-cols-3 justify-items-center">
			<Heart size="16" />
			<Repeat size="16" />
			<MessageSquare size="16" />
		</div>
	</div>
</Dialog>
