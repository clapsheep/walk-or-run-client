/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF1F1',
          200: '#FFE4E4',
          300: '#FFC7C8',
          400: '#FF9497',
          500: '#FF5A5F',
          600: '#E6474C',
          700: '#CC3539',
          800: '#B32428',
          900: '#991317',
        },
        secondary: {
          100: '#F0FDF9',
          200: '#CCFBEF',
          300: '#99F6E4',
          400: '#5EEAD4',
          500: '#2DD4BF',
          600: '#14B8A6',
          700: '#0D9488',
          800: '#0F766E',
          900: '#134E4A',
        },
        accent: {
          100: '#FEFCE8',
          200: '#FEF9C3',
          300: '#FEF08A',
          400: '#FDE047',
          500: '#FACC15',
          600: '#EAB308',
          700: '#CA8A04',
          800: '#A16207',
          900: '#854D0E',
        },
        gray: {
          100: '#F8FAFC',
          200: '#EEF2F6',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#64748B',
          700: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        },
        info: {
          100: '#F0F9FF',
          200: '#E0F2FE',
          300: '#BAE6FD',
          400: '#7DD3FC',
          500: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
          800: '#0369A1',
          900: '#075985',
        },
        success: {
          100: '#F0FDF4',
          200: '#DCFCE7',
          300: '#BBF7D0',
          400: '#86EFAC',
          500: '#4ADE80',
          600: '#22C55E',
          700: '#16A34A',
          800: '#15803D',
          900: '#166534',
        },
        warning: {
          100: '#FFF7ED',
          200: '#FFEDD5',
          300: '#FED7AA',
          400: '#FDBA74',
          500: '#FB923C',
          600: '#F97316',
          700: '#EA580C',
          800: '#C2410C',
          900: '#9A3412',
        },
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|accent|gray|info|success|warning)-[1-9]00/,
      variants: ['hover', 'active', 'focus'],
    },
    {
      pattern: /(m|p|gap)-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /^font-(normal|medium|semibold|bold)$/,
    },
    {
      pattern: /(w|h)-(full|screen|auto|1\/2|1\/3|1\/4)/,
    },
    ,
    'flex',
    'flex-col',
    'flex-row',
    'items-center',
    'justify-center',
    'justify-between',
    // 필요한 패턴들 추가
  ],
  plugins: [],
}
