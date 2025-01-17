import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#F8F8F8",
        blue: "#327AD9",
        lightBlue: "#52D9CB",
        crystal: "rgb(0,0,0)",
        backcolor: "#05253F",
        borderDef: "#B4B4B4",
        lightGray: "#747989",
      },
      keyframes: {
        wave: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        wave: "wave 10s ease infinite",
      },
      backgroundImage: {
        "ocean-wave":
            "linear-gradient(90deg, #0C4C81, #0B4372, #08385F, #042948, #05253F)",
      },
    },
  },
  plugins: [],
};
export default config;
