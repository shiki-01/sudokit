<script lang="ts">
    import Icon from './Icon.svelte';
    import { Color, themeColor } from '$lib/utils/theme';
    import { stage, level, type Level, game, type Game } from '$lib/utils/stage'
    import { fly } from 'svelte/transition';

    export let type: 'level' | 'game';

    type Button<T> = {
        icon: string;
        title: T;
    }

    const buttons: { level: Button<Level>[], game: Button<Game>[] } = {
        level: [
            { icon: 'baby', title: 'Easy' },
            { icon: 'smile', title: 'Normal' },
            { icon: 'zap', title: 'Hard' },
            { icon: 'sparkles', title: 'Master' }
        ],
        game: [
            { icon: 'grid-3x3', title: 'Sudoku' },
            { icon: 'bomb', title: 'Killer' }
        ]
    }
</script>

<div
    transition:fly={{ y: -20, opacity: 0, duration: 300 }}
    class="
        w-full h-full flex flex-col gap-10 justify-center items-center
        {Color($themeColor,'text','800')}
    "
>
    <p>
        Select the {type ==  'level' ? 'Level' : 'Game Type'}
    </p>
    <div class="grid grid-cols-2 gap-5">
        {#each buttons[type] as { icon, title }}
            <Icon
                {icon}
                {title}
                on:click={() => {
                    if (title == 'Sudoku' || title == 'Killer') {
                        game.set(title)
                        stage.set('play')
                    } else {
                        level.set(title)
                        stage.set('gameType')
                    }
                }}
            />
        {/each}
    </div>
    {#if type == 'game'}
        <Icon
            icon="arrow-left"
            title="Back"
            on:click={() => stage.set('select')}
        />
    {/if}
</div>