export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-[#C0392B] text-white hover:bg-[#922B21]',
    secondary: 'bg-white text-[#1A1A1A] border border-[#E8E8E8] hover:bg-[#FAFAFA]',
    ghost: 'bg-transparent text-white/90 hover:bg-white/10',
  }

  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
