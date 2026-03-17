import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // benessere.digital breakpoints (max-width based, matching original)
    screens: {
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Core brand
        primary: '#19242e',
        'surface-subtle': '#fafbfc',
        'surface-hover': '#f6f8fa',
        border: '#e1e4e8',
        // Accent
        'accent-blue': '#2d62ff',
        'cta-blue': '#0366d6',
        'cta-blue-hover': '#1158c7',
        'accent-pink': '#dd23bb',
        // Text variants
        placeholder: '#959da5',
        icon: '#43607a',
        'nav-link': '#375066',
        'text-dark': '#24292e',
        // Semantic / state
        'focus-ring': '#4d65ff',
        'contact-bg': '#a3c4f326',
        'success-bg': '#cef5ca',
        'success-text': '#114e0b',
        'error-bg': '#f8e4e4',
        'error-text': '#3b0b0b',
        'dark-section': '#181818',
        shadow: '#c2c2c233',
      },
      fontFamily: {
        // FuturaPT — self-hosted .woff (see /public/fonts/)
        // NOTE: FuturaPT is a proprietary Linotype font. Verify license for benessere.digital domain.
        futurapt: ['FuturaPT', 'Futura', 'Century Gothic', 'sans-serif'],
        'futurapt-demi': ['FuturaPT-Demi', 'Futura', 'Century Gothic', 'sans-serif'],
        // Pixelify Sans — variable font, for decorative accent text
        pixelify: ['PixelifySans', 'monospace'],
      },
      fontSize: {
        tiny: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        md: ['1.25rem', { lineHeight: '1.5rem' }],
        lg: ['1.5rem', { lineHeight: '2rem' }],
        h6: ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
        h5: ['1.25rem', { lineHeight: '1.5', fontWeight: '700' }],
        h4: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        h3: ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        h1: ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.25rem',
        md: '0.5rem',
        'nav-tab': '0.55rem',
        lg: '0.75rem',
        xl: '1rem',
        pill: '6.25rem',
      },
      maxWidth: {
        'container-xs': '32rem',
        'container-sm': '48rem',
        'container-md': '64rem',
        'container-lg': '80rem',
        'container-nav': '85rem',
      },
      spacing: {
        tiny: '0.125rem',
        xxsmall: '0.25rem',
        xsmall: '0.5rem',
        small: '1rem',
        medium: '2rem',
        large: '3rem',
        xlarge: '4rem',
        xxlarge: '5rem',
        huge: '6rem',
        xhuge: '8rem',
        xxhuge: '12rem',
      },
      boxShadow: {
        card: '0 4px 8px 0 #c2c2c233',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(.165, .84, .44, 1)',
      },
    },
  },
  plugins: [],
}

export default config
