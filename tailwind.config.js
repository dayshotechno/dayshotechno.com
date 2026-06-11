/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        surface: "#0A0A0A",
        primary: "#FF2A2A",
        content: "#E0E0E0",
        muted: "#6B6B6B",
        scan: "#39FF14",
        industrial: "#C0A062",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        body: ['"Space Grotesk"', "sans-serif"],
      },
      boxShadow: {
        brutal: "8px 8px 0px #FF2A2A",
        "brutal-sm": "4px 4px 0px #FF2A2A",
        "brutal-white": "8px 8px 0px #E0E0E0",
      },
      backgroundImage: {
        "warning-stripes":
          "repeating-linear-gradient(45deg, #FF2A2A 0px, #FF2A2A 12px, #050505 12px, #050505 24px)",
        "warning-stripes-bw":
          "repeating-linear-gradient(45deg, #E0E0E0 0px, #E0E0E0 12px, #050505 12px, #050505 24px)",
        "blueprint-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};
