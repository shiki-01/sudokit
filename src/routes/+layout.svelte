<script lang="ts">
    import '../app.css'
		import { Color, themeColor, theme, type ThemeColor } from '$lib/utils/theme';
		import Header from '$lib/components/Header.svelte';
		import { onMount } from 'svelte';
		import { display, sudokuStore } from '$lib/utils/sudoku';
		import { browser } from '$app/environment';

		$: if (typeof window !== 'undefined') display(sudokuStore);

		onMount(() => {
			if (typeof window === 'undefined') return;
			const themeL = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
			const themeColorL = window.getComputedStyle(window.document.documentElement).getPropertyValue('--theme-color').trim() as ThemeColor;
			if (themeL) theme.set(themeL);
			if (themeColorL) themeColor.set(themeColorL);
			display(sudokuStore);
			if (browser && 'serviceWorker' in navigator) {
				navigator.serviceWorker.register('/service-worker.js');
			}
		});
</script>

<svelte:head>
	<title>Sudokit</title>
	<meta name="description" content="Sudoku game" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

<svelte:window on:resize={() => display(sudokuStore)} />

<main
	class="w-[100svw] h-[100svh] overflow-hidden {Color($themeColor,'bg','50')}"
>
	<Header />
	<div class="p-5 w-full h-[calc(100svh-58px)]">
		<slot />
	</div>
</main>

<style>
	:global(*) {
			transition: background-color .3s, color, border-color .3s, fill .3s, stroke .3s, box-shadow .3s;
	}
	:global(p, h1, h2, h3, h4, h5, h6, svg) {
      transition-duration: .3s;
	}
</style>