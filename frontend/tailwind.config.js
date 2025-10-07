/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        'card-foreground': "var(--card-foreground)",
        primary: "var(--primary)",
        'primary-foreground': "var(--primary-foreground)",
        accent: "var(--accent)",
        'accent-foreground': "var(--accent-foreground)",
        border: "var(--border)",
        // Add any other custom colors you use below!
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
