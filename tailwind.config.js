module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EAF5FF",
          800: "#015198",
          900: "#02213D",
          dark: "#03a9f4",
        },
        dark: {
          100: "e5e7eb",
          800: "#1e293b",
          900: "#0f172a",
          border: "#03a9f4",
        },
        accent: {
          400: "#FEF0E0",
          800: "#F79121",
          900: "#B76103",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
