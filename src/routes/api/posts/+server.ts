import { createSessionClient, SESSION_COOKIE } from '$lib/server/appwrite';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
   const data = await event.request.json();
   const { content } = data;

   
   
   return new Response(null, { status: 204 });

}
