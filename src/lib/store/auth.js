// src/lib/store/auth.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
    // Başlangıç değerlerini browser kontrolü ile set et
    const initialState = {
        user: null,
        isAuthenticated: false,
        token: null
    };

    if (browser) {
        const token = localStorage.getItem('token');
        if (token) {
            initialState.token = token;
            initialState.isAuthenticated = true;
        }
    }

    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        login: async (email, password) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Giriş başarısız');
            }

            const { user, token } = data;
            if (browser) {
                localStorage.setItem('token', token);
            }

            set({
                user,
                isAuthenticated: true,
                token
            });
        },
        register: async (name, email, password) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            set({
                user: data.user,
                isAuthenticated: true
            });
        },
        logout: () => {
            set({
                user: null,
                isAuthenticated: false,
                token: null
            });
            if (browser) {
                localStorage.removeItem('token');
            }
        },
        initialize: async () => {
            if (!browser) return;

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    localStorage.removeItem('token');
                    return;
                }

                const user = await response.json();
                set({
                    user,
                    isAuthenticated: true,
                    token
                });
            } catch {
                if (browser) {
                    localStorage.removeItem('token');
                }
            }
        }
    };
}

export const auth = createAuthStore();

// Browser tarafında initialize et
if (browser) {
    auth.initialize();
}