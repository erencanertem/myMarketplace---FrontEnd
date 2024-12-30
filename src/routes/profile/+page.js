import { requireAuth } from '$lib/utils/auth';

export function load() {
    requireAuth();
    return {};
}