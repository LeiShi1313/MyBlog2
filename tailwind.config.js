const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      spacing: {
        '1/1': '100%',
        '3/2': '150%',
      }
    },
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif", ...defaultTheme.fontFamily.sans],
      mono: ["Menlo", "Monaco", "Consolas", "Liberation Mono", ...defaultTheme.fontFamily.mono],
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "hover", "focus", "last"],
    borderWidth: ({ after }) => after(['last']),
  },
}
