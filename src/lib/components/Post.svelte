<script lang="ts">
	import { postModal } from '$lib/state/modal.svelte';
	import { Heart, ImagePlus, MessageSquare, Repeat, Smile } from 'lucide-svelte';
	import { Button, Dialog, settings, TextField, Toggle } from 'svelte-ux';
	let { handleSubmit } = $props();
	let text: string = $state('');

	settings({
		components: {
			TextField: {
				classes: {
					container: 'hover:shadow-none group-focus-within:shadow-none border-2 rounded-md border-gray-400 px-3 py-2',
					label: 'text-xl',
				}
			}
		}
	});
</script>

<Dialog
	bind:open={postModal.value}
	class="grid w-full max-w-2xl gap-y-2 rounded-2xl  p-4"
	persistent
>
	<div class="flex justify-between">
		<Button variant="default" size="md" color="default" onclick={() => postModal.setFalse()}
			>Cancel</Button
		>
		<Button
			variant="fill-outline"
			size="md"
			color="secondary"
			class="border-none px-8"
			onclick={() => handleSubmit(text)}>Post</Button
		>
	</div>

	<TextField
		label="Share your good acts"
		bind:value={text}
		max={300}
		multiline
		classes={{
			input: 'h-[100px]'
		}}
	/>

	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<Smile />
		</div>
		<div class="flex gap-2">
			<h2 class="">English</h2>
			<p>{300 - text.length}</p>
		</div>
	</div>
</Dialog>

