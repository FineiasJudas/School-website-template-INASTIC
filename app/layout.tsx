import './globals.css';
import { Roboto_Condensed, Inter } from 'next/font/google';
const display = Roboto_Condensed({ subsets: ['latin'], weight: ['700'], style: ['normal', 'italic'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
export const metadata = { title: 'INASTIC | Instituto Nacional Superior de Tecnologias de Informação e Comunicação',
  description: 'Formação superior e parcerias com escolas em tecnologia, dados e cibersegurança, em Luanda.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-AO" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
