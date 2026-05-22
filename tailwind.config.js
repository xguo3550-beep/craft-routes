/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ink: "#1a1a1a",
        muted: "#6b6b6b",
        line: "#e8e4de",
        brand: {
          50: "#fdf4f1",
          100: "#f9e4dc",
          200: "#f2c9b8",
          300: "#e8a88f",
          400: "#d97d5a",
          500: "#c0562f",
          600: "#C0562F",
          700: "#a34726",
          800: "#863a1f",
          900: "#6e311b",
        },
        pastel: {
          peach: "#f5e6dc",
          sky: "#dce8f0",
          lilac: "#e8e0f0",
          sage: "#dce8dc",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(26, 26, 26, 0.06)",
        card: "0 2px 12px rgba(26, 26, 26, 0.06)",
      },
    },
  },
  plugins: [],
};
