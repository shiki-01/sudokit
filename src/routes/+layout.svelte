<script lang="ts">
    import '../app.css'
		import { Color, themeColor, theme, type ThemeColor } from '$lib/utils/theme';
		import Header from '$lib/components/Header.svelte';
		import { onMount } from 'svelte';
		import { display, sudokuStore } from '$lib/utils/sudoku';

		$: if (typeof window !== 'undefined') display(sudokuStore);

		onMount(() => {
			const themeL = localStorage.getItem('theme') as 'light' | 'dark';
			const themeColorL = localStorage.getItem('themeColor') as ThemeColor;
			if (themeL) theme.set(themeL);
			if (themeColorL) themeColor.set(themeColorL);
			display(sudokuStore);
		});
</script>

<svelte:window on:resize={() => display(sudokuStore)} />

<main
	class="w-screen h-screen overflow-hidden {Color($themeColor,'bg','50')}"
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