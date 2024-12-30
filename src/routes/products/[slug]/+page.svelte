<script>
    import { notifications } from '$lib/store/notifications';
    import { cart } from '$lib/store/cart';

    export let data;
    let product = data.product; // Artık direkt backend'den gelen veriyi kullanabiliriz

    console.log("Product : ", product)

    let selectedSize = product.sizes?.[0] || "M";
    let selectedColor = product.colors?.[0] || "Beyaz";
    let selectedImage = product.images?.[0] || 'https://via.placeholder.com/500';
    let quantity = 1;

    function addToCart() {
        const item = {
            ...product,
            selectedSize,
            selectedColor,
            quantity
        };
        
        cart.update(items => [...items, item]);
        notifications.add(`${product.name} sepete eklendi`);
    }

    function updateQuantity(value) {
        quantity = Math.max(1, Math.min(product.stock, quantity + value));
    }
</script>

<div class="max-w-6xl mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Sol Taraf: Ürün Görselleri -->
        <div class="space-y-4">
            <img 
                src={selectedImage || 'https://via.placeholder.com/500'} 
                alt={product.name}
                class="w-full rounded-lg shadow-lg object-cover aspect-square"
            />
            {#if product.images.length > 1}
                <div class="grid grid-cols-3 gap-2">
                    {#each product.images as image}
                        <button 
                            class="border rounded-lg p-1 hover:border-blue-500 transition-colors"
                            class:border-blue-500={selectedImage === image}
                            on:click={() => selectedImage = image}
                        >
                            <img 
                                src={image} 
                                alt="Ürün görünümü"
                                class="w-full aspect-square object-cover rounded"
                            />
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Sağ Taraf: Ürün Bilgileri -->
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-bold mb-2">{product.name}</h1>
                <p class="text-2xl text-blue-600 font-semibold">{product.price} TL</p>
                <p class="text-sm text-gray-500">Stok: {product.stock}</p>
            </div>

            <p class="text-gray-600">{product.description}</p>

            {#if product.features?.length > 0}
                <!-- Özellikler -->
                <div class="space-y-2">
                    <h3 class="font-semibold">Özellikler:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        {#each product.features as feature}
                            <li>{feature}</li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <!-- Beden Seçimi -->
            <div>
                <h3 class="font-semibold mb-2">Beden:</h3>
                <div class="flex gap-2">
                    {#each product.sizes as size}
                        <button 
                            class="px-4 py-2 border rounded hover:border-blue-500 transition-colors"
                            class:bg-blue-500={selectedSize === size}
                            class:text-white={selectedSize === size}
                            on:click={() => selectedSize = size}
                        >
                            {size}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Renk Seçimi -->
            <div>
                <h3 class="font-semibold mb-2">Renk:</h3>
                <div class="flex gap-2">
                    {#each product.colors as color}
                        <button 
                            class="px-4 py-2 border rounded hover:border-blue-500 transition-colors"
                            class:bg-blue-500={selectedColor === color}
                            class:text-white={selectedColor === color}
                            on:click={() => selectedColor = color}
                        >
                            {color}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Miktar Seçimi -->
            <div>
                <h3 class="font-semibold mb-2">Miktar:</h3>
                <div class="flex items-center gap-2">
                    <button 
                        on:click={() => updateQuantity(-1)}
                        class="px-3 py-1 border rounded hover:bg-gray-100"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span class="w-12 text-center">{quantity}</span>
                    <button 
                        on:click={() => updateQuantity(1)}
                        class="px-3 py-1 border rounded hover:bg-gray-100"
                        disabled={quantity >= product.stock}
                    >
                        +
                    </button>
                </div>
            </div>

            <!-- Sepete Ekle Butonu -->
            <button 
                on:click={addToCart}
                disabled={product.stock === 0}
                class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
            </button>
        </div>
    </div>
</div>