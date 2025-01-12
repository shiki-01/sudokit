<script lang="ts">
	import Icon from '@iconify/svelte';
	import src from '$lib/img/icon.svg';
	import Rule from '$lib/components/Rule.svelte';
	import { Color, theme, themeColor, type ThemeColor, ThemeColors } from '$lib/utils/theme';
	import { stage } from '$lib/utils/stage';
	import { setDefault } from '$lib/utils/sudoku';
	import { language } from '$lib';
	import { onMount } from 'svelte';

	let isOpen = false;
	let isRuleOpen = false;
	let select: HTMLSelectElement;

	$: if (select && $language) {
		select.value = $language;
	}

	onMount(() => {
		if (select && $language) {
			select.value = $language;
		}
	});

	const icons = [
		{ icon: 'sun-dim', title: 'Light' },
		{ icon: 'moon', title: 'Dark' }
	];

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

	const onLangChange = () => {
		if (typeof select === 'undefined') return;
		const selectedLang = select.value;
		if (selectedLang === 'en' || selectedLang === 'ja') {
			language.set(selectedLang);
			localStorage.setItem('lang', selectedLang);
		}
		const html = window.document.documentElement;
		if (html) {
			html.lang = $language;
		}
	};
</script>

<header class="w-full h-[58px] p-2 flex justify-between {Color($themeColor, 'text', '800')}">
	<button
		class="w-fit flex flex-row gap-2"
		on:click={() => {
			stage.set('select');
			setDefault();
		}}
	>
		<img {src} alt="logo" class="w-[42px] h-[42px]" />
		<span class="w-full h-full flex items-center text-lg">Sudokit</span>
	</button>
	<div class="flex items-center pr-1">
		<button class="" on:click={() => (isOpen = !isOpen)}>
			<Icon icon="lucide:settings" class="w-6 h-6" />
		</button>
	</div>
</header>

<button
	class="
		fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 transition-opacity duration-300
		{Color($themeColor, 'bg', '400/20')}
		{isOpen || isRuleOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
	"
	on:click={() => {
		isOpen = !isOpen;
		isRuleOpen = false;
	}}
/>

<div class="fixed z-20 {isRuleOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
	<Rule />
</div>

<div
	class="
		w-[300px] h-screen fixed top-0 shadow-xl z-20 transition-[right] duration-300 p-5
		{Color($themeColor, 'bg', '50')}
		{Color($themeColor, 'text', '800')}
		{Color($themeColor, 'shadow', '400/20')}
		{isOpen ? 'right-0' : 'right-[-300px]'}
	"
>
	<div class="w-full flex justify-end">
		<button class="" on:click={() => (isOpen = !isOpen)}>
			<Icon icon="lucide:arrow-right" class="w-6 h-6" />
		</button>
	</div>
	<div class="space-y-2">
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">{$language === 'en' ? 'Theme' : 'テーマ'}</p>
			<div class="flex flex-row justify-between items-center">
				<button
					class="w-[100px] h-8 flex flex-col justify-center items-center overflow-hidden relative"
					on:click={() => changeTheme($theme === 'light' ? 'dark' : 'light')}
				>
					{#each icons as { icon, title }, i}
						<button
							class="
								flex flex-row items-center gap-1 absolute
								{i === 0 ? 'top-1/2 dark:top-[calc(-2rem+50%)]' : 'top-[calc(2rem+50%)] dark:top-1/2'}
								left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-300
							"
						>
							<Icon icon={'lucide:' + icon} class="w-6 h-6" />
							<button class="text-lg text-nowrap">
								{title === 'Light'
									? $language === 'en'
										? 'Light'
										: 'ライト'
									: $language === 'en'
										? 'Dark'
										: 'ダーク'}
							</button>
						</button>
					{/each}
				</button>
				<button
					class="w-[50px] h-full rounded-full flex {Color($themeColor, 'bg', '300')}"
					on:click={() => changeTheme($theme === 'light' ? 'dark' : 'light')}
				>
					<span
						class="
							w-7 h-7 rounded-full p-1 transition-[transform] duration-300 relative
							{Color($themeColor, 'bg', '500')} {Color($themeColor, 'text', '50')}
						"
						style="transform: translateX({$theme === 'light' ? '0' : '100'}%);"
					>
						{#each icons as { icon }, i}
							<Icon
								icon={'lucide:' + icon}
								class="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {i === 0
									? 'rotate-0 dark:rotate-180 scale-100 dark:scale-0 '
									: 'rotate-180 dark:rotate-0 scale-0 dark:scale-100'} transition-[transform,scale]"
							/>
						{/each}
					</span>
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">{$language === 'en' ? 'Color' : 'カラー'}</p>
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
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">{$language === 'en' ? 'Language' : '言語'}</p>
			<div class="w-full px-4 py-2">
				<select
					bind:this={select}
					bind:value={$language}
					on:change={onLangChange}
					class="w-full rounded-lg px-2 py-2 focus:outline-none border-2 {Color(
						$themeColor,
						'border',
						'600'
					)} {Color($themeColor, 'bg', '50')}"
				>
					<option value="en">English</option>
					<option value="ja">日本語</option>
				</select>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">{$language === 'en' ? 'Rule' : 'ルール'}</p>
			<div class="px-4">
				<button
					class="w-full py-2 rounded-lg flex justify-center items-center border-2 {Color(
						$themeColor,
						'border',
						'600'
					)}"
					on:click={() => {
						isRuleOpen = true;
						isOpen = false;
					}}
				>
					<span class="text-lg">{$language === 'en' ? 'How to play' : '遊び方を見る'}</span>
				</button>
			</div>
		</div>
	</div>
</div>
