import { GripVertical, Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function NotesEditor({ notes, onChange }) {
  const update = (index, value) => onChange(notes.map((note, i) => (i === index ? value : note)))
  const remove = (index) => onChange(notes.filter((_, i) => i !== index))
  const add = () => onChange([...notes, ''])
  const reorder = (sourceIndex, targetIndex) => {
    if (sourceIndex === targetIndex) return
    if (sourceIndex < 0 || sourceIndex >= notes.length || targetIndex < 0 || targetIndex >= notes.length) return

    const nextNotes = [...notes]
    const [moved] = nextNotes.splice(sourceIndex, 1)
    nextNotes.splice(targetIndex, 0, moved)
    onChange(nextNotes)
  }

  return (
    <div className="space-y-2">
      {notes.map((note, index) => (
        <div
          key={`${index}-${note.slice(0, 10)}`}
          className="flex gap-2"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            reorder(Number(event.dataTransfer.getData('text/note-index')), index)
          }}
        >
          <button
            type="button"
            className="cursor-grab rounded-md border border-[#E8E8E8] p-2 text-[#1A1A1A] hover:bg-[#FAFAFA] active:cursor-grabbing"
            title="Drag to reorder note"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = 'move'
              event.dataTransfer.setData('text/note-index', String(index))
            }}
          >
            <GripVertical size={16} />
          </button>
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
