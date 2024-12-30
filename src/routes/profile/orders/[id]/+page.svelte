<script>
    export let data;
    const { order, error } = data; // Şimdi error tanımlı olacak

    function formatDate(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const statusMap = {
        'PENDING': 'Bekliyor',
        'PROCESSING': 'İşleniyor',
        'SHIPPED': 'Kargoya Verildi',
        'DELIVERED': 'Teslim Edildi',
        'CANCELLED': 'İptal Edildi'
    };
</script>

<div class="max-w-4xl mx-auto p-4">
    <div class="mb-6">
        <a href="/profile/orders" class="text-blue-500 hover:text-blue-600">← Siparişlerime Dön</a>
    </div>

   {#if error}
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
        </div>
        {:else if !order}
        <div class="bg-gray-50 rounded-lg p-4 text-gray-600">
            Yükleniyor...
        </div>
        {:else}
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Sipariş #{order.id}</h1>
                    <p class="text-gray-600 mt-1">{formatDate(order.createdAt)}</p>
                </div>
                <span class="inline-block px-4 py-2 rounded-full text-sm
                    {order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                    order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                    order.status === 'SHIPPED' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'}">
                    {statusMap[order.status] || order.status}
                </span>
            </div>
    
            <div class="border-t border-gray-200 pt-6">
                <h2 class="text-lg font-semibold mb-4">Sipariş Detayı</h2>
                <div class="space-y-4">
                    {#each order.items as item}
                        <div class="flex items-center justify-between py-4 border-b">
                            <div class="flex items-center space-x-4">
                                <img 
                                    src={item.product.images?.[0] || 'https://via.placeholder.com/100'} 
                                    alt={item.product.name}
                                    class="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <h3 class="font-medium">{item.product.name}</h3>
                                    <p class="text-sm text-gray-500">Birim Fiyat: {item.price} TL</p>
                                    <p class="text-sm text-gray-500">Adet: {item.quantity}</p>
                                    {#if item.size}
                                        <p class="text-sm text-gray-500">Beden: {item.size}</p>
                                    {/if}
                                    {#if item.color}
                                        <p class="text-sm text-gray-500">Renk: {item.color}</p>
                                    {/if}
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">{(item.price * item.quantity).toFixed(2)} TL</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
    
            <div class="mt-6 border-t border-gray-200 pt-6">
                <div class="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{order.total.toFixed(2)} TL</span>
                </div>
            </div>
        </div>
   {/if}
</div>