import { fetchProducts } from '$lib/api/products';

export async function load() {
    try {
        const products = await fetchProducts();
        return { products };
    } catch (error) {
        return { products: [] };
    }
}