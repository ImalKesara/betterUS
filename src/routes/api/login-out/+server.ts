import { createSessionClient, SESSION_COOKIE } from '$lib/server/appwrite';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const { account } = createSessionClient(event);
	await account.deleteSession('current');
	event.cookies.delete(SESSION_COOKIE, { path: '/' });
	
	return new Response(null, { status: 204 });

}
