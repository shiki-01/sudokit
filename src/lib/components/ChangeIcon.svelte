<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Color, themeColor } from '$lib/utils/theme';
	import { sudokuStore } from '$lib/utils/sudoku';

	export let icons: [string, string];
	export let is: boolean;
</script>

<button
	class="
        flex justify-center items-center p-2 border border-gray-200 rounded-md relative
        {Color($themeColor,'text','800')}
    "
	style="width: {$sudokuStore.displaySize}px; height: {$sudokuStore.displaySize}px;"
	on:click={() => (is = !is)}
>
	{#each icons as icon, i}
		<Icon
			icon="lucide:{icon}"
			class="w-4 h-4 md:w-6 md:h-6 transition-[opacity,transform] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                {is === (i === 0)
				? 'opacity-0 rotate-180 scale-0'
				: 'opacity-100 rotate-0 scale-100'}"
		/>
	{/each}
</button>
