import { createSessionClient } from '$lib/server/appwrite';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const data = await event.request.json();
	const { userId, secret } = data;

	const { account } = createSessionClient(event);

	const promise = account.updateVerification({ userId, secret });

	promise
		.then(() => {
			console.log('User email verified successfully');
		})
		.catch((error) => {
			console.log(error);
		});

	return json(null, { status: 200, statusText: 'Verification email sent successfully' });
}
