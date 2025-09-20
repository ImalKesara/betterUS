import { createSessionClient } from '$lib/server/appwrite';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { tablesDB } = createSessionClient(event);

	const profile = await tablesDB.getRow({
		databaseId: '68c2ff7100366d79a1d2',
		tableId: 'user_profile',
		rowId: event.locals.user?.$id ?? ''
	});

	

	return {
		user: event.locals.user,
		profile
	};
};
