import { writable, type Writable } from 'svelte/store';

type ThemeColor =
	| 'slate'
	| 'gray'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';
type ThemeUI = 'bg' | 'text' | 'border' | 'shadow';
type ThemeLight = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

const themeColor: Writable<ThemeColor> = writable('slate');
const theme: Writable<'dark' | 'light' | null> = writable(null);

const ThemeColors: ThemeColor[] = [
	'slate',
	'gray',
	'zinc',
	'neutral',
	'stone',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
];

const Color = (
	color	: ThemeColor,
	ui: ThemeUI,
	light: string,
	strict: boolean = false
): string => {
	let result: string = '';
	let lightness: ThemeLight;
	let darkness: ThemeLight;
	let opacity: number = 100;
	if (light.includes('/')) {
		const [color, alpha] = light.split('/');
		opacity = parseInt(alpha);
		lightness = parseInt(color) as ThemeLight;
	} else {
		lightness = parseInt(light) as ThemeLight;
	}

	darkness = 1000 - lightness;

	let property = '';

	if (typeof document !== 'undefined') {
		property = document.documentElement.style.getPropertyValue(`--theme-color`).trim() as ThemeColor;
	}

	if (property === '') {
		themeColor.subscribe((value) => {
			property = value as ThemeColor;
		});
	} else if (strict) {
		property = color;
	}

	if (!color) return result;

	if (ui === 'bg') {
		result = `bg-${property}-${lightness}${opacity !== 100 ? `/${opacity}` : ''} dark:bg-${property}-${darkness}${opacity !== 100 ? `/${opacity}` : ''}`;
	} else if (ui === 'text') {
		result = `text-${property}-${lightness}${opacity !== 100 ? `/${opacity}` : ''} dark:text-${property}-${darkness}${opacity !== 100 ? `/${opacity}` : ''}`;
	} else if (ui === 'border') {
		result = `border-${property}-${lightness}${opacity !== 100 ? `/${opacity}` : ''} dark:border-${property}-${darkness}${opacity !== 100 ? `/${opacity}` : ''}`;
	} else if (ui === 'shadow') {
		result = `shadow-${property}-${lightness}${opacity !== 100 ? `/${opacity}` : ''} dark:shadow-${property}-${darkness}${opacity !== 100 ? `/${opacity}` : ''}`;
	} else {
		result = '';
	}

	return result.toString();
};

export { themeColor, theme, Color, type ThemeColor, ThemeColors };
