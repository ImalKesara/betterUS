import { createSessionClient } from '$lib/server/appwrite';
import { ID } from 'node-appwrite';
import type { RequestEvent } from './$types';
import { json } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const { tablesDB } = createSessionClient(event);
	const result = await tablesDB.listRows({
		databaseId: '68c2ff7100366d79a1d2',
		tableId: 'posts',
		queries: []
	});

	return json(result, { status: 200 });
}

export async function POST(event: RequestEvent) {
	const data = await event.request.json();
	const { content } = data;

	try {
		const { tablesDB } = createSessionClient(event);
		const user = event.locals.user;

		const result = await tablesDB.createRow({
			databaseId: '68c2ff7100366d79a1d2',
			tableId: 'posts',
			rowId: ID.unique(),
			data: {
				userId: user?.$id,
				content,
				name: user?.name,
				email: user?.email,
				mediaUrl: null,
				likesCount: 0,
				commentsCount: 0
			}
		});

		return json(result, { status: 201, statusText: 'Post added success' });
	} catch (error) {
		console.error(error);
		return json(null, { status: 400, statusText: 'Failed to create post' });
	}
}
