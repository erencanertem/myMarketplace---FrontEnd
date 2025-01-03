// src/lib/api/api.js
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    console.error('API URL bulunamadı! Environment değişkenlerini kontrol edin.');
}

// Token işlemleri için yardımcı fonksiyonlar
const getToken = () => localStorage.getItem('token');
const removeToken = () => localStorage.removeItem('token');

// API çağrıları için ana fonksiyon
export async function apiCall(endpoint, options = {}) {
    try {
        const token = getToken();
        
        const defaultOptions = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        };

        // URL oluştur ve gereksiz slash'leri temizle
        const url = `${API_URL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");

        const response = await fetch(url, {
            ...defaultOptions,
            ...options
        });

        // Token expire olduysa kullanıcıyı logout yap
        if (response.status === 401) {
            removeToken();
            window.location.href = '/login';
            throw new Error('Oturum süresi doldu');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Sunucu hatası');
        }

        return response.json();
    } catch (error) {
        console.error(`API Hatası (${endpoint}):`, error);
        throw error;
    }
}

// Yardımcı metodlar
export const api = {
    get: (endpoint) => apiCall(endpoint, { method: 'GET' }),
    
    post: (endpoint, data) => apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    
    put: (endpoint, data) => apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    
    delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),
    
    patch: (endpoint, data) => apiCall(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
};