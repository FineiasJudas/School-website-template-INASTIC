'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Reveal, Button, Card, Photo, Counter, Carousel, BgIcon, Marquee } from './ui';
import Image from 'next/image';
import { GraduationCap, Laptop, ChevronLeft, ChevronRight, Award, Lightbulb, Users, Briefcase } from 'lucide-react';
import Logo from './Logo';
import { stats, formats, courses, certs, alumni, schoolOffers, staff } from '@/lib/data';

const partners = [
  {
    name: 'Nexus Tech',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M12 8L22 32H17L14.5 25H9.5L7 32H2L12 8ZM12 15.5L10.2 21H13.8L12 15.5Z" fill="currentColor" />
        <path d="M28 8H33V32H28V8Z" fill="currentColor" />
        <path d="M39 8H47.5C52 8 55 10.5 55 14.5C55 18 52.5 20.5 49 21.2L55.5 32H49.8L44 22.5H44V32H39V8ZM44 12.5V18H47C49.5 18 50.5 17 50.5 15.2C50.5 13.5 49.5 12.5 47 12.5H44Z" fill="currentColor" />
        <path d="M61 8H66V32H61V8Z" fill="currentColor" />
        <path d="M72 8H87V12.5H77V17.5H85V22H77V27.5H87V32H72V8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Polytechnic University',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="4" />
        <path d="M14 20L18 24L27 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="42" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">POLYTECH</text>
      </svg>
    ),
  },
  {
    name: 'CloudScale',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M15 25H32C34.2 25 36 23.2 36 21C36 19.1 34.6 17.5 32.8 17.2C32.3 13.2 28.9 10 24.8 10C21.7 10 19 11.8 17.6 14.5C16.1 14.2 14.6 14.5 13.4 15.4C11.5 16.7 10.5 19 11 21.3C10.4 22 10 22.9 10 23.8C10 24.5 10.3 25 11 25H15Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="42" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="15" fontWeight="600">CloudScale</text>
      </svg>
    ),
  },
  {
    name: 'Global Institute',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <text x="42" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="14" fontWeight="bold">GLOBAL INST</text>
      </svg>
    ),
  },
  {
    name: 'Vortex AI',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M10 12L20 28L30 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        <text x="40" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">VORTEX</text>
      </svg>
    ),
  },
  {
    name: 'State University',
    logoSvg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M12 12H28V16H12V12ZM14 18H26V30H14V18ZM20 6L8 11V14H32V11L20 6Z" fill="currentColor" />
        <text x="36" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="14" fontWeight="bold">STATE UNIV</text>
      </svg>
    ),
  },
];

const Wrap = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) =>
  <section id={id} className={`py-20 ${className}`}><div className="mx-auto max-w-6xl px-5">{children}</div></section>;
// A barra azul é a cor "rara" da página: aparece só em detalhes pequenos
const H2 = ({ children, light }: { children: React.ReactNode; light?: boolean }) => <div className="mb-10">
  <span className="mb-4 block h-1 w-12 rounded bg-sky" /><h2 className={`text-4xl md:text-5xl ${light ? 'text-paper' : 'text-night'}`}>{children}</h2></div>;
const More = ({ light, href = '#' }: { light?: boolean; href?: string }) => <a href={href}
  className={`mt-8 inline-block font-semibold underline decoration-sky decoration-2 underline-offset-8 transition-all hover:decoration-4 ${light ? 'text-paper' : 'text-night'}`}>Ver mais</a>;

// Cartão com ícone em destaque e ícone grande, cortado e inclinado, ao fundo
const InfoCard = ({ icon: Icon, i, children, className = '' }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; i: number; children: React.ReactNode; className?: string }) =>
  <Card className={`relative overflow-hidden p-6 ${className}`}>
    <BgIcon icon={Icon} className={`h-44 w-44 ${i % 2 ? '-right-8 -top-8 rotate-[18deg]' : '-bottom-8 -right-8 -rotate-[18deg]'}`} />
    <div className="relative"><span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-night/5 text-night "><Icon className="h-6 w-6" /></span>{children}</div></Card>;

const Slant = ({ children, img, flush }: { children: React.ReactNode; img: string; flush?: boolean }) =>
  <div className="grid items-center gap-8 md:grid-cols-2">
    <Reveal x={-60} className={flush ? 'px-5 py-16' : 'p-8 md:p-12'}>{children}</Reveal>
    <Reveal x={140} className={flush ? 'md:-mr-5' : ''}><div style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}>
      <Photo src={img} alt="INASTIC" className="min-h-[20rem] w-full md:min-h-[30rem]" pos="50% 40%" /></div></Reveal></div>;

