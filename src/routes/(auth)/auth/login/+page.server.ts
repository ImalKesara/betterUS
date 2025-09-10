import { fail, message, superValidate } from 'sveltekit-superforms';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schemas';
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { account } = createAdminClient();

		try {
			const session = await account.createEmailPasswordSession(form.data.email, form.data.password);

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

			// Handle other unexpected errors
			return fail(500, { form, message: 'Failed to log in. Please try again later.' });
		}

		redirect(302, '/');
	}
};
