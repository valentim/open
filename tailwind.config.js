/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#f1f8f3',
					100: '#dceee0',
					200: '#c2e1c9',
					300: '#9fd2aa',
					400: '#74ba82',
					500: '#4da660',
					600: '#3e864e',
					700: '#326d42',
					800: '#275336',
					850: '#1e432b',
					900: 'var(--color-gray-900, #183620)',
					950: 'var(--color-gray-950, #346e3f)'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						pre: false,
						code: false,
						'pre code': false,
						'code::before': false,
						'code::after': false
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
