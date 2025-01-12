import { writable, type Writable } from 'svelte/store';

const language: Writable<'en' | 'ja'> = writable('en');

export { language };
