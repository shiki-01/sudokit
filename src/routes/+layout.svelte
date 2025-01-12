<script lang="ts">
	import '../app.css';
	import { Color, themeColor, theme, type ThemeColor } from '$lib/utils/theme';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { display, sudokuStore } from '$lib/utils/sudoku';
	import { browser } from '$app/environment';
	import { language } from '$lib';
	import { writable } from 'svelte/store';
	import { beforeNavigate } from '$app/navigation';

	const initialized = writable(false);

	$: if (typeof window !== 'undefined') display(sudokuStore);

	const initializeApp = () => {
		if (typeof window === 'undefined') return;

		const themeL = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
		const themeColorL = window
			.getComputedStyle(window.document.documentElement)
			.getPropertyValue('--theme-color')
			.trim() as ThemeColor;

		if (themeL) theme.set(themeL);
		if (themeColorL) themeColor.set(themeColorL);

		const lang = localStorage.getItem('lang');
		if (lang === 'ja' || lang === 'en') {
			language.set(lang);
		} else {
			language.set('en');
			localStorage.setItem('lang', 'en');
		}
		const html = window.document.documentElement;
		if (html) {
			html.lang = $language;
		}

		display(sudokuStore);
	};

	const initialize = () => {
		if ($initialized) return;
		initializeApp();
		initialized.set(true);
	};

	onMount(() => {
		if (!browser) return;
		initialize();
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js', {
				type: 'module'
			});
		}
	});

	beforeNavigate(() => {
		initialized.set(false);
	});
</script>

<svelte:head>
	<title>Sudokit</title>
	<meta name="description" content="Sudoku game" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

<svelte:window on:resize={() => display(sudokuStore)} />

<main class="w-[100svw] h-[100svh] overflow-hidden {Color($themeColor, 'bg', '50')}">
	<Header />
	<div class="p-5 w-full h-[calc(100svh-58px)]">
		<slot />
	</div>
</main>

<style>
	:global(*) {
		transition:
			background-color 0.3s,
			color,
			border-color 0.3s,
			fill 0.3s,
			stroke 0.3s,
			box-shadow 0.3s;
	}
	:global(p, h1, h2, h3, h4, h5, h6, svg) {
		transition-duration: 0.3s;
	}
</style>
