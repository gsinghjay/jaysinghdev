/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './_includes/**/*.{njk,html}',
    './_config/**/*.js',
    './content/**/*.{njk,html,md}',
    './css/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        // Brutalist Design Palette
        // Primary: cream (backgrounds), Accents: lime (CTAs), yellow (highlights), pink (interactive)
        cream: '#FFFBEB',
        lime: '#84CC16',
        yellow: '#FACC15',
        pink: '#EC4899',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0 #000',
        'brutal': '4px 4px 0 #000',
        'brutal-md': '6px 6px 0 #000',
        'brutal-lg': '8px 8px 0 #000',
      },
    },
    borderRadius: {
      'none': '0',
    },
  },
  plugins: [],
};
