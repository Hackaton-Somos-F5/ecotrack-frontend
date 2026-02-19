export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
};

module.exports = {
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          500: '#795548',
          900: '#3e2723',
        },
      },
    },
  },
}
