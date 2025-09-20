<script lang="ts">
	import { postModal } from '$lib/state/modal.svelte';
	import { ImagePlus, Smile } from 'lucide-svelte';
	// import X from 'phosphor-svelte/lib/X';
	let { handleSubmit } = $props();
	let text: string = $state('');
</script>



