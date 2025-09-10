import { fail, superValidate } from 'sveltekit-superforms';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { ID, OAuthProvider } from 'node-appwrite';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from './schemas';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signupSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signupSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { account } = createAdminClient();

		try {
			await account.create(ID.unique(), form.data.email, form.data.password, form.data.name);

			const session = await account.createEmailPasswordSession(form.data.email, form.data.password);

			cookies.set(SESSION_COOKIE, session.secret, {
				sameSite: 'strict',
				expires: new Date(session.expire),
				secure: true,
				path: '/'
			});
		} catch (error) {
			console.error('Error creating account:', error);
			if (error.code === 409) return fail(409, { form, message: 'User already exists.' });
			return fail(500, { form, message: 'Failed to create account. Please try again.' });
		}

		redirect(302, '/');
	}
};
