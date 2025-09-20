import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/auth/login');

	return {
		user: locals.user
	};
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		if (theme) {
			cookies.set('colorTheme', theme, { path: '/', maxAge: 60 * 60 * 24 * 365 });
		}
	}
};
