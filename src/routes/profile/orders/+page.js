// src/routes/profile/orders/+page.js
export async function load() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const orders = await response.json();
        return { orders };
    } catch (error) {
        return { orders: [] };
    }
}