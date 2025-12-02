/** @type {import('tailwindcss').Config} */
// TODO match with Figma
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brandRed: '#E21E2B', // tweak with your exact Figma red
				brandDark: '#1A1A1A',
				brandGray: '#6B6B6B',
				brandLight: '#F7F7F7',
			},
			fontFamily: {
				sans: ["'Poppins'", 'system-ui', 'sans-serif'], // or Montserrat, etc.
			},
			maxWidth: {
				content: '1120px', // approximate page width from screenshot
			},
			boxShadow: {
				card: '0 8px 24px rgba(0,0,0,0.06)',
			},
			borderRadius: {
				card: '8px',
			},
		},
	},
	plugins: [],
};
