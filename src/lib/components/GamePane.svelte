<script lang="ts">
	import { getSudoku } from 'sudoku-gen';
    import { now } from 'lodash-es';
    import { level, stage } from '$lib/utils/stage';
    import { Color, theme, themeColor } from '$lib/utils/theme';
    import { sudokuStore, type Sudoku, setDefault } from '$lib/utils/sudoku';
    import Icon from '@iconify/svelte';
    import ButtonUnder from './ButtonUnder.svelte';
    import ChangeIcon from './ChangeIcon.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { Confetti } from 'svelte-confetti';
    import { fade } from 'svelte/transition';

    const levelMapping: Record<string, "easy" | "medium" | "hard" | "expert"> = {
        'Easy': 'easy',
        'Normal': 'medium',
        'Hard': 'hard',
        'Master': 'expert'
    };

    const type: "easy" | "medium" | "hard" | "expert" = levelMapping[$level] || 'expert';

    const sudokuData = getSudoku(type);

    $sudokuStore.sudoku = sudokuData.puzzle.split('').map((number) => ({
        number: number === '-' ? '' : number,
        display: number !== '-',
        memos: []
    }));

    $sudokuStore.solution = sudokuData.solution.split('').map((number) => ({ number }));

    $: ({ sudoku, solution: answer, selected, isMemo } = $sudokuStore);

	type Completed = {
		type: 'row' | 'col' | 'block' | 'all';
		index: number;
		correct: boolean;
		done: boolean;
	}

    let time = ['00', '00', '00'];
    let interval: any;
    let isStopped = false;
    let stopTime = 0;
    let completed:
		| Completed[]
		| null = null;
    let keepMode = false;
    let selectedNumber = '';

    $: if ($sudokuStore.time) {
        const diff = Math.floor((new Date(now()).getTime() - $sudokuStore.time.start.getTime()) / 1000) - stopTime;
        if (completed && completed.some((c) => c.type === 'all' && c.correct)) {
            clearInterval(interval);
            $sudokuStore.time.score = diff;
        } else {
            time = [
                Math.floor(diff / 3600).toString().padStart(2, '0'),
                Math.floor((diff % 3600) / 60).toString().padStart(2, '0'),
                Math.floor(diff % 60).toString().padStart(2, '0')
            ];
        }
    }

    onMount(() => {
        setDefault();
        $sudokuStore.missing = 0;
        $sudokuStore.time = { start: new Date(now()), score: 0 };
        interval = setInterval(() => {
            sudokuStore.update((store) => {
                if (store.time) {
                    if (isStopped) {
                        stopTime++;
                    } else {
                        store.time.score = (new Date().getTime() - store.time.start.getTime()) / 1000 - stopTime;
                    }
                }
                return store;
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const getIndex = (row: number, col: number) => row * 9 + col;
    const getCell = (row: number, col: number) => sudoku[getIndex(row, col)];
    const getNum = (map: { number: string }[], row: number, col: number) => map[getIndex(row, col)].number;

    const bg = (selected: [number, number], row: number, col: number): string => {
        const [selRow, selCol] = selected;
        const getBlock = (n: number) => Math.floor(n / 3);

        if (selRow === row && selCol === col) return Color($themeColor, 'bg', '300/80');
        if (getNum(sudoku, selRow, selCol) === getNum(sudoku, row, col) && getNum(sudoku, row, col) !== '')
            return Color($themeColor, 'bg', '200');
        if (selRow === row || selCol === col || (getBlock(selRow) === getBlock(row) && getBlock(selCol) === getBlock(col)))
            return Color($themeColor, 'bg', '200/50');
        return Color($themeColor, 'bg', '50');
    };

    const isCorrect = (num: string, row: number, col: number): boolean => num === getNum(answer, row, col) && getNum(sudoku, row, col) !== '';

    const isRowCorrect = (row: number): boolean => Array.from({ length: 9 }, (_, i) => getNum(sudoku, row, i)).every((num, i) => num === getNum(answer, row, i));

    const isColCorrect = (col: number): boolean => Array.from({ length: 9 }, (_, i) => getNum(sudoku, i, col)).every((num, i) => num === getNum(answer, i, col));

    const isBlockCorrect = (blockRow: number, blockCol: number): boolean =>
        Array.from({ length: 9 }, (_, i) => getNum(sudoku, blockRow + Math.floor(i / 3), blockCol + (i % 3)))
            .every((num, i) => num === getNum(answer, blockRow + Math.floor(i / 3), blockCol + (i % 3)));

	const isCompleted = (type: 'row' | 'col' | 'block', index: number): boolean => completed?.some((c) => c.type === type && c.index === index && c.correct) || false;
    const DorL = () => $theme === 'light' ? 'highlight' : 'lowlight';

    const checkCompletion = () => {
        const isRowComplete = (row: number) => $sudokuStore.sudoku.slice(row * 9, row * 9 + 9).every((cell) => cell.number !== '');
        const isColComplete = (col: number) => Array.from({ length: 9 }, (_, i) => $sudokuStore.sudoku[getIndex(i, col)]).every((cell) => cell.number !== '');
        const isBlockComplete = (blockRow: number, blockCol: number) => Array.from({ length: 9 }, (_, i) => $sudokuStore.sudoku[getIndex(blockRow + Math.floor(i / 3), blockCol + (i % 3))]).every((cell) => cell.number !== '');

        const completedTypes: Completed[] = [];

        for (let i = 0; i < 9; i++) {
            if (isRowComplete(i) && isRowCorrect(i)) {
                const existing = completed?.find((c) => c.type === 'row' && c.index === i);
                completedTypes.push({ type: 'row', index: i, done: existing ? existing.done : false, correct: true });
            }
            if (isColComplete(i) && isColCorrect(i)) {
                const existing = completed?.find((c) => c.type === 'col' && c.index === i);
                completedTypes.push({ type: 'col', index: i, done: existing ? existing.done : false, correct: true });
            }
        }

        for (let blockRow = 0; blockRow < 3; blockRow++) {
            for (let blockCol = 0; blockCol < 3; blockCol++) {
                if (isBlockComplete(blockRow * 3, blockCol * 3) && isBlockCorrect(blockRow * 3, blockCol * 3)) {
                    const existing = completed?.find((c) => c.type === 'block' && c.index === blockRow * 3 + blockCol);
                    completedTypes.push({ type: 'block', index: blockRow * 3 + blockCol, done: existing ? existing.done : false, correct: true });
                }
            }
        }

		completed = completedTypes.length === 27 ? [{ type: 'all', index: 0, done: false, correct: true }] : completedTypes;
    };

    const handleAnimationEnd = (event: Event) => {
        const target = event.target as HTMLElement;
        target.classList.remove('highlight', 'lowlight');
        const index = parseInt(target.dataset.index as string);
        completed = completed?.map((c) => (c.index === index ? { ...c, done: true } : c)) || [];
    };

    const handleCellClick = (row: number, col: number) => {
        if (keepMode && selectedNumber) {
            if (getCell(row, col).display || isNumberFullyUsed($sudokuStore.sudoku, selectedNumber)) return;
            const isSame = getCell(row, col).number === selectedNumber;
            if ($sudokuStore.isMemo) {
                updateMemo(row, col, isSame ? '' : selectedNumber);
            } else {
                updateCell(row, col, isSame ? '' : selectedNumber);
            }
        } else {
            $sudokuStore.selected = [row, col];
        }
    };

    const isNumberFullyUsed = (sudoku: Sudoku[], num: string): boolean => {
        const countInSudoku = sudoku.filter((cell, index) => cell.number === num && cell.number === $sudokuStore.solution[index].number).length;
        return countInSudoku === 9;
    };

    const updateCell = (row: number, col: number, value: string) => {
        const index = getIndex(row, col);
        if (getCell(row, col).display) return;
        sudokuStore.update((store) => {
            const save = store.sudoku[index].number;
            store.sudoku[index].number = value;
            if (value !== getNum(answer, row, col)) {
                if (value !== '' && value !== save) store.missing++;
            } else {
                store.sudoku[index].memos = [];
                store.sudoku[index].display = true;

                const blockRow = Math.floor(row / 3) * 3;
                const blockCol = Math.floor(col / 3) * 3;

                for (let i = 0; i < 9; i++) {
                    const rowIndex = getIndex(row, i);
                    store.sudoku[rowIndex].memos = store.sudoku[rowIndex].memos.filter((memo) => memo !== value);

                    const colIndex = getIndex(i, col);
                    store.sudoku[colIndex].memos = store.sudoku[colIndex].memos.filter((memo) => memo !== value);

                    const blockIndex = getIndex(blockRow + Math.floor(i / 3), blockCol + (i % 3));
                    store.sudoku[blockIndex].memos = store.sudoku[blockIndex].memos.filter((memo) => memo !== value);
                }

                if (isNumberFullyUsed(store.sudoku, value)) selectedNumber = '';

                checkCompletion();
            }
            return store;
        });
    };

    const updateMemo = (row: number, col: number, value: string) => {
        const index = getIndex(row, col);
        sudokuStore.update((store) => {
            const currentMemos = store.sudoku[index].memos;
            store.sudoku[index].memos = currentMemos.includes(value) ? currentMemos.filter((memo) => memo !== value) : [...currentMemos, value];
            return store;
        });
    };

    const commonButtonClass = `
        flex justify-center items-center p-2 border border-gray-200 rounded-md
        ${Color($themeColor, 'text', '800')}
    `;
</script>

{#if completed && completed.some((c) => c.type === 'all' && c.correct)}
	<div
		class="w-screen h-screen m-10 mt-28 z-50 fixed top-0 left-0 pointer-events-none flex flex-row justify-between items-center"
	>
		<Confetti
			x={[-0.5, 1.5]}
			y={[-0.5, 1.5]}
			amount={80}
			colorArray={['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']}
		/>
		<Confetti
			x={[-1.5, 0.5]}
			y={[-0.5, 1.5]}
			amount={80}
			colorArray={['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']}
		/>
	</div>
	<div
		class="
			w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm
			{Color($themeColor, 'bg', '900/20')}
			{Color($themeColor, 'text', '800')}
		"
	>
		<div
			class="
				w-[250px] h-[300px] flex flex-col gap-6 justify-center items-center rounded-xl shadow-xl
				{Color($themeColor, 'bg', '50')}
				{Color($themeColor, 'shadow', '400/40')}
			"
		>
			<p class="font-bold border px-4 py-1 rounded-md {Color($themeColor, 'border', '800')}">
				Result
			</p>
			<p>Time: {time[0]}:{time[1]}:{time[2]}</p>
			<p>Missed: {$sudokuStore.missing}</p>
			<div>
				<ButtonUnder icon="play" text="Back to Home" on:click={() => stage.set('select')} />
			</div>
		</div>
	</div>
{/if}

<div
	class="
		w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm z-40 transition-opacity
		{Color($themeColor, 'bg', '400/50')}
		{isStopped ? 'opacity-100' : 'opacity-0 pointer-events-none'}
	"
/>

<div
	class="
		fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-lg shadow-2xl z-50 flex flex-col gap-5 justify-center items-center transition-opacity
		{isStopped ? 'opacity-100' : 'opacity-0 pointer-events-none'}
		{Color($themeColor, 'bg', '100')}
		{Color($themeColor, 'text', '800')}
		{Color($themeColor, 'shadow', '800/20')}
	"
>
	<div class="flex flex-row gap-1">
		<Icon icon="lucide:timer" class="w-6 h-6" />
		: {time[0]}:{time[1]}:{time[2]}
	</div>
	<ButtonUnder icon="play" text="Restart" on:click={() => (isStopped = !isStopped)} />
</div>

<div transition:fade={{ duration: 300 }} class="w-full h-full flex justify-center">
	<div class="flex flex-col justify-center items-center">
		<div class="flex flex-row gap-5 pb-4 {Color($themeColor, 'text', '800')}">
			<div class="flex flex-row gap-1">
				<Icon icon="lucide:x" class="w-6 h-6" />
				<p>: {$sudokuStore.missing}</p>
			</div>
			<div>
				<button class="flex flex-row gap-1" on:click={() => (isStopped = !isStopped)}>
					<Icon icon="lucide:timer" class="w-6 h-6" />
					: {time[0]}:{time[1]}:{time[2]}
				</button>
			</div>
		</div>
		<div
			class="
				w-fit h-fit grid gap-0 mb-10 grid-cols-3 overflow-hidden border-2
				{Color($themeColor, 'border', '300')}
				{completed && completed.some((c) => !c.done && c.type === 'all') ? DorL() : ''}
			"
		>
			{#each Array(3) as _, boxRow}
				{#each Array(3) as _, boxCol}
					<div
						class="
							w-fit h-fit grid grid-cols-3 grid-rows-3 overflow-hidden border-2
							{Color($themeColor, 'border', '300')}
							{isCompleted('block', boxRow * 3 + boxCol) ? DorL() : ''}
						"
						on:animationend={handleAnimationEnd}
						data-index={boxRow * 3 + boxCol}
					>
						{#each Array(3) as _, cellRow}
							{#each Array(3) as _, cellCol}
								{@const row = boxRow * 3 + cellRow}
								{@const col = boxCol * 3 + cellCol}
								{@const index = getIndex(row, col)}
								{@const cell = getCell(row, col)}
								<button
									class="
										flex justify-center items-center p-0.5 overflow-hidden border
										{isCorrect(cell.number, row, col)
										? Color($themeColor, 'text', '800')
										: Color('red', 'text', '400', true)}
										{Color($themeColor, 'border', '300')}
										{bg(selected, row, col)}
										{isCompleted('row', row) || isCompleted('col', col) ? DorL() : ''}
										"
									style={`width: ${$sudokuStore.displaySize}px; height: ${$sudokuStore.displaySize}px;`}
									on:click={() => handleCellClick(row, col)}
									on:animationend={handleAnimationEnd}
									data-index={boxRow * 3 + boxCol}
								>
									{#if $sudokuStore.sudoku[index].number === ''}
										<div class="w-full h-full grid grid-rows-3 grid-cols-3">
											{#each Array(9) as _, i}
												<div
													class="
														flex justify-center items-center text-xs
														{Color($themeColor,'text','700')}
													"
												>
													<span
														class="
															transition-opacity
															{$sudokuStore.sudoku[index].memos.includes((i + 1).toString())
															? getCell(selected[0], selected[1]).number === (i + 1).toString()
																? 'opacity-100'
																: 'opacity-50'
															: 'opacity-0'}
														"
													>
														{i + 1}
													</span>
												</div>
											{/each}
										</div>
									{:else}
										<p>{$sudokuStore.sudoku[index].number}</p>
									{/if}
								</button>
							{/each}
						{/each}
					</div>
				{/each}
			{/each}
		</div>
		<div class="flex flex-col gap-5 items-center">
			<div class="flex gap-1">
				{#each Array(9) as _, i}
					{@const number = (i + 1).toString()}
					<button
						class="
							transition-[opacity,border]
							{commonButtonClass}
							{isNumberFullyUsed($sudokuStore.sudoku, number) ? 'opacity-50 cursor-not-allowed' : ''}
							{keepMode && selectedNumber === number ? 'border-4' : ''}
						"
						disabled={isNumberFullyUsed($sudokuStore.sudoku, number)}
						style="width: {$sudokuStore.displaySize}px; height: {$sudokuStore.displaySize}px;"
						on:click={() => {
							const [row, col] = selected;
							if (keepMode) {
								selectedNumber = selectedNumber === number ? '' : number;
							} else {
								if (isMemo) {
									updateMemo(row, col, number);
								} else {
									updateCell(row, col, number);
								}
							}
						}}
					>
						{number}
					</button>
				{/each}
			</div>
			<div class="flex gap-1">
				<ChangeIcon icons={["pencil","clipboard-pen"]} bind:is={$sudokuStore.isMemo} />
				<button
					class={commonButtonClass}
					style="width: {$sudokuStore.displaySize}px; height: {$sudokuStore.displaySize}px;"
					on:click={() => {
						const [row, col] = selected;
						if ($sudokuStore.isMemo) {
							updateMemo(row, col, '');
						} else if (!getCell(row, col).display) {
							updateCell(row, col, '');
						}
					}}
				>
					<Icon icon="lucide:delete" class="w-6 h-6" />
				</button>
				<ChangeIcon icons={["lock-open","lock"]} bind:is={keepMode} />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@keyframes highlight {
		0% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(0.9);
		}
		100% {
			filter: brightness(1);
		}
	}

	@keyframes lowlight {
		0% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(1.5);
		}
		100% {
			filter: brightness(1);
		}
	}

	.highlight {
		animation: highlight 1s ease-in-out;
	}

	.lowlight {
		animation: lowlight 1s ease-in-out;
	}
</style>
