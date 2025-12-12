/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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

        /* -----------------------------
         * 🌞 LIGHT THEME
         * ----------------------------- */

        // text: "hsl(288, 6%, 16%)",
        // textSecondary: "hsl(288, 6%, 16%)",
        // textMuted: "hsl(0, 0%, 75%)",

        // background: "hsl(0, 0%, 98%)",
        // backgroundSecondary: "hsl(257, 15%, 95%)",

        // primary: "hsl(263, 29%, 32%)", // lilac
        // primaryDark: "hsl(257, 8%, 18%)", // sherbet

        // yellow: "hsl(40, 100%, 50%)",
        // yellowLight: "hsl(40, 100%, 50%)",

        // green: "hsl(316, 35%, 85%)", // mint light
        // greenMedium: "hsl(316, 35%, 85%)",
        // greenDark: "hsl(316, 30%, 36%)",

        // white: "hsl(0, 0%, 98%)",
        // gray: "hsl(0, 0%, 75%)",
        // black: "hsl(288, 6%, 16%)",

        // tint: "hsl(263, 29%, 32%)",
        // icon: "hsl(256, 40%, 55%)",

        // tabIconDefault: "hsl(0, 0%, 75%)",
        // tabIconSelected: "hsl(263, 29%, 32%)",
        // tabBarBackground: "hsl(0, 0%, 98%)",

        // border: "hsl(0, 0%, 75%)",
        // divider: "hsl(0, 0%, 75%)",

        // success: "hsl(316, 30%, 36%)",
        // warning: "hsl(40, 100%, 50%)",
        // error: "hsl(0, 100%, 60%)",
        // info: "hsl(263, 29%, 32%)",

        /* -----------------------------
         * 🌙 DARK THEME (prefix: dark-)
         * ----------------------------- */

        // "dark-text": "hsl(0, 0%, 98%)",
        // "dark-textSecondary": "hsl(0, 0%, 98%)",
        // "dark-textMuted": "hsl(0, 0%, 39%)",

        // "dark-background": "hsl(288, 6%, 16%)",
        // "dark-backgroundSecondary": "hsl(257, 8%, 18%)",

        // "dark-primary": "hsl(263, 29%, 32%)",
        // "dark-primaryLight": "hsl(256, 40%, 76%)",

        // "dark-yellow": "hsl(40, 100%, 50%)",
        // "dark-yellowDark": "hsl(40, 100%, 50%)",

        // "dark-green": "hsl(316, 30%, 36%)",
        // "dark-greenMedium": "hsl(316, 30%, 36%)",
        // "dark-greenDark": "hsl(316, 30%, 36%)",

        // "dark-white": "hsl(0, 0%, 98%)",
        // "dark-gray": "hsl(0, 0%, 39%)",
        // "dark-black": "hsl(288, 6%, 16%)",

        // "dark-tint": "hsl(263, 29%, 32%)",
        // "dark-icon": "hsl(256, 40%, 76%)",

        // "dark-tabIconDefault": "hsl(0, 0%, 39%)",
        // "dark-tabIconSelected": "hsl(263, 29%, 32%)",
        // "dark-tabBarBackground": "hsl(257, 8%, 18%)",

        // "dark-border": "hsl(0, 0%, 39%)",
        // "dark-divider": "hsl(0, 0%, 39%)",

        // "dark-success": "hsl(316, 30%, 36%)",
        // "dark-warning": "hsl(40, 100%, 50%)",
        // "dark-error": "hsl(0, 100%, 60%)",
        // "dark-info": "hsl(263, 29%, 32%)",
      },
    },
  },
  plugins: [],
}