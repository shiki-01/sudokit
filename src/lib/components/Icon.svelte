<script lang="ts">
    import Icon from '@iconify/svelte';
    import { Color, themeColor } from '$lib/utils/theme'

    export let icon: string;
    export let title: string;
</script>

<button
    class="
        w-[125px] flex flex-row justify-center items-center gap-2 p-4 rounded-xl shadow-xl hover:shadow-2xl cursor-pointer
        {Color($themeColor,'bg','300')}
        {Color($themeColor,'text','800')}
        {Color($themeColor,'shadow','400/20')}
    "
    on:click
>
    <Icon icon="lucide:{icon}" class="w-6 h-6" />
    <button>{title}</button>
</button>