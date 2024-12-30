<script>
    import { auth } from '$lib/store/auth';
    export let data;
    let orders = data.orders;
    
    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Siparişlerim</h1>

    {#if !orders || orders.length === 0}
        <div class="text-center py-8 bg-gray-50 rounded-lg">
            <p class="text-gray-600">Henüz hiç siparişiniz bulunmuyor.</p>
            <a href="/products" class="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                Alışverişe Başla
            </a>
        </div>
    {:else}
        <div class="space-y-4">
            {#each orders as order}
                <a 
                    href="/profile/orders/{order.id}" 
                    class="block border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-medium">Sipariş #{order.id}</h3>
                            <p class="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <div class="text-right">
                            <span class="inline-block px-3 py-1 rounded-full text-sm
                                {order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                                order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'SHIPPED' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'}">
                                {order.status === 'COMPLETED' ? 'Tamamlandı' : 
                                order.status === 'PROCESSING' ? 'İşleniyor' :
                                order.status === 'SHIPPED' ? 'Kargoda' :
                                order.status === 'DELIVERED' ? 'Teslim Edildi' :
                                order.status}
                            </span>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        {#each order.items as item}
                            <div class="flex justify-between items-center py-2">
                                <div>
                                    <p class="font-medium">{item.product.name}</p>
                                    <p class="text-sm text-gray-500">{item.quantity} adet</p>
                                </div>
                                <p class="font-medium">{item.price} TL</p>
                            </div>
                        {/each}
                    </div>

                    <div class="border-t mt-4 pt-4 flex justify-between items-center">
                        <span class="font-medium">Toplam</span>
                        <span class="font-bold text-lg">{order.total.toFixed(2)} TL</span>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>