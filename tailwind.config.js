/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm-custom': { 'max': '768px' },
        'lg-custom': { 'max': '1021px' },
      },
      zIndex: {
        'custom-index': '9999',
      },
      fontSize: {
        'custom-font': '13px',
      },
      fontWeight: {
        'ClashCustom': '400'
      },
      lineHeight: {
        'custom-height': 'normal'
      },
      colors: {
        link: {
          hover: "#202A54"
        },
        button: {
          background: {
            primary: "#202A54",
            secondary: "#F6D200"
          },
        },
      },
      fontFamily: {
        // "ClashExtraLight": ["Clash-Extralight"],
        // "ClashLight": ["Clash-Light"],
        // "ClashMedium": ["Clash-Medium"],
        // "ClashRegular": ["Clash-Regular"],
        // "ClashSemiBold": ["Clash-SemiBold"],
        // "ClashBold": ["Clash-Bold"],

      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}

