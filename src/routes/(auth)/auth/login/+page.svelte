<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { loginSchema } from './schemas.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { Toaster, createToaster } from '@skeletonlabs/skeleton-svelte';

	let { data } = $props();

	const toaster = createToaster({ placement: 'top'});

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				console.log('Form is valid');
			} else {
				console.log(f.errors);
				toaster.error({
					title: f.message,
					description: 'Please check the form for errors.',
					closable: false,
				
				});
			}
		}
	});

	const { form: formData, enhance, message } = form;
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
			<button type="submit" class="btn preset-filled-primary-500">Login</button>
			<p class="mt-1 text-center text-sm">
				Don't have an account? <a href="/auth/signup" class="font-semibold">Sign up</a>
			</p>
		</form>
	</div>
</div>

<style lang="postcss">
	input {
		@apply w-[400px];
	}
</style>
