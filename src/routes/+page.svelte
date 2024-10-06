<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import GameType from '$lib/components/GameType.svelte';
	import Pane from '$lib/components/Pane.svelte';
	import { stage } from '$lib/utils/stage';
</script>

{#if $stage === 'select'}
	<Select />
{:else if $stage === 'gameType'}
	<GameType />
{:else}
	<Pane />
{/if}