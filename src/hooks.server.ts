import { createSessionClient } from '$lib/server/appwrite';

export async function handle({ event, resolve }) {
	try {
		const { account } = createSessionClient(event);
		event.locals.user = await account.get();
	} catch (e) {
		console.error(e);
		event.locals.user = null;
	}

	return resolve(event);
}
