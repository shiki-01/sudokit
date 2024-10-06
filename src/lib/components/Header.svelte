<script lang="ts">
	import Icon from '@iconify/svelte';
	import src from '$lib/img/icon.svg';
	import { Color, theme, themeColor, type ThemeColor, ThemeColors } from '$lib/utils/theme';
	import { stage } from '$lib/utils/stage';
	import { setDefault } from '$lib/utils/sudoku';

	let isOpen = false;

	const changeTheme = (theme: 'light' | 'dark') => {
		if (typeof window === 'undefined') return;
		$theme = theme;
		localStorage.setItem('theme', theme);
		window.document.documentElement.classList.remove('light', 'dark');
		window.document.documentElement.classList.add(theme);
	};

	const changeThemeColor = (color: ThemeColor) => {
		if (typeof window === 'undefined') return;
		$themeColor = color;
		localStorage.setItem('themeColor', color);
		window.document.documentElement.style.setProperty('--theme-color', `${color}`);
	};
</script>

<header class="w-full h-[58px] p-2 flex justify-between {Color($themeColor,'text','800')}">
	<button
		class="w-fit flex flex-row gap-2"
		on:click={() => {
			stage.set('select');
			setDefault()
		}}
	>
		<img {src} alt="logo" class="w-[42px] h-[42px]" />
		<button class="w-full h-full flex items-center text-lg">Sudokit</button>
	</button>
	<div class="flex items-center pr-1">
		<button class="" on:click={() => isOpen = !isOpen}>
			<Icon icon="lucide:settings" class="w-6 h-6" />
		</button>
	</div>
</header>

<button
	class="
		fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 transition-opacity duration-300
		{Color($themeColor,'bg','800/20')}
		{isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
	"
	on:click={() => isOpen = !isOpen}
/>

<div
	class="
		w-[300px] h-screen fixed top-0 shadow-xl z-20 transition-[right] duration-300 p-5
		{Color($themeColor,'bg','50')}
		{Color($themeColor,'text','800')}
		{Color($themeColor,'shadow','400/20')}
		{isOpen ? 'right-0' : 'right-[-300px]'}
	"
>
	<div class="w-full flex justify-end">
		<button class="" on:click={() => isOpen = !isOpen}>
			<Icon icon="lucide:arrow-right" class="w-6 h-6" />
		</button>
	</div>
	<div class="space-y-2">
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">Theme</p>
			<div class="flex flex-row justify-between items-center">
				<button
					class="w-[100px] h-8 flex flex-col justify-center items-center overflow-hidden relative"
					on:click={() => changeTheme($theme === 'light' ? 'dark' : 'light')}
				>
					<button
						class="flex flex-row items-center gap-1 absolute left-[50%] transition-[top] duration-300 top-[50%] dark:top-[calc(-2rem+50%)]"
						style="transform: translate(-50%, -50%)"
					>
						<Icon icon="lucide:sun-dim" class="w-6 h-6" />
						<button class="text-lg flex">Light</button>
					</button>
					<button
						class="flex flex-row items-center gap-1 absolute left-[50%] transition-[top] top-[calc(2rem+50%)] dark:top-[50%]"
						style="transform: translate(-50%, -50%)"
					>
						<Icon icon="lucide:moon" class="w-6 h-6" />
						<button class="text-lg">Dark</button>
					</button>
				</button>
				<button
					class="w-[50px] h-full rounded-full flex {Color($themeColor,'bg','300')}"
					on:click={() => changeTheme($theme === 'light' ? 'dark' : 'light')}
				>
					<span
						class="w-7 h-7 rounded-full p-1 transition-[transform] duration-300 relative {Color($themeColor,'bg','500')} {Color($themeColor,'text','50')}"
						style="transform: translateX({$theme === 'light' ? '0' : '100'}%);"
					>
						<Icon
							icon="lucide:sun-dim"
							class="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0 dark:rotate-180 scale-100 dark:scale-0 transition-[transform,scale]"
						/>
						<Icon
							icon="lucide:moon"
							class="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 dark:rotate-0 scale-0 dark:scale-100 transition-[transform,scale]"
						/>
					</span>
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">Color</p>
			<div class="p-2 grid grid-cols-6 gap-2">
				{#each ThemeColors as color}
					<div class="flex justify-center items-center">
						<button
							class="
								w-6 h-6 rounded-full bg-{color}-400 cursor-pointer flex justify-center items-center
								{$themeColor === color ? 'ring-2 ring-white' : ''}
							"
							on:click={() => changeThemeColor(color)}
						>
							{#if $themeColor === color}
								<Icon icon="lucide:check" class="w-4 h-4" />
							{/if}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>