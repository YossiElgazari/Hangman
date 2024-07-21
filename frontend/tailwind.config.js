/** @type {import('tailwindcss').Config} */
module.exports = {
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
        headline1: ['4.05rem', '4.75rem'], // 64px to 76px
        headline2: ['2.30rem', '2.80rem'], // 36px to 44px
        headline3: ['1.80rem', '2.30rem'], // 28px to 36px
        headline4: ['1.75rem', '1.80rem'], // 20px to 28px
        body1: ['1.125rem', '1.75rem'], // 18px to 28px
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
        darkGrey: "#4D4D4D",
        grey: "#717171",
        lightGrey: "#B9B9B9",
        greyBlue: "#ABBED1",
        silverGrey: "#E8E8E8",
        silver: "#F5F7FA",
        white: "#FFFFFF",
        primary: "#FFFFF9",
        secondary: "#1A1D1E",
        secondary50: "#2B2D2E",
        info: "#EF21F3",
        shade1: "#CCFAEF",
        shade2: "#99E8E6",
        shade3: "#66D6DC",
        shade4: "#33C4D3",
        shade5: "#00B1C9",
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
