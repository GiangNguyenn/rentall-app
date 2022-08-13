module.exports = {
  content: ["./src/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#222",
      white: "#fff",
      gray: "#777",
      blue: {
        100: "#4169E1",
        200: "#1010AE",
        300: "#153289",
      },
      red: "#AE1010",
      green: "#11995B",
      pink: "#FF385C",
    },

    extend: {
      backgroundImage: (theme) => ({
        auth: "url('/public/images/AuthBG.png')",
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
