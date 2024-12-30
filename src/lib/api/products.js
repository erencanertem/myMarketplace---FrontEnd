const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchProducts(fetch) {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error('Ürünler getirilemedi');
    }
    return response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Ürün getirilemedi');
    }
    return response.json();
}