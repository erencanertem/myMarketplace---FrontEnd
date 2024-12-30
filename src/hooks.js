import { auth } from '$lib/store/auth';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Her sayfa yüklendiğinde token kontrolü yap
    await auth.checkAuth();
    
    return resolve(event);
}