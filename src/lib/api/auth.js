const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

export async function verifyToken(token) {
    const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.ok;
}

export async function getUserData(token) {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Kullanıcı bilgileri alınamadı');
    }

    return response.json();
}

export async function registerUser(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}