<script>
    import ProductCard from '$lib/components/ProductCard.svelte';
  
    let products = [
      {
        id: 1,
        name: "Ürün 1",
        price: 199.99,
        image: "https://picsum.photos/200/300",
      },
      // Diğer ürünler...
    ];
  </script>
  
  <h1 class="text-3xl font-bold mb-8">Tüm Ürünler</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each products as product}
      <ProductCard {product} />
    {/each}
  </div>