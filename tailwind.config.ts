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
      '2xl': { max: '1440px' },
      xl: { max: '1280px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '480px' },
    },
    extend: {
      colors: {
        primary: '#19242e',
        muted: '#4a5966',
        'surface-subtle': '#fafbfc',
        'surface-hover': '#f3f5f7',
        border: '#e1e4e8',
        // Un solo accento: corallo delle cover, scurito quel tanto che basta
        // perché il bianco in etichetta superi AA (5.2:1).
        accent: '#c43c2c',
        'accent-hover': '#a33224',
        'accent-blue': '#c43c2c',
        'cta-blue': '#c43c2c',
        'cta-blue-hover': '#a33224',
        'accent-pink': '#c43c2c',
        'accent-coral': '#c43c2c',
        placeholder: '#5c6b78',
        icon: '#19242e',
        'nav-link': '#19242e',
        'text-dark': '#24292e',
        'focus-ring': '#c43c2c',
        'contact-bg': '#fafbfc',
        'success-bg': '#cef5ca',
        'success-text': '#114e0b',
        'error-bg': '#f8e4e4',
        'error-text': '#3b0b0b',
        'dark-section': '#19242e',
        shadow: '#c2c2c233',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        pixelify: ['var(--font-pixelify)', 'sans-serif'],
      },
      fontSize: {
        // Note secondarie: minimo 13px. Il corpo non scende sotto i 16px.
        xs: ['0.8125rem', { lineHeight: '1.125rem' }],
        tiny: ['0.8125rem', { lineHeight: '1.25rem' }],
        sm: ['1rem', { lineHeight: '1.5rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        md: ['1.25rem', { lineHeight: '1.5rem' }],
        lg: ['1.5rem', { lineHeight: '2rem' }],
        h6: ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
        h5: ['1.25rem', { lineHeight: '1.35', fontWeight: '700' }],
        h4: ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        h1: ['3.5rem', { lineHeight: '1.05', fontWeight: '700' }],
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
        card: 'none',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(.165, .84, .44, 1)',
      },
    },
  },
  plugins: [],
}

export default config
