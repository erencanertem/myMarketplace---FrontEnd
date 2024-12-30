<script>
    import { fade, fly } from 'svelte/transition';
    import { auth } from '$lib/store/auth';
    import { notifications } from '$lib/store/notifications';

    export let isOpen = false;
    export let onClose = () => {};

    function handleLogout() {
        auth.logout();
        notifications.add('Başarıyla çıkış yaptınız', 'success');
        onClose();
    }
</script>

{#if isOpen}
    <!-- Overlay -->
    <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        on:click={onClose}
        transition:fade={{duration: 200}}
    ></div>

    <!-- Drawer -->
    <div
        class="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 overflow-y-auto"
        transition:fly={{ x: 300, duration: 300 }}
    >
        <!-- Close Button -->
        <button 
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            on:click={onClose}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="p-4 space-y-4">
            {#if $auth.isAuthenticated}
                <!-- User Info -->
                <div class="border-b pb-4">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            {$auth.user.name[0].toUpperCase()}
                        </div>
                        <div>
                            <p class="font-medium">{$auth.user.name}</p>
                            <p class="text-sm text-gray-500">{$auth.user.email}</p>
                        </div>
                    </div>
                </div>
            {/if}

            <!-- Navigation Links -->
            <nav class="space-y-2">
                <a 
                    href="/"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    on:click={onClose}
                >
                    Ana Sayfa
                </a>
                
                <a 
                    href="/products"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    on:click={onClose}
                >
                    Ürünler
                </a>
                
                <a 
                    href="/cart"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    on:click={onClose}
                >
                    Sepet
                </a>

                {#if $auth.isAuthenticated}
                    <a 
                        href="/profile"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        on:click={onClose}
                    >
                        Profilim
                    </a>
                    
                    <a 
                        href="/profile/orders"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        on:click={onClose}
                    >
                        Siparişlerim
                    </a>
                    
                    <button 
                        on:click={handleLogout}
                        class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                        Çıkış Yap
                    </button>
                {:else}
                    <a 
                        href="/auth/login"
                        class="block px-4 py-2 bg-blue-500 text-white rounded-md text-center"
                        on:click={onClose}
                    >
                        Giriş Yap
                    </a>
                {/if}
            </nav>
        </div>
    </div>
{/if}