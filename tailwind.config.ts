import type { Config } from "tailwindcss";

const config: Config = {

  content: [

    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

  ],

  theme: {

    container: {

      center: true,

      padding: {

        DEFAULT: "1rem",

        sm: "1.25rem",

        lg: "2rem",

        xl: "2.5rem",

        "2xl": "3rem",

      },

    },

    extend: {

      /* Colors */

      colors: {

        primary: {

          DEFAULT: "#0B6B57",

          50: "#ECFDF5",

          100: "#D1FAE5",

          200: "#A7F3D0",

          300: "#6EE7B7",

          400: "#34D399",

          500: "#10B981",

          600: "#059669",

          700: "#047857",

          800: "#065F46",

          900: "#064E3B",

          950: "#022C22",

        },

        secondary: {

          DEFAULT: "#F8FAFC",

        },

        accent: {

          DEFAULT: "#F97316",

        },

        card: {

          DEFAULT: "#FFFFFF",

        },

        muted: {

          DEFAULT: "#64748B",

        },

      },

      /* Fonts */

      fontFamily: {

        sans: [

          "var(--font-cairo)",

          "sans-serif",

        ],

        heading: [

          "var(--font-cairo)",

          "sans-serif",

        ],

      },

      /* Border Radius */

      borderRadius: {

        "4xl": "2rem",

        "5xl": "2.5rem",

      },

      /* Shadows */

      boxShadow: {

        soft:

          "0 10px 40px rgba(2, 6, 23, 0.06)",

        card:

          "0 4px 20px rgba(15, 23, 42, 0.06)",

        floating:

          "0 15px 50px rgba(11,107,87,0.18)",

        glow:

          "0 0 40px rgba(16,185,129,0.35)",

      },

      /* Animations */

      keyframes: {

        fadeUp: {

          "0%": {

            opacity: "0",

            transform:
              "translateY(12px)",

          },

          "100%": {

            opacity: "1",

            transform:
              "translateY(0)",

          },

        },

        scaleIn: {

          "0%": {

            opacity: "0",

            transform:
              "scale(0.96)",

          },

          "100%": {

            opacity: "1",

            transform:
              "scale(1)",

          },

        },

        pulseSoft: {

          "0%, 100%": {

            opacity: "1",

          },

          "50%": {

            opacity: ".65",

          },

        },

        float: {

          "0%,100%": {

            transform:
              "translateY(0px)",

          },

          "50%": {

            transform:
              "translateY(-6px)",

          },

        },

      },

      animation: {

        fadeUp:
          "fadeUp 0.35s ease",

        scaleIn:
          "scaleIn 0.25s ease",

        pulseSoft:
          "pulseSoft 2s ease-in-out infinite",

        float:
          "float 4s ease-in-out infinite",

      },

      /* Spacing */

      spacing: {

        18: "4.5rem",

        22: "5.5rem",

        26: "6.5rem",

      },

      /* Mobile Heights */

      minHeight: {

        screenMobile:
          "100svh",

      },

      /* Backdrop Blur */

      backdropBlur: {

        xs: "2px",

      },

    },

  },

  plugins: [],

};

export default config;