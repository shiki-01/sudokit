<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Color, themeColor } from '$lib/utils/theme';

    export let icon: string;
	export let text: string;
</script>

<button
	class="flex flex-row gap-2 p-4 pb-3 border-b-2 {Color($themeColor, 'border', '300')}"
	on:click
>
	<Icon icon="lucide:{icon}" class="w-6 h-6" />
	<button>{text}</button>
</button>
