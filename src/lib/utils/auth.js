import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/store/auth';
import { get } from 'svelte/store';

export function requireAuth() {
    const authState = get(auth);
    if (!authState.isAuthenticated) {
        throw redirect(307, '/auth/login');
    }
}