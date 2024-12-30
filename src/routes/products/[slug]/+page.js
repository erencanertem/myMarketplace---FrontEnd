import { fetchProductById } from '$lib/api/products';

export async function load({ params }) {
    try {
        const product = await fetchProductById(params.slug);
        console.log('Loaded product:', product); // Debug için
        return { product };
    } catch (error) {
        console.error('Error loading product:', error);
        return {
            product: null,
            error: 'Ürün bulunamadı'
        };
    }
}