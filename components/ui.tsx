'use client';
import Image from 'next/image';
import { motion, useInView, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export const Reveal = ({ children, delay = 0, x = 0, className = '' }: { children: React.ReactNode; delay?: number; x?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 56, x, scale: .96 }} whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    viewport={{ once: true, margin: '-80px' }} transition={{ type: 'spring', stiffness: 70, damping: 16, delay }}>{children}</motion.div>);

export const Button = ({ children, href = '#', variant = 'lime', className = '' }: { children: React.ReactNode; href?: string; variant?: 'lime' | 'outline' | 'dark' | 'ghost'; className?: string }) => (
  <motion.a href={href} whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: .95 }}
    className={`inline-block text-center rounded-full px-7 py-3 font-semibold transition-colors ${
      { lime: 'bg-lime text-night hover:brightness-110', outline: 'border-2 border-paper text-paper hover:bg-paper hover:text-night',
        dark: 'bg-night text-paper hover:brightness-125', ghost: 'border-2 border-night text-night hover:bg-night hover:text-paper' }[variant]} ${className}`}>{children}</motion.a>);

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`group rounded-card bg-paper shadow-card hover:shadow-lift transition-shadow ${className}`}>{children}</motion.div>);

export function Photo({ src, alt, className = '', pos = 'center' }: { src?: string; alt: string; className?: string; pos?: string }) {
  return <div className={`relative overflow-hidden bg-slate ${className}`}>
    {src && <Image src={src} alt={alt} fill sizes="(max-width:768px) 90vw, 40vw" style={{ objectPosition: pos }}
      className="object-cover transition-transform duration-700 group-hover:scale-110" />}</div>;
}

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(value); const m = value.match(/^(\D*)(\d+)(\D*)$/);
  useEffect(() => { if (!inView || !m) return;
    const c = animate(0, +m[2], { duration: 1.6, ease: 'easeOut', onUpdate: v => setOut(`${m[1]}${Math.round(v)}${m[3]}`) }); return () => c.stop(); }, [inView]);
  return <span ref={ref}>{out}</span>;
}

// Carrossel automático: 3-4 cartões por página, avança a cada 4s, setas laterais
export function Carousel({ children }: { children: React.ReactNode[] }) {
  const n = children.length; const [per, setPer] = useState(4); const [page, setPage] = useState(0); const [hover, setHover] = useState(false);
  useEffect(() => { const f = () => setPer(innerWidth >= 1024 ? 4 : innerWidth >= 768 ? 3 : innerWidth >= 640 ? 2 : 1);
    f(); addEventListener('resize', f); return () => removeEventListener('resize', f); }, []);
  const pages = Math.ceil(n / per), pg = Math.min(page, pages - 1);
  useEffect(() => { if (hover) return; const t = setInterval(() => setPage(p => (p + 1) % pages), 4000); return () => clearInterval(t); }, [hover, pages]);
  const x = -Math.min(pg * per, n - per) * (100 / per);
  const go = (d: number) => setPage((pg + d + pages) % pages);
  const arrow = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper text-2xl text-night shadow-lift hover:bg-lime';
  return <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
    <button aria-label="Anterior" onClick={() => go(-1)} className={`${arrow} -left-3 md:-left-6`}>‹</button>
    <div className="overflow-hidden py-4"><motion.div className="flex" animate={{ x: `${x}%` }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
      {children.map((c, i) => <div key={i} className="shrink-0 p-2" style={{ width: `${100 / per}%` }}>{c}</div>)}</motion.div></div>
    <button aria-label="Seguinte" onClick={() => go(1)} className={`${arrow} -right-3 md:-right-6`}>›</button></div>;
}

export const BgIcon = ({ icon: Icon, className = '' }: { icon: React.ElementType; className?: string }) => (
  <Icon aria-hidden strokeWidth={1.4} className={`pointer-events-none absolute select-none text-night opacity-[.08] transition-transform duration-500 group-hover:scale-110 ${className}`} />);

// Rolagem contínua e suave (pausa ao passar o rato)
export function Marquee({ children }: { children: React.ReactNode[] }) {
  return <div className="marquee-wrap overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)' }}>
    <div className="marquee flex w-max">{[0, 1, 2].map(k => <div key={k} className="flex" aria-hidden={k > 0}>
      {children.map((c, i) => <div key={i} className="shrink-0 pr-5">{c}</div>)}</div>)}</div></div>;
}
