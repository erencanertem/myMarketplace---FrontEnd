<script>
	import { goto } from '$app/navigation';
  import { cart } from '$lib/store/cart';
  import { notifications } from '$lib/store/notifications';
  import { onMount } from 'svelte';

  onMount(() => {
    cart.loadCart();
  });

  async function handleRemoveItem(itemId, itemName) {
    try {
      await cart.removeItem(itemId);
      notifications.add(`${itemName} sepetten çıkarıldı`, 'success');
    } catch (error) {
      notifications.add('Ürün sepetten çıkarılırken hata oluştu', 'error');
    }
  }

  $: total = $cart.items?.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0) || 0;
</script>

<h1 class="text-3xl font-bold mb-8">Sepetim</h1>

{#if $cart.loading}
  <p class="text-gray-600">Yükleniyor...</p>
{:else if $cart.error}
  <p class="text-red-600">{$cart.error}</p>
{:else if $cart.items?.length === 0}
  <p class="text-gray-600">Sepetiniz boş</p>
{:else}
  <div class="space-y-4">
    {#each $cart.items as item}
      <div class="flex justify-between items-center border-b pb-4">
        <div class="flex gap-4 items-center">
          <img 
            src={item.product.images?.[0] || 'https://via.placeholder.com/150'} 
            alt={item.product.name} 
            class="w-20 h-20 object-cover rounded"
          />
          <div>
            <h3 class="font-semibold">{item.product.name}</h3>
            <p class="text-gray-600">{item.product.price} TL</p>
            {#if item.size}
              <p class="text-sm text-gray-500">Beden: {item.size}</p>
            {/if}
            {#if item.color}
              <p class="text-sm text-gray-500">Renk: {item.color}</p>
            {/if}
            <div class="flex items-center gap-2 mt-2">
              <button 
                class="px-2 py-1 border rounded"
                on:click={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span class="w-8 text-center">{item.quantity}</span>
              <button 
                class="px-2 py-1 border rounded"
                on:click={() => cart.updateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <p class="font-semibold">{(item.product.price * item.quantity).toFixed(2)} TL</p>
          <button 
            on:click={() => handleRemoveItem(item.id, item.product.name)}
            class="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            Kaldır
          </button>
        </div>
      </div>
    {/each}
    
    <div class="text-right">
      <p class="text-xl font-bold">Toplam: {total.toFixed(2)} TL</p>
      <button 
        class="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        disabled={!$cart.items?.length}
        on:click={() => goto("/checkout")}
      >
        Ödemeye Geç
      </button>
    </div>
  </div>
{/if}