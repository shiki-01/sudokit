/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  safelist: [
    {
      pattern: /^(bg|text|border|shadow)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|[1-9]00|950)(?:\/[0-9]{1,2})?$/,
      variants: ['dark']
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

