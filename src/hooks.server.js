import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('token');
    const protectedPaths = ['/profile'];

    // Eğer korumalı bir sayfaya erişilmeye çalışılıyorsa
    if (protectedPaths.includes(event.url.pathname)) {
        // Token yoksa login'e yönlendir
        if (!token) {
            throw redirect(307, '/auth/login');
        }
    }

    return resolve(event);
}