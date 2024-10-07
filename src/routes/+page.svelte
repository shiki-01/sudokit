<script lang="ts">
	import Selector from '$lib/components/Selector.svelte';
	import GamePane from '$lib/components/GamePane.svelte';
	import { stage } from '$lib/utils/stage';
</script>
    
{#if $stage === 'select'}
    <Selector type={'level'} />
{:else if $stage === 'gameType'}
	<Selector type={'game'} />
{:else}
	<GamePane />
{/if}