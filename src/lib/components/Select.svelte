<script lang="ts">
	import SelectIcon from '$lib/components/SelectIcon.svelte';
	import { Color, themeColor } from '$lib/utils/theme';
	import { fly } from 'svelte/transition';
</script>

<div
	in:fly={{y: -20, opacity: 0, duration: 300}}
	out:fly={{y: -20, opacity: 0, duration: 300}}
	class="w-full h-full flex flex-col gap-10 justify-center items-center {Color($themeColor,'text','800')}"
>
	<div>
		<p>Select the Level</p>
	</div>
	<div class="grid grid-cols-2 gap-5">
		<div class="">
			<SelectIcon icon="lucide:baby" title="Easy" />
		</div>
		<div>
			<SelectIcon icon="lucide:smile" title="Normal" />
		</div>
		<div>
			<SelectIcon icon="lucide:zap" title="Hard" />
		</div>
		<div>
			<SelectIcon icon="lucide:sparkles" title="Master" />
		</div>
	</div>
</div>