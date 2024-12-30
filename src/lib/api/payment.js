// src/lib/api/payment.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function processPayment(orderId, cardNumber, amount) {
    const response = await fetch(`${API_URL}/payment/process`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            orderId,
            cardNumber,
            amount
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}