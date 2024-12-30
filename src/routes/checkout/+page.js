import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/store/auth';
import { cart } from '$lib/store/cart';
import { get } from 'svelte/store';

export function load() {
    const authState = get(auth);
    if (!authState.isAuthenticated) {
        throw redirect(307, '/auth/login');
    }

    const cartState = get(cart);
    if (!cartState.items?.length) {
        throw redirect(307, '/cart');
    }
}