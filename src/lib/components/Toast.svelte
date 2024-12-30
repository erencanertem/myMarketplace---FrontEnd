<script>
    import { notifications } from '$lib/store/notifications';
    import { fly } from 'svelte/transition';
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
    {#each $notifications as notification (notification.id)}
        <div
            transition:fly={{ x: 200, duration: 300 }}
            class="min-w-[200px] p-4 rounded-lg shadow-lg text-white"
            class:bg-green-500={notification.type === 'success'}
            class:bg-red-500={notification.type === 'error'}
            class:bg-blue-500={notification.type === 'info'}
        >
            {notification.message}
        </div>
    {/each}
</div>