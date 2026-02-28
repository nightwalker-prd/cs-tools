/**
 * Arab Tools Tailwind Preset
 *
 * Shared theme configuration for all Arab Tools standalone tools.
 * Uses the Islamic manuscript aesthetic with navy, gold, and parchment tones.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Core brand colors
        primary: {
          DEFAULT: '#1a3150', // Navy (lapis)
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#c5a253', // Gold
          foreground: '#1a3150',
        },
        // Parchment palette
        parchment: {
          light: '#FAF7F2',
          warm: '#F5EDE3',
          dark: '#E8DFD4',
        },
        // Ink colors
        ink: {
          black: '#2A2522',
          brown: '#5C4A3D',
        },
        // Additional colors
        gold: {
          light: '#E8D5A3',
          DEFAULT: '#C5A253',
        },
        burgundy: '#6B2D3C',
        lapis: '#1a3150',
        // UI colors
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
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['EB Garamond', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'gold-pulse': 'gold-pulse 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(45deg)' },
          '50%': { transform: 'translateY(-20px) rotate(45deg)' },
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
        'gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 162, 83, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(197, 162, 83, 0)' },
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
