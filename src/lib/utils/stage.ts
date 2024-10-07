import { type Writable, writable } from 'svelte/store';

const stages = [
	'select',
	'gameType',
	'play',
	'end',
]

type Stage = typeof stages[number];
type Level = 'Easy' | 'Normal' | 'Hard' | 'Master';
type Game = 'Sudoku' | 'Killer';

const stage: Writable<Stage> = writable('select');
const level: Writable<Level> = writable('Normal');
const game: Writable<Game> = writable('Sudoku');

export { type Stage, stage, type Level, level, type Game, game, stages };
