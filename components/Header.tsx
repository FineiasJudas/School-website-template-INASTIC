'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { nav } from '@/lib/data';
import Logo from './Logo';
import { Button } from './ui';
export default function Header() {
  const [open, setOpen] = useState(false); const [solid, setSolid] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setSolid(v > 40));
  return <motion.header initial={{ y: -90 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 90, damping: 15 }}
    className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-300 ${solid || open ? 'bg-night shadow-lift' : 'bg-transparent'}`}>
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
      <a href="#" aria-label="INASTIC, início"><Logo /></a>
      <nav className="hidden items-center gap-8 md:flex">{nav.map(([l, h]) => <a key={h} href={h} className="text-paper hover:text-lime">{l}</a>)}
        <Button href="#contacto" className="!px-5 !py-2">Candidatar-se</Button></nav>
      <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="text-3xl md:hidden">{open ? '×' : '≡'}</button>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden md:hidden">
      <div className="flex flex-col gap-4 px-5 pb-6 text-paper">{nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <Button href="#contacto">Candidatar-se</Button></div></motion.nav>}</AnimatePresence>
    <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-1 origin-left bg-lime" />
  </motion.header>;
}
