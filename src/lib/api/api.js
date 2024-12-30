// src/lib/api/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...defaultOptions,
        ...options
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Bir hata oluştu');
    }

    return response.json();
}