export default function Logo({ className = '' }: { className?: string }) {
  return <span className={`inline-flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden><rect width="40" height="40" rx="10" fill="#a4b31f" />
       <path d="M12 12H28V16H12V12ZM14 18H26V30H14V18ZM20 6L8 11V14H32V11L20 6Z" fill="#384749" />
      <circle cx="31" cy="11" r="3.2" fill="#384749" /></svg>
    <span className="font-display text-2xl tracking-[.16em]">INASTIC</span></span>;
}
