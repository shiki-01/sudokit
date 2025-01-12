import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import * as svelteParser from 'svelte-eslint-parser';

export default [
	...tseslint.configs.recommendedTypeChecked,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.{js,ts}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: tseslint.parser,
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				project: true,
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		ignores: ['build/**', '.svelte-kit/**', 'dist/**']
	},
	{
		rules: {
			'no-console': 'on',
			'no-debugger': 'on',
			'no-unused-vars': 'off',
			'no-undef': 'off',
			'no-constant-condition': 'off',
			'no-prototype-builtins': 'off',
			'no-restricted-globals': 'off',
			'no-undef-init': 'off',
			'no-unused-labels': 'off',
			'no-unused-expressions': 'off',
			'no-use-before-define': 'off',
			'no-void': 'off',
			'no-with': 'off',
			'no-warning-comments': 'off',
			'no-throw-literal': 'off',
			'no-sequences': 'off',
			'no-script-url': 'off',
			'no-return-await': 'off',
			'no-restricted-syntax': 'off',
			'no-restricted-properties': 'off',
			'no-restricted-imports': 'off',
			'no-restricted-modules': 'off'
		}
	}
];
