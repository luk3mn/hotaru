/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: 'hsl(288, 6%, 16%)',
          mint: 'hsl(316, 30%, 36%)',
          lilac: 'hsl(263, 29%, 32%)',
          sherbet: 'hsl(257, 8%, 18%)',
          'sherbet-fade': 'hsl(260, 24%, 18%)',
          underline: 'hsl(0, 0%, 39%)',
          icon: 'hsl(256, 40%, 76%)',
          text: 'hsl(0, 0%, 98%)',
          warn: 'hsl(40, 100%, 50%)',
        },
        // Light theme colors (inversions and adjustments)
        light: {
          bg: 'hsl(0, 0%, 98%)',
          mint: 'hsl(316, 35%, 85%)',
          lilac: 'hsl(263, 35%, 88%)',
          sherbet: 'hsl(257, 15%, 95%)',
          'sherbet-fade': 'hsl(260, 20%, 93%)',
          underline: 'hsl(0, 0%, 75%)',
          icon: 'hsl(256, 40%, 55%)',
          text: 'hsl(288, 6%, 16%)',
          warn: 'hsl(40, 100%, 50%)',
        },
      },
    },
  },
  plugins: [],
}