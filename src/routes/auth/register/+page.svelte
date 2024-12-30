<script>
    import { auth } from '$lib/store/auth';
    import { notifications } from '$lib/store/notifications';
    import { goto } from '$app/navigation';

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let loading = false;

    async function handleRegister() {
        if (password !== confirmPassword) {
            notifications.add('Şifreler eşleşmiyor', 'error');
            return;
        }

        loading = true;
        try {
            await auth.register(name, email, password);
            notifications.add('Başarıyla kayıt oldunuz', 'success');
            goto('/');
        } catch (error) {
            notifications.add(error.message || 'Kayıt olurken hata oluştu', 'error');
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Kayıt Ol</h1>
    
    <form on:submit|preventDefault={handleRegister} class="space-y-4">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">E-posta</label>
            <input
                type="email"
                id="email"
                bind:value={email}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input
                type="password"
                id="confirmPassword"
                bind:value={confirmPassword}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
        </button>
    </form>

    <div class="mt-4 text-center">
        <a href="/auth/login" class="text-blue-500 hover:text-blue-600">Zaten hesabınız var mı? Giriş yapın</a>
    </div>
</div>