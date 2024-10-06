<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Color, themeColor } from '$lib/utils/theme';
	import { stage, level, type Level } from '$lib/utils/stage';

	export let icon: string;
	export let title: Level;
</script>

<button
	class="
		w-[125px] flex flex-row justify-center items-center gap-2 p-4 rounded-xl shadow-xl hover:shadow-2xl cursor-pointer
		{Color($themeColor,'bg','300')}
		{Color($themeColor,'text','800')}
		{Color($themeColor,'shadow','400/20')}
	"
	on:click={() => {
		stage.set('gameType');
		level.set(title);
	}}
>
		<Icon {icon} class="w-6 h-6" />
		<button>{title}</button>
</button>