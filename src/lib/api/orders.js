const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function createOrder(items) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ items })
    });

    if (!response.ok) {
        throw new Error('Sipariş oluşturulamadı');
    }

    return response.json();
}