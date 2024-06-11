import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: {

            DEFAULT: "#546e7a",
            foreground: "#fff",
          },
          secondary: {
            DEFAULT: "#ecedee",
            foreground: "#000",
          }
        }
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#ecedee",
            foreground: "#000",
          },
          secondary: {
            DEFAULT: "#546e7a",
            foreground: "#fff",
          }
        }
      }
    }
  })],
};
export default config;
