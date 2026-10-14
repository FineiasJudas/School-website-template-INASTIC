import type { Config } from 'tailwindcss';
// color-mix permite usar modificadores de opacidade (bg-night/80) com variáveis CSS
const c = (v: string) => `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: c('--color-1'), paper: c('--color-2'), sky: c('--color-3'), lime: c('--color-4'), mute: c('--color-5'),
      night: c('--edx-dark'), cream: c('--edx-cream'), pink: c('--edx-pink'), slate: c('--color-9'), coal: c('--color-10') },
    fontFamily: { display: ['var(--font-display)', 'sans-serif'], sans: ['var(--font-body)', 'sans-serif'] },
    borderRadius: { card: '16px', box: '24px' },
    boxShadow: { card: '0 2px 12px rgba(0,20,60,.12)', lift: '0 14px 34px rgba(0,20,60,.25)' } } },
} satisfies Config;
