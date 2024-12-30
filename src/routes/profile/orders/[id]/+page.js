// src/routes/profile/orders/[id]/+page.js
export async function load({ params }) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            return {
                order: null,
                error: 'Sipariş bulunamadı'
            };
        }

        const order = await response.json();
        return {
            order,
            error: null
        };
    } catch (error) {
        return {
            order: null,
            error: 'Sipariş detayları alınamadı'
        };
    }
}