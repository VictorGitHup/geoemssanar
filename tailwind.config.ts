import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-color': '#262626',
        toggleOpen: {
          DEFAULT: '#585858', // Verde para el estado abierto (base)
          hover: '#007D32',   // Verde más oscuro cuando esté en hover
        },
        toggleClose: {
          DEFAULT: '#585858', // Verde para el estado abierto (base)
          hover: '#007D32',   // Rojo más oscuro cuando esté en hover
        },
      },
    },
  },
  plugins: [],
};

export default config;
