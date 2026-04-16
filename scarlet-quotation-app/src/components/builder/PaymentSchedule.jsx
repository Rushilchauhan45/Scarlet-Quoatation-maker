import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function PaymentSchedule({ rows, onChange }) {
  const update = (id, key, value) => {
    onChange(rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)))
  }

  const remove = (id) => onChange(rows.filter((row) => row.id !== id))
  const add = () => onChange([...rows, { id: crypto.randomUUID(), stage: '', percentage: '' }])

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={row.id} className="grid grid-cols-12 gap-2">
          <div className="col-span-1 rounded-lg bg-[#E8E8E8] px-2 py-2 text-center text-sm">{index + 1}</div>
          <input
            className="col-span-8 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
            value={row.stage}
            onChange={(e) => update(row.id, 'stage', e.target.value)}
          />
          <input
            className="col-span-2 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
            value={row.percentage}
            onChange={(e) => update(row.id, 'percentage', e.target.value)}
            placeholder="10%"
          />
          <button type="button" className="col-span-1 rounded-md p-2 text-[#922B21] hover:bg-[#FAFAFA]" onClick={() => remove(row.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}><Plus size={14} className="mr-2 inline" /> Add Stage</Button>
    </div>
  )
}
