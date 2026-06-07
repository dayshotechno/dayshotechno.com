/** @type {import('tailwindcss').Config} */
module.exports = {
  // Alle HTML-Seiten im Root werden nach genutzten Klassen gescannt.
  content: ["./*.html"],
  // Diese Klassen werden ausschließlich per JavaScript gesetzt
  // (index.html: Thumbnail-Aktivzustand) und vom Scanner sonst evtl. übersehen.
  safelist: ["bg-red-900", "border-white"],
  theme: {
    extend: {},
  },
  plugins: [],
};
