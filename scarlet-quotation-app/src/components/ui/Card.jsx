export default function Card({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? 'border-[#C0392B] bg-[#C0392B]/5 shadow-sm' : 'border-[#E8E8E8] bg-white hover:border-[#922B21]/40'
      } ${className}`}
    >
      {children}
    </button>
  )
}
