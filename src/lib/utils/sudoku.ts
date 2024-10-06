import { writable, type Writable } from 'svelte/store';

type Sudoku = {
	number: string,
	display: boolean,
	memos: string[]
}

type SudokuStore = {
	sudoku: Sudoku[],
	solution: {
		number: string,
	}[],
	time: {
		start: Date,
		score: number
	} | null,
	selected: [number, number],
	isMemo: boolean,
	missing: number,
	displaySize: number
}

const defaultState: SudokuStore = {
	sudoku: [],
	solution: [],
	time: null,
	selected: [0, 0],
	isMemo: false,
	missing: 0,
	displaySize: 0
}

const sudokuStore: Writable<SudokuStore> = writable(defaultState)

const display = (store: Writable<SudokuStore>) => {
	const { innerWidth, innerHeight } = window;
	let displaySize: number = 0;
	store.subscribe((value) => displaySize = value.displaySize);
	const size = Math.min(innerWidth - 80, innerHeight - 138 - displaySize * 2 - 20 - 40 - 40);
	store.update((value) => {
		value.displaySize = size > 600 ? 50 : size / 9;
		return value;
	});
};

const setDefault = () => {
	sudokuStore.set(defaultState);
}

export { type Sudoku, sudokuStore, display, setDefault }