// Slides do hero: imagem, mensagem comercial e um botão. 'chips' mostra os valores com ícones.
const slides = [
  { img: '/hero.jpg', pos: '50% 50%', title: 'Aprenda tecnologia. Construa o seu futuro.',
    text: 'Cursos, certificações e licenciaturas em TI, com docentes da indústria e projectos reais.', cta: ['Conhecer os cursos', '#cursos'] },
  { img: '/young-woman-studying-library.jpg', pos: '50% 35%', title: 'Aulas práticas, desde o primeiro dia.',
    text: 'Laboratórios modernos, horários flexíveis e acompanhamento de perto até ao primeiro emprego.', cta: ['Candidatar-se', '#contacto'] },
  { img: '/74336.jpg', pos: '50% 50%', title: 'Valores que nos guiam.',
    text: 'Formamos pessoas preparadas para o mercado e para Angola.', cta: ['Quem somos', '#sobre'],
    chips: [[Award, 'Excelência'], [Lightbulb, 'Inovação'], [Users, 'Inclusão'], [Briefcase, 'Empregabilidade']] },
  { img: '/boy-studying-peacefully-library.jpg', pos: '50% 40%', title: 'Escolas e INASTIC, lado a lado.',
    text: 'Currículos de TI, formação de professores e parcerias para o ensino médio e superior.', cta: ['Propor parceria', '#escolas'] },
] as const;

export function Hero() {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); const fade = useTransform(scrollYProgress, [0, .8], [1, 0]);
  const [i, setI] = useState(0); const [hover, setHover] = useState(false);
  useEffect(() => { if (hover) return; const t = setTimeout(() => setI(n => (n + 1) % slides.length), 6000); return () => clearTimeout(t); }, [i, hover]);
  const go = (d: number) => setI(n => (n + d + slides.length) % slides.length);
  const s = slides[i]; const H = i === 0 ? 'h1' : 'h2';
  return <section ref={ref} aria-roledescription="carousel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    className="relative flex min-h-[92vh] items-end overflow-hidden bg-night pt-24 text-paper">
    <motion.div style={{ y }} className="absolute inset-0"><AnimatePresence initial={false}>
      <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1.04 }} exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: 'easeOut' } }}>
        <Photo src={s.img} alt="" className="h-full w-full" pos={s.pos} /></motion.div></AnimatePresence></motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20" />
    <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-6xl px-5 pb-12">
      <AnimatePresence mode="wait"><motion.div key={i} exit={{ opacity: 0, y: -20 }} transition={{ duration: .3 }}>
        <H className="max-w-3xl text-5xl md:text-7xl">{s.title.split(' ').map((w, k) => <span key={k} className="mr-3 inline-block overflow-hidden align-top">
          <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, delay: .15 + k * .07, ease: [.22, 1, .36, 1] }}>{w}</motion.span></span>)}</H>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: .7 }} className="mt-6 max-w-2xl text-lg text-paper/90">{s.text}</motion.p>
        {'chips' in s && <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .7 }} className="mt-6 flex flex-wrap gap-3">
          {s.chips.map(([Icon, l]) => <span key={l} className="inline-flex items-center gap-2 rounded-full bg-paper/15 px-4 py-2 backdrop-blur"><Icon className="h-4 w-4 text-sky" />{l}</span>)}</motion.div>}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: .7 }} className="mt-8">
          <Button href={s.cta[1]}>{s.cta[0]}</Button></motion.div></motion.div></AnimatePresence>
      <div className="mt-10 flex items-center gap-3">
        {slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} aria-current={k === i} onClick={() => setI(k)}
          className={`h-2 rounded-full transition-all duration-500 ${k === i ? 'w-10 bg-lime' : 'w-2 bg-paper/50 hover:bg-paper'}`} />)}
        </div>
    </motion.div></section>;
}

export const Partners = () => (
  <section className="bg-paper py-16">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1fr_1.6fr]">
      <Reveal x={-40}>
        <span className="mb-4 block h-1 w-12 rounded bg-sky" />
        <h2 className="text-3xl leading-tight text-night md:text-4xl">
          Trabalhamos com empresas de tecnologia e universidades para que a sua formação seja reconhecida.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div className="group relative grid h-24 place-items-center rounded-card border border-night/10 bg-cream px-4 text-center font-display text-xl text-slate transition-all hover:-translate-y-1 hover:bg-paper hover:shadow-card">
              {p.logoSvg ? (
                <div className="flex items-center justify-center opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  {p.logoSvg}
                </div>
              ) : (
                p.name
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const About = () => <section id="sobre" className="overflow-hidden bg-night text-paper"><div className="mx-auto max-w-6xl">
  <Slant flush img="/hero2.jpg"><h2 className="text-5xl italic md:text-6xl">Quem somos</h2>
    <p className="mt-6 max-w-lg text-lg">O INASTIC é um instituto superior de Luanda dedicado à formação em tecnologias de informação. Ensinamos com laboratórios, projectos reais e docentes que trabalham na indústria, para que cada aluno saia pronto para o mercado.</p>
    <div className="mt-8 grid grid-cols-3 gap-4">{stats.map(([n, l]) => <div key={n}>
      <div className="font-display text-4xl text-sky"><Counter value={n} /></div><p className="text-sm text-paper/80">{l}</p></div>)}</div>
    <div className="mt-8"><Button href="#cursos">Saber mais</Button></div></Slant></div></section>;

export const Formats = () => <Wrap><Reveal><H2>Encontre o formato de aprendizagem certo</H2></Reveal>
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{formats.map(([t, d, p, e], i) => <Reveal key={t} delay={i * .12} className="h-full">
    <InfoCard icon={e} i={i} className="h-full"><h3 className="text-2xl text-night">{t}</h3>
      <p className="mt-1 text-sm font-semibold text-slate">{d}</p><p className="mt-3 text-sm text-slate">{p}</p></InfoCard></Reveal>)}</div><More /></Wrap>;

export const Courses = () => <Wrap id="cursos"><Reveal><H2>As novidades do INASTIC</H2></Reveal>
  <Carousel>{courses.map(([t, k, d, l, img]) => <Card key={t} className="h-full overflow-hidden">
    <Photo src={img} alt={t} className="h-40" /><div className="p-5"><p className="text-xs font-semibold text-slate">{k}</p>
    <h3 className="mt-1 text-xl text-night">{t}</h3><p className="mt-2 text-sm text-slate">{d} · {l}</p></div></Card>)}</Carousel>
  <More /></Wrap>;

export const NextMove = () => <Wrap id="carreira"><div className="overflow-hidden rounded-box bg-night text-paper">
  <Slant img="/modern-business-center.jpg"><h2 className="text-4xl italic md:text-6xl">Faça o seu próximo passo</h2>
    <p className="mt-4 max-w-md text-lg">Ganhe as competências que o mercado de TI procura, com até <b>20% de desconto</b> em cursos e programas seleccionados. Use o código <span className="font-semibold text-sky">INASTIC2026</span> por tempo limitado.</p>
    <div className="mt-8"><Button href="#contacto">Aprender mais</Button></div></Slant></div></Wrap>;

export const Certs = () => <Wrap><Reveal><H2>Certificações reconhecidas</H2></Reveal>
  <Carousel>{certs.map(([t, a, e], i) => <InfoCard key={t} icon={e} i={i} className="h-full">
    <p className="text-sm font-semibold text-slate">{a}</p><h3 className="mt-1 text-2xl text-night">{t}</h3>
    <p className="mt-3 text-sm text-slate">Preparação e exame no nosso centro em Luanda.</p></InfoCard>)}</Carousel><More /></Wrap>;

export const Alumni = () => <Wrap className="overflow-hidden bg-night"><Reveal><H2 light>Histórias de antigos alunos</H2></Reveal>
  <Marquee>{alumni.map(([n, r, q, img]) => <figure key={n} className="w-80 rounded-card bg-paper/10 p-6 text-paper">
    <Photo src={img} alt={n} className="mb-4 h-16 w-16 rounded-full" pos="50% 25%" /><blockquote className="text-lg">{q}</blockquote>
    <figcaption className="mt-4 text-sm text-paper/80"><b>{n}</b><br />{r}</figcaption></figure>)}</Marquee><More light /></Wrap>;

export const Schools = () => <Wrap id="escolas"><Reveal><H2>Propostas para escolas</H2></Reveal>
  <div className="grid gap-5 md:grid-cols-3">{schoolOffers.map(([t, d], i) => <Reveal key={t} delay={i * .12} className="h-full">
    <Card className="h-full p-6"><h3 className="text-2xl text-night">{t}</h3><p className="mt-3 text-slate">{d}</p></Card></Reveal>)}</div>
  <div className="mt-8"><Button href="#contacto">Propor parceria</Button></div></Wrap>;

export const Staff = () => <Wrap id="quadros"><Reveal><H2>Quadros</H2></Reveal>
  <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{staff.map(([n, r, img], i) => <Reveal key={n} delay={i * .12}><Card className="overflow-hidden">
    <Photo src={img} alt={n} className="h-56" pos="50% 20%" /><div className="p-4"><h3 className="text-lg text-night">{n}</h3><p className="text-sm text-slate">{r}</p></div></Card></Reveal>)}</div><More /></Wrap>;

export const Join = () => <section className="group relative overflow-hidden bg-lime py-24 text-night">
  <BgIcon icon={GraduationCap} className="-bottom-12 right-4 h-64 w-64 -rotate-[18deg] !opacity-[.14]" /><BgIcon icon={Laptop} className="-top-12 right-72 h-56 w-56 rotate-[16deg] !opacity-[.14]" />
  <div className="relative mx-auto max-w-6xl px-5"><Reveal>
    <h2 className="max-w-3xl text-5xl italic md:text-7xl">Junte-se ao INASTIC</h2>
    <p className="mt-5 max-w-xl text-lg">As candidaturas para 2027 estão abertas. Escolha o seu curso e comece o seu próximo passo em Luanda.</p>
    <div className="mt-8 flex flex-wrap gap-3"><Button variant="dark" href="#contacto">Candidatar-se agora</Button><Button variant="ghost" href="#contacto">Falar com um consultor</Button></div></Reveal></div></section>;

export const Footer = () => <footer id="contacto" className="bg-night py-16 text-paper"><div className="mx-auto max-w-6xl px-5">
  <Logo /><p className="mt-4 text-paper/80">Luanda, Angola · geral@inastic.example · +244 900 000 000</p>
  <p className="mt-10 border-t border-paper/20 pt-6 text-sm text-paper/60">© 2026 INASTIC. Instituição fictícia, para fins de demonstração.</p></div></footer>;
