<script>
  export let product;
  import { cart } from '$lib/store/cart';
  import { notifications } from '$lib/store/notifications';
  import { auth } from '$lib/store/auth';

  async function addToCart() {
    if (!$auth.isAuthenticated) {
      notifications.add('Lütfen önce giriş yapın', 'error');
      return;
    }

    try {
      await cart.addItem(
        product.id,
        1, // varsayılan miktar
        'M', // varsayılan beden
        'Beyaz' // varsayılan renk
      );
    } catch (error) {
      notifications.add('Ürün sepete eklenirken bir hata oluştu', 'error');
    }
  }
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <a href="/products/{product.id}" class="block">
      <img 
          src={product.images?.[0] || 'https://via.placeholder.com/300'} 
          alt={product.name}
          class="w-full h-48 object-cover"
      />
      <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{product.name}</h3>
          <p class="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div class="flex justify-between items-center">
              <span class="text-lg font-bold">{product.price} TL</span>
              <span class="text-sm text-gray-500">Stok: {product.stock}</span>
          </div>
      </div>
  </a>
  <div class="p-4 pt-0">
      <button 
          on:click={addToCart}
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
      >
          {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
      </button>
  </div>
</div>