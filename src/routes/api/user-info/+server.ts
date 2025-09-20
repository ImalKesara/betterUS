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
