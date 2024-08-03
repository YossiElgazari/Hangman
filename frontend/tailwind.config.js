/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        permanent: ['Permanent Marker', 'cursive'],
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        headline1: ['4rem', '4.75rem'], // 64px to 76px
        headline2: ['3rem', '3.75rem'], // 48px to 60px
        headline3: ['2.25rem', '3rem'], // 36px to 48px
        headline4: ['1.75rem', '2.25rem'], // 28px to 36px
        body1: ['1.25rem', '1.75rem'], // 20px to 28px
        body2: ['1rem', '1.5rem'], // 16px to 24px
        body3: ['0.875rem', '1.25rem'], // 14px to 20px
        body4: ['0.75rem', '1rem'] // 12px to 16px
      },
      fontWeight: {
        semibold: 600,
        regular: 400,
        medium: 500,
      },
      boxShadow: {
        shadow2px: '0 0.125rem 0.25rem rgba(171, 190, 209, 0.6)',
        shadow4px: '0 0.25rem 0.5rem rgba(171, 190, 209, 0.4)',
        shadow6px: '0 0.375rem 0.75rem rgba(171, 190, 209, 0.3)',
        shadow8px: '0 0.5rem 1rem rgba(171, 190, 209, 0.4)',
        shadow16px: '0 1rem 2rem rgba(171, 190, 209, 0.3)',
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        silver: "#F5F7FA",
        primary: "#FFFFF9",
        primary50: "#F5F7FA",
        secondary: "#1A1D1E",
        secondary50: "#2B2D2E",
        primary_dark: "#1A1D1E",
        primary_dark50: "#2B2D2E",
        secondary_dark: "#FFFFF9",
        secondary_dark50: "#F5F7FA",
        text_dark: "#FFFFF9",
        text_light: "#1A1D1E",
        tint1: "#BED9DD",
        tint2: "#CBDFE3",
        tint3: "#D3E6E9",
        tint4: "#DDECEF",
        tint5: "#E8F3F5",
        warning: "#FBC02D",
        error: "#E53835",
        success: "#2E7D31"
      },
    },
  },
  plugins: [],
}