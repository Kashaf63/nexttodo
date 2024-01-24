/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light:"hsl(212, 29%, 18%)",
        primary: "hsl(222, 14%, 14%)",
        secondary: "hsl(222, 19%, 10%)",
      },
      screens: {
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1280px" },
        "2xl": { max: "1536px" },
      },
    },
  },
  plugins: [],
};
