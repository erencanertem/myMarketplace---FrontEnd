<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  export let data;
  let products = data.products;

  console.log("Products",products)
</script>

<section class="text-center mb-12">
  <h1 class="text-4xl font-bold mb-4">Mağazama Hoş Geldiniz</h1>
  <p class="text-gray-600">En yeni ürünlerimiz</p>
</section>

<div class="container mx-auto px-4">
  {#if products.length === 0}
      <div class="text-center py-12">
          <p class="text-gray-500">Henüz ürün bulunmuyor.</p>
      </div>
  {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {#each products as product}
              <ProductCard {product} />
          {/each}
      </div>
  {/if}
</div>