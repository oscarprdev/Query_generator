import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				background: 'var(--background)',
				border: 'var(--border)',
				primary: 'var(--primary)',
				primaryLight: 'var(--primary-light)',
				primaryDark: 'var(--primary-dark)',
				secondary: 'var(--secondary)',
				secondaryLight: 'var(--secondary-light)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(15px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-up-light': {
					from: { opacity: '0', transform: 'translateY(5px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},

				'fade-down-light': {
					from: { opacity: '1', transform: 'translateY(0px)' },
					to: { opacity: '0', transform: 'translateY(5px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.2s ease-out',
				'fade-up-light': 'fade-up-light 0.3s ease-in-out forwards',
				'fade-down-light': 'fade-down-light 0.3s ease-in-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
