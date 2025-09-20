<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { signupSchema } from './schemas.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { LoaderCircle } from 'lucide-svelte';
	import toast from 'svelte-5-french-toast';
	import { Button, Input, TextField } from 'svelte-ux';
	import Google from '$lib/components/icons/Google.svelte';
	import Github from '$lib/components/icons/Github.svelte';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(signupSchema),
		onUpdated: async ({ form: f }) => {
			if (!f.valid) {
				toast.error(f.message || 'Form is invalid');
			}
		}
	});

	const { form: formData, enhance, delayed, errors } = form;
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-[420px] space-y-4 rounded-xl p-10">
		<div class="grid grid-cols-2 gap-4">
			<Button color="default" variant="fill-light">
				<p><Google width={24} height={24} /></p>
				<p>Google</p>
			</Button>
			<Button color="default" variant="fill-light">
				<p><Github width={24} height={24} /></p>
				<p>Github</p>
			</Button>
		</div>
		<hr class="hr" />
		<form method="POST" class="grid gap-1" use:enhance>
			<!-- name -->
			<Field {form} name="name">
				<Control>
					{#snippet children({ props })}
						<TextField
							type="text"
							{...props}
							label="Full name"
							bind:value={$formData.name}
							error={$errors.name}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
			<!-- email -->
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<TextField
							type="email"
							{...props}
							label="Email address"
							bind:value={$formData.email}
							error={$errors.email}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>

			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<TextField
							type="password"
							{...props}
							label="Password"
							bind:value={$formData.password}
							error={$errors.password}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>

			{#if $delayed}
				<Button color="primary" variant="fill-light" disabled>
					<LoaderCircle class="animate-spin" size="16" />
					Please wait...
				</Button>
			{:else}
				<Button color="primary" variant="fill-light" type="submit">Sign up</Button>
			{/if}

			<p class="mt-1 text-center text-sm">
				Already have an account? <a href="/auth/login" class="font-semibold">Login</a>
			</p>
		</form>
	</div>
</div>
