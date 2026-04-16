import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function NotesEditor({ notes, onChange }) {
  const update = (index, value) => onChange(notes.map((note, i) => (i === index ? value : note)))
  const remove = (index) => onChange(notes.filter((_, i) => i !== index))
  const add = () => onChange([...notes, ''])

  return (
    <div className="space-y-2">
      {notes.map((note, index) => (
        <div key={`${index}-${note.slice(0, 10)}`} className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
            value={note}
            onChange={(e) => update(index, e.target.value)}
          />
          <button type="button" className="rounded-md p-2 text-[#922B21] hover:bg-[#FAFAFA]" onClick={() => remove(index)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}><Plus size={14} className="mr-2 inline" /> Add Note</Button>
    </div>
  )
}
