// src/lib/api/cart.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchCart() {
    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Sepet getirilemedi');
    }
    return response.json();
}

export async function addToCart(productId, quantity, selectedSize, selectedColor) {
    const response = await fetch(`${API_URL}/cart/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            productId,
            quantity,
            selectedSize,
            selectedColor
        })
    });
    if (!response.ok) {
        throw new Error('Ürün sepete eklenemedi');
    }
    return response.json();
}

export async function removeFromCart(itemId) {
    const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Ürün sepetten çıkarılamadı');
    }
    return response.json();
}

export async function updateCartItemQuantity(itemId, quantity) {
    const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity })
    });
    if (!response.ok) {
        throw new Error('Miktar güncellenemedi');
    }
    return response.json();
}