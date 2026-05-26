/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing silmatervis tokens
        "ksa-green": "#87be23",
        "ksa-dark": "#1a1a1a",
        "ksa-light": "#f5f5f5",
        // Blog-aligned tokens (ported from blog.ksa.ee globals.css)
        lime: "#86BC25",
        "lime-dark": "#6FA01E",
        "lime-darker": "#5A8518",
        "lime-wash": "#f4f9e8",
        ink: "#5A6B6C",
        "ink-80": "#4a5a5b",
        "ink-60": "#6f7f80",
        "ink-40": "#92a0a1",
        "ink-20": "#bbbbbb",
        beige: "#f5f0e6",
        "beige-light": "#faf7f0",
        line: "#e8e4dc",
      },
      fontFamily: {
        sans: [
          "Geist",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
        serif: ["Fraunces", "Georgia", "serif"],
        mono: ["Geist Mono", '"Courier New"', "monospace"],
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-right": "env(safe-area-inset-right)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "sp-section": "72px",
        "sp-block": "48px",
        "sp-item": "24px",
      },
      maxWidth: {
        prose: "65ch",
        guide: "720px",
      },
      aspectRatio: {
        video: "16 / 9",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,.06)",
        pop: "0 16px 48px rgba(0,0,0,.18)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
