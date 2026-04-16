import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function MaterialTable({ rows, onChange }) {
  const updateCell = (id, key, value) => {
    onChange(rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)))
  }

  const addRow = () => {
    onChange([...rows, { id: crypto.randomUUID(), material: '', specification: '', clarity: '' }])
  }

  const removeRow = (id) => onChange(rows.filter((row) => row.id !== id))

  return (
    <div className="space-y-3">
      <div className="overflow-auto rounded-2xl border border-[#E8E8E8]">
        <table className="w-full min-w-[740px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#C0392B] text-white">
              <th className="p-2 text-left">Material</th>
              <th className="p-2 text-left">Specification</th>
              <th className="p-2 text-left">Important Clarity</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#E8E8E8]">
                <td className="p-2"><input className="w-full rounded border border-[#E8E8E8] px-2 py-1" value={row.material} onChange={(e) => updateCell(row.id, 'material', e.target.value)} /></td>
                <td className="p-2"><input className="w-full rounded border border-[#E8E8E8] px-2 py-1" value={row.specification} onChange={(e) => updateCell(row.id, 'specification', e.target.value)} /></td>
                <td className="p-2"><input className="w-full rounded border border-[#E8E8E8] px-2 py-1" value={row.clarity} onChange={(e) => updateCell(row.id, 'clarity', e.target.value)} /></td>
                <td className="p-2">
                  <button type="button" onClick={() => removeRow(row.id)} className="rounded-md p-2 text-[#922B21] hover:bg-[#FAFAFA]"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="secondary" onClick={addRow}><Plus size={14} className="mr-2 inline" /> Add Row</Button>
    </div>
  )
}
