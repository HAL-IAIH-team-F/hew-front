import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#F8F8F8",
        blue: "#327AD9",
        lightBlue: "#52D9CB",
        crystal: "rgb(0,0,0)",
        backcolor: "#05253F",
        borderDef: "#B4B4B4",
        lightGray: "#747989"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
