module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        "background-light": "#ffffff",
        "background-dark": "#0a0a0a",
        "surface-light": "#f4f4f5",
        "surface-dark": "#1a1a1a",
        "accent": "#3b82f6",
      },
      fontFamily: {
        display: ["'Montserrat'", "sans-serif"],
        body: ["'Open Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
