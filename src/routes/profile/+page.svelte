<script>
    import { auth } from '$lib/store/auth';
</script>

<div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Profil</h1>
    
    {#if $auth.user}
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
            <div class="space-y-2">
                <h2 class="text-lg font-semibold">Kişisel Bilgiler</h2>
                <p><span class="font-medium">Ad Soyad:</span> {$auth.user.name}</p>
                <p><span class="font-medium">E-posta:</span> {$auth.user.email}</p>
            </div>
            
            <!-- İleride eklenecek diğer profil bölümleri -->
            <div class="space-y-2">
                <h2 class="text-lg font-semibold">Siparişlerim</h2>
                <p class="text-gray-600">Henüz sipariş bulunmuyor.</p>
            </div>
        </div>
    {/if}
</div>