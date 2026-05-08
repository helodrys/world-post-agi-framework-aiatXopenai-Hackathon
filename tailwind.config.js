/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        panel: "0 24px 70px rgba(15, 23, 42, 0.10)",
        glow: "0 0 40px rgba(20, 184, 166, 0.18)"
      }
    }
  },
  plugins: []
};
