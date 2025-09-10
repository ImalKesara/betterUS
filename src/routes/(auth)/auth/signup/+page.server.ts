import { fail, message, superValidate } from 'sveltekit-superforms';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { ID, OAuthProvider } from 'node-appwrite';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from './schemas';
import { redirect } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';

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

			const promise = account.createVerification(`${BASE_URL}/auth/verify`);

			promise
				.then(() => console.log('Verification email sent successfully'))
				.catch((error) => console.log(error));

			cookies.set(SESSION_COOKIE, session.secret, {
				sameSite: 'strict',
				expires: new Date(session.expire),
				secure: true,
				path: '/'
			});
		} catch (error) {
			if (error.response) {
				const errorMessage = JSON.parse(error.response);
				return message(form, errorMessage.message, { status: error.code });
			}

			return fail(500, { form, message: 'Failed to create account. Please try again.' });
		}

		redirect(302, '/');
	}
};
