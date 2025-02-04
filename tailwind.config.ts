import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config'
import typography from "@tailwindcss/typography";

export default {
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
      },
      screens: {
        custom: "1550px", // Define your custom breakpoint size
      },
      backgroundImage: {
        mountains: "url('/mountains.svg')",
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
    },
  },
  plugins: [typography],
} satisfies Config;
