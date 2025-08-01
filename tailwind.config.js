/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}',
    './features/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './CodeLingo/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        menlo: ['menlo'],
        mono: ['menlo'],
        'menlo-bold': ['menlo-bold'],
      },
    },
  },
  plugins: [],
}
