/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 주요 브랜드 컬러

        // 메인 컬러 - 모던한 다크 테마
        brand: {
          yellow: '#FCED2F',
          yellowLight: '#FFF9B0',
          yellowDark: '#C7B800',
          dark: '#1a1a1a',
        },

        // 배경색 계열
        background: {
          primary: '#22232D',
          secondary: '#21222D',
        },
      },
    },
  },
  plugins: [],
}
