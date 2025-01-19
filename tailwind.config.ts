import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#F8F8F8",
        blue: "rgba(5,41,63,0.73)",
        lightBlue: "#52D9CB",
        crystal: "rgb(0,0,0)",
        backcolor: "#05253F",
        borderDef: "#B4B4B4",
        lightGray: "#747989",
      },
    },
  },
  plugins: [],
};

export default config;
