/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      rubik: ["rubik", "JetBrains Mono"],
    },
    // backgroundImage: {
    //   "hero-pattern": "url('/img/hero-pattern.svg')",
    //   "footer-texture": "url('/img/footer-texture.png')",
    // },
    extend: {},
  },
  plugins: [],
};
