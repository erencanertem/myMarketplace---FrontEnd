// src/lib/store/cart.js
import { writable } from 'svelte/store';
import { fetchCart, addToCart, removeFromCart, updateCartItemQuantity } from '../api/cart';
import { notifications } from './notifications';

function createCartStore() {
    const { subscribe, set, update } = writable({
        items: [],
        loading: false,
        error: null
    });

    return {
        subscribe,
        loadCart: async () => {
            try {
                const cart = await fetchCart();
                set({ items: cart.items, loading: false, error: null });
            } catch (error) {
                set({ items: [], loading: false, error: error.message });
            }
        },
        addItem: async (productId, quantity, selectedSize, selectedColor) => {
            try {
                const item = await addToCart(productId, quantity, selectedSize, selectedColor);
                update(state => ({
                    ...state,
                    items: [...state.items, item]
                }));
                notifications.add('Ürün sepete eklendi', 'success');
            } catch (error) {
                notifications.add(error.message, 'error');
            }
        },
        removeItem: async (itemId) => {
            try {
                await removeFromCart(itemId);
                update(state => ({
                    ...state,
                    items: state.items.filter(item => item.id !== itemId)
                }));
                notifications.add('Ürün sepetten çıkarıldı', 'success');
            } catch (error) {
                notifications.add(error.message, 'error');
            }
        },
        updateQuantity: async (itemId, quantity) => {
            try {
                const updatedItem = await updateCartItemQuantity(itemId, quantity);
                update(state => ({
                    ...state,
                    items: state.items.map(item => 
                        item.id === itemId ? updatedItem : item
                    )
                }));
            } catch (error) {
                notifications.add(error.message, 'error');
            }
        }
    };
}

export const cart = createCartStore();