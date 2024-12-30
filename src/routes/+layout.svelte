<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import { auth } from '$lib/store/auth';
    import '../app.css';


    onMount(() => {
        auth.initialize();
    });
</script>

<div class="min-h-screen flex flex-col">
    <Toast />
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
        <slot />
    </main>
    <Footer />
</div>