// src/routes/checkout/+page.svelte
<script>
    import { cart } from '$lib/store/cart';
    import { notifications } from '$lib/store/notifications';
    import { processPayment } from '$lib/api/payment';
    import { goto } from '$app/navigation';
	import { createOrder } from '$lib/api/orders.js';

    let loading = false;
    let cardNumber = '';
    let cardName = '';
    let expiryMonth = '';
    let expiryYear = '';
    let cvv = '';

    $: total = $cart.items?.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0) || 0;

    // Test kartları gösterimi için
    const testCards = [
        { type: 'Başarılı Ödeme', number: '4242424242424242' },
        { type: 'Başarısız Ödeme', number: '4000000000000002' },
        { type: 'Hata', number: '4000000000000069' }
    ];

    async function handleSubmit() {
        loading = true;
        try {
            const order = await createOrder($cart.items);
            const result = await processPayment(order.id, cardNumber, total);
            
            if (result.success) {
                notifications.add('Ödeme başarıyla tamamlandı', 'success');
                await goto(`/profile/orders/${order.id}`); // Bu satırı güncelledik
            } else {
                notifications.add('Ödeme başarısız oldu', 'error');
            }
        } catch (error) {
            notifications.add(error.message || 'Ödeme işlemi sırasında bir hata oluştu', 'error');
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Ödeme</h1>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Sepet Özeti</h2>
        {#each $cart.items || [] as item}
            <div class="flex justify-between items-center mb-2">
                <div>
                    <span class="font-medium">{item.product.name}</span>
                    <span class="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                </div>
                <span>{(item.product.price * item.quantity).toFixed(2)} TL</span>
            </div>
        {/each}
        <div class="border-t mt-4 pt-4">
            <div class="flex justify-between font-bold">
                <span>Toplam</span>
                <span>{total.toFixed(2)} TL</span>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-yellow-800 mb-2">Test Kartları</h3>
        <div class="space-y-1">
            {#each testCards as card}
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">{card.type}:</span>
                    <span class="font-mono">{card.number}</span>
                </div>
            {/each}
        </div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
            <label for="cardName" class="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
            <input
                type="text"
                id="cardName"
                bind:value={cardName}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Kart Numarası</label>
            <input
                type="text"
                id="cardNumber"
                bind:value={cardNumber}
                required
                minlength="16"
                maxlength="16"
                inputmode="numeric"
                placeholder="XXXX XXXX XXXX XXXX"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Son Kullanma Tarihi</label>
                <div class="grid grid-cols-2 gap-2">
                    <select
                        bind:value={expiryMonth}
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Ay</option>
                        {#each Array(12) as _, i}
                            <option value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                            </option>
                        {/each}
                    </select>
        
                    <select
                        bind:value={expiryYear}
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Yıl</option>
                        {#each Array(10) as _, i}
                            <option value={String((new Date().getFullYear() + i) % 100).padStart(2, '0')}>
                                {new Date().getFullYear() + i}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        
            <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    bind:value={cvv}
                    required
                    minlength="3"
                    maxlength="3"
                    inputmode="numeric"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'İşleniyor...' : `${total.toFixed(2)} TL Öde`}
        </button>
    </form>
</div>