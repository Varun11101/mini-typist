/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        mainBg: 'var(--color-main-background)',
        mainText: 'var(--color-main-text)',
        secondaryText: 'var(--color-secondary-text)',
        errorText: 'var(--color-error-text)',
        successText: 'var(--color-success-text)',
        secondaryBg: 'var(--color-secondary-background)',
        lightBg: 'var(--color-light-background)',
        lemonYellow:'var(--color-lemon-yellow)',
      },
    },
  },
  plugins: [],
}