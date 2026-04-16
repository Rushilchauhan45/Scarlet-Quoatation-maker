import { formatIndianCurrency } from '../../utils/formatCurrency'

export default function CostSummary({ value, onChange }) {
  return (
    <div className="rounded-2xl border-2 border-[#C0392B] p-4">
      <label className="mb-2 block text-sm font-semibold text-[#1A1A1A]">Total Estimated Cost</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E8E8E8] px-3 py-2 text-lg font-semibold"
        placeholder="821000"
      />
      <p className="mt-2 text-[#C0392B]">{`Total Estimated Cost: ${formatIndianCurrency(value)}  Rs.`}</p>
    </div>
  )
}
