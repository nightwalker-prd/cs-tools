/**
 * CS Tools Tailwind Preset
 * Dark developer aesthetic theme for all CS Tools standalone tools.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D1117',
          foreground: '#E6EDF3',
        },
        accent: {
          DEFAULT: '#58A6FF',
          foreground: '#0D1117',
          secondary: '#3FB950',
          warning: '#D29922',
          error: '#F85149',
        },
        surface: {
          0: '#010409',
          1: '#0D1117',
          2: '#161B22',
          3: '#21262D',
        },
        border: {
          DEFAULT: '#30363D',
        },
        muted: {
          DEFAULT: '#8B949E',
          foreground: '#8B949E',
        },
        syntax: {
          keyword: '#FF7B72',
          string: '#A5D6FF',
          function: '#D2A8FF',
          variable: '#FFA657',
        },
        // UI colors (CSS variables for shadcn compatibility)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'gradient': 'gradient 3s ease infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(88, 166, 255, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(88, 166, 255, 0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
};
