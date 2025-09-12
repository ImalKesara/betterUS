<script lang="ts">
	import { postModal } from '$lib/state/modal.svelte';
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { ImagePlus, Smile } from 'lucide-svelte';
	let { handleSubmit } = $props();
	let text: string = $state('');
</script>

<!-- backdropClasses="backdrop-blur-sm" -->

<Modal
	open={postModal.value}
	onOpenChange={(e) => (postModal.value = e.open)}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen"
	positionerAlign="items-start"
	positionerClasses="mt-12"
	closeOnInteractOutside={false}
>
	<!-- {#snippet trigger()}Open Modal{/snippet} -->
	{#snippet content()}
		<div class="flex justify-between gap-4">
			<button type="button" class="btn preset-tonal-surface" onclick={() => postModal.setFalse()}
				>Cancel</button
			>
			<button type="button" class="btn preset-filled" onclick={() => handleSubmit(text)}
				>Post</button
			>
		</div>

		<div class="grid">
			<div></div>
			<label class=" label">
				<span class="label-text">Share your actions</span>
				<textarea
					class="textarea w-[600px]"
					rows="4"
					placeholder="Make the world kinder, one post at a time"
					bind:value={text}
					maxlength="300"
				></textarea>
			</label>
		</div>

		<hr class="hr" />

		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<FileUpload name="example-button" accept="image/*" onFileChange={console.log} maxFiles={1}>
					<button class="btn">
						<ImagePlus />
					</button>
				</FileUpload>
				<Smile />
			</div>
			<div class="flex gap-2">
				<h2 class="">English</h2>
				<p>{300 - text.length}</p>
			</div>
		</div>
	{/snippet}
</Modal>
