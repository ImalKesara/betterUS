<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { signupSchema } from './schemas.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { createToaster, Toaster } from '@skeletonlabs/skeleton-svelte';
	import { LoaderCircle } from 'lucide-svelte';

	let { data } = $props();
	const toaster = createToaster({ placement: 'top' });
	const form = superForm(data.form, {
		validators: zodClient(signupSchema),
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				console.log('Form is valid');
			} else {
				console.log(f.errors);
				toaster.error({
					title: f.message,
					description: 'Please check the form for errors.',
					closable: false
				});
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Toaster {toaster} classes="bg-red-400 text-white text-center"></Toaster>

<div class="flex min-h-screen items-center justify-center">
	<div class="space-y-4 card preset-outlined-surface-50-950 bg-white p-10">
		<div class="grid grid-cols-2 gap-4">
			<button class="btn preset-outlined">Google</button>
			<button class="btn preset-filled">Github</button>
		</div>
		<hr class="hr" />
		<form method="POST" class="grid gap-1" use:enhance>
			<!-- name -->
			<Field {form} name="name">
				<Control>
					{#snippet children({ props })}
						<Label>Full Name</Label>
						<input class="input" {...props} type="text" bind:value={$formData.name} />
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
			<!-- email -->
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label>Email</Label>
						<input class="input" {...props} type="email" bind:value={$formData.email} />
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>

			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<Label>Password</Label>
						<input class="input" {...props} type="password" bind:value={$formData.password} />
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>

			{#if $delayed}
				<button class="btn preset-filled-primary-500" disabled>
					<LoaderCircle class="animate-spin" size="16" />
					Please wait...
				</button>
			{:else}
				<button type="submit" class="btn preset-filled-primary-500">Sign up</button>
			{/if}

			<p class="mt-1 text-center text-sm">
				Already have an account? <a href="/auth/login" class="font-semibold">Login</a>
			</p>
		</form>
	</div>
</div>

<style lang="postcss">
	input {
		@apply w-[400px];
	}
</style>
