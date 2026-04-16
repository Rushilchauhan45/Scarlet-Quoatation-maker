export default function Input({ label, required, className = '', ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-[#1A1A1A]">
      <span>
        {label} {required ? <span className="text-[#C0392B]">*</span> : null}
      </span>
      <input
        className={`rounded-xl border border-[#E8E8E8] bg-white px-3 py-2 text-sm focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/20 ${className}`}
        {...props}
      />
    </label>
  )
}
