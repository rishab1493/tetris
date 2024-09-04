import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellow: "#a16207",
        lime: "#4d7c0f",
        sky: "#0369a1",
        indigo: "#4338ca",
        red: "#be123c",
        teal: "#0f766e",
        zinc: "#3f3f46",
        orange: "#c2410c",
      },
    },
  },
  plugins: [],
}
export default config
