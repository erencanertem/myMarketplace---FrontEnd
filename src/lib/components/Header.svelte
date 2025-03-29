<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { cart } from '$lib/store/cart';
	import { auth } from '$lib/store/auth';
	import { notifications } from '$lib/store/notifications';
	import { onMount } from 'svelte';
	import MobileDrawer from './MobileDrawer.svelte';

	let isDropdownOpen = false;
	let isMobileMenuOpen = false;
	let dropdownRef;

	$: cartItemCount = $cart.items?.length || 0;

	function handleClickOutside(event) {
		if (dropdownRef && !dropdownRef.contains(event.target)) {
			isDropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleLogout() {
		auth.logout();
		notifications.add('Başarıyla çıkış yaptınız', 'success');
		isDropdownOpen = false;
	}

	console.log($auth)
</script>

<header class="bg-white shadow-md">
	<nav class="container mx-auto flex items-center justify-between px-4 py-3">
		<a href="/" class="text-xl font-bold">Benim Mağazam</a>

		<!-- Desktop Menu -->
		<div class="hidden items-center gap-6 md:flex">
			<a href="/products" class="text-gray-600 transition-colors hover:text-gray-900"> Ürünler </a>

			<a href="/cart" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
				</svg>
				<span class="relative">
					Sepet
					{#if cartItemCount > 0}
						<span class="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
							{cartItemCount}
						</span>
					{/if}
				</span>
			</a>

			{#if $auth.isAuthenticated}
				<div class="relative" bind:this={dropdownRef}>
					<button
						on:click={() => (isDropdownOpen = !isDropdownOpen)}
						class="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 focus:outline-none"
					>
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
							{$auth.user?.name?.[0]?.toUpperCase() || '?'}
						</div>
						<span>{$auth.user?.name || 'Kullanıcı'}</span>
						<svg
							class="h-4 w-4 transition-transform duration-200"
							class:rotate-180={isDropdownOpen}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#if isDropdownOpen}
						<div
							class="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg"
							transition:fade={{ duration: 100 }}
						>
							<a
								href="/profile"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								on:click={() => (isDropdownOpen = false)}
							>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									Profilim
								</div>
							</a>

							<a
								href="/profile/orders"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								on:click={() => (isDropdownOpen = false)}
							>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
									Siparişlerim
								</div>
							</a>

							<div class="my-1 border-t border-gray-100"></div>

							<button
								on:click={handleLogout}
								class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
							>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									Çıkış Yap
								</div>
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<a
					href="/auth/login"
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Giriş Yap
				</a>
			{/if}
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
			on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</nav>
</header>

<MobileDrawer isOpen={isMobileMenuOpen} onClose={() => (isMobileMenuOpen = false)} />
