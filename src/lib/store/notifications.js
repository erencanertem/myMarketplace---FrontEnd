import { writable } from 'svelte/store';

function createNotificationStore() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        add: (message, type = 'success') => {
            const id = Math.random().toString(36).slice(2);
            update(notifications => [
                ...notifications,
                { id, message, type, timeout: 3000 }
            ]);

            // 3 saniye sonra bildirimi kaldır
            setTimeout(() => {
                update(notifications => 
                    notifications.filter(notification => notification.id !== id)
                );
            }, 3000);
        }
    };
}

export const notifications = createNotificationStore();