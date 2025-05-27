import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config'
import typography from "@tailwindcss/typography";

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#10B981', // Emerald-500
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
      },
      screens: {
        custom: "1550px", // Define your custom breakpoint size
      },
      backgroundImage: {
        mountains: "url('/mountains.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: ({ theme }: PluginAPI) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.slate[200]'),
            '--tw-prose-links': theme('colors.emerald[400]'),
            '--tw-prose-bold': theme('colors.slate[200]'),
            '--tw-prose-quotes': theme('colors.slate[400]'),
            '--tw-prose-quote-borders': theme('colors.slate[700]'),
            '--tw-prose-counters': theme('colors.slate[400]'),
            '--tw-prose-bullets': theme('colors.slate[600]'), 
            '--tw-prose-hr': theme('colors.slate[700]'),
            '--tw-prose-th-borders': theme('colors.slate[600]'),
            '--tw-prose-td-borders': theme('colors.slate[700]'),
          },
        },
        DEFAULT: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.emerald.500'),
              '&:hover': {
                color: theme('colors.emerald.400'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
          },
        },
      }),
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '120rem', // Add even wider max-width
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
