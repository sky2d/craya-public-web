import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}", "../../lib/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        scrollUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "scroll-fade": "scrollUpDown 2s ease-in-out infinite, fadeOut 3s ease-in-out forwards 4s",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(205px, 1fr))",
      },
      colors: {
        brand: {
          color1: "#7C54E9",
          color2: "#F2D012",
          color3: "#B2B7F1",
        },
        state: {
          error: {
            light: "#FF3B3B",
            DEFAULT: "#f44336",
            dark: "#d32f2f",
          },
          warning: {
            light: "#FFCC00",
            DEFAULT: "#ff9800",
            dark: "#f57c00",
          },
          info: {
            light: "#0063F7",
            DEFAULT: "#17a2b8",
            dark: "#0c5460",
          },
          success: {
            light: "#06C270",
            DEFAULT: "#4caf50",
            dark: "#388e3c",
          },
        },
        black: {
          dark1: "#121212",
          dark2: "#1E1E1E",
          dark3: "#3A3A3C",
          dark4: "#C7C9D9",
        },
        white: {
          light1: "#C7C9D9",
          light2: "#DDE5E9",
          light3: "#F2F2F5",
          light4: "#FAFAFC",
        },
        backgroundGray: "#E7E7E7",
        textGray: "#868686",
        gray: "#D9D9D9",
        defaultColor: "#A3DEEC",
        plusIconColor: "#B2B7F1",
        textColor: "#868686",
      },
      fontSize: {
        xs: "12px", // 0.75rem
        sm: "14px", // 0.875rem
        base: "16px", // 1rem
        lg: "18px", // 1.125rem
        xl: "20px", // 1.25rem
        "2xl": "22px", // 1.375rem
        "3xl": "24px", // 1.5rem
        "4xl": "28px", // 1.75rem
        "5xl": "36px", // 2.25rem
        "6xl": "44px", // 2.75rem
      },
    },
  },
  plugins: [
    function (api: PluginAPI) {
      const { addUtilities } = api;
      addUtilities({
        ".heading-1": {
          fontWeight: "700",
          fontSize: "2.75rem",
        },
        ".heading-2": {
          fontWeight: "700",
          fontSize: "2.25rem",
        },
        ".heading-3": {
          fontWeight: "700",
          fontSize: "1.75rem",
        },
        ".heading-4": {
          fontWeight: "700",
          fontSize: "1.5rem",
        },
        ".heading-5": {
          fontWeight: "700",
          fontSize: "1.25rem",
        },
        ".heading-6": {
          fontWeight: "700",
          fontSize: "1rem",
        },
        ".paragraph": {
          fontWeight: "400",
          fontSize: "1.375rem",
        },
        ".body-lg": {
          fontWeight: "400",
          fontSize: "1.25rem",
        },
        ".body-lg-semibold": {
          fontWeight: "600",
          fontSize: "1.25rem",
        },
        ".body-md": {
          fontWeight: "400",
          fontSize: "1.125rem",
        },
        ".body-md-semibold": {
          fontWeight: "600",
          fontSize: "1.125rem",
        },
        ".body-normal": {
          fontWeight: "400",
          fontSize: "1rem",
        },
        ".body-normal-semibold": {
          fontWeight: "600",
          fontSize: "1rem",
        },
        ".body-sm": {
          fontWeight: "400",
          fontSize: "0.875rem",
        },
        ".body-sm-semibold": {
          fontWeight: "600",
          fontSize: "0.875rem",
        },
        ".body-sm-bold": {
          fontWeight: "700",
          fontSize: "0.875rem",
        },
        ".body-xs": {
          fontWeight: "400",
          fontSize: "0.625rem",
        },
        ".body-xs-semibold": {
          fontWeight: "600",
          fontSize: "0.625rem",
        },
      });
    },
  ],
};
export default config;
