<script lang="ts">
	import { Color, themeColor } from '$lib/utils/theme';
	import { game, stage } from '$lib/utils/stage';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	const buttons: { icon: string, title: 'Sudoku' | 'Killer' }[] = [
		{
			icon: 'lucide:grid-3x3',
			title: 'Sudoku'
		},
		{
			icon: 'lucide:bomb',
			title: 'Killer'
		}
	];
</script>

<div
	in:fly={{y: -20, opacity: 0, duration: 300}}
	out:fly={{y: -20, opacity: 0, duration: 300}}
	class="w-full h-full flex flex-col gap-10 justify-center items-center {Color($themeColor,'text','800')}"
>
	<p>Select the Game Type</p>
	<div class="grid grid-cols-2 gap-5">
		{#each buttons as { icon, title }}
			<button
				class="
					w-[125px] flex flex-row justify-center items-center gap-2 p-4 rounded-xl shadow-xl hover:shadow-2xl cursor-pointer
					{Color($themeColor,'bg','300')}
					{Color($themeColor,'shadow','400/20')}
				"
				on:click={() => {
					stage.set('play');
					game.set(title);
				}}
			>
				<Icon {icon} class="w-6 h-6" />
				<button>{title}</button>
			</button>
		{/each}
	</div>
	<button
		class="
			w-[125px] flex flex-row justify-center items-center gap-2 p-4 rounded-xl shadow-xl hover:shadow-2xl cursor-pointer
			{Color($themeColor,'bg','300')}
			{Color($themeColor,'text','800')}
			{Color($themeColor,'shadow','400/20')}
		"
		on:click={() => stage.set('select')}
	>
		<Icon icon="lucide:arrow-left" class="w-6 h-6" />
		<button>Back</button>
	</button>
</div>