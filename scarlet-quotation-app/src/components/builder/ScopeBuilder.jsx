import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function ScopeBuilder({ sections, onChange }) {
  const updateSection = (id, patch) => {
    onChange(sections.map((section) => (section.id === id ? { ...section, ...patch } : section)))
  }

  const addSection = () => {
    onChange([
      ...sections,
      {
        id: crypto.randomUUID(),
        name: 'NEW SECTION',
        items: [{ id: crypto.randomUUID(), text: '' }],
      },
    ])
  }

  const removeSection = (id) => onChange(sections.filter((section) => section.id !== id))

  const addItem = (sectionId) => {
    onChange(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, { id: crypto.randomUUID(), text: '' }] }
          : section,
      ),
    )
  }

  const removeItem = (sectionId, itemId) => {
    onChange(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
          : section,
      ),
    )
  }

  const updateItemText = (sectionId, itemId, text) => {
    onChange(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, text } : item)),
            }
          : section,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="rounded-2xl border border-[#E8E8E8] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <input
              value={section.name}
              onChange={(e) => updateSection(section.id, { name: e.target.value })}
              className="flex-1 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm font-semibold"
            />
            <button type="button" onClick={() => removeSection(section.id)} className="rounded-md p-2 text-[#922B21] hover:bg-[#FAFAFA]">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="space-y-2">
            {section.items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <span className="w-9 rounded bg-[#E8E8E8] px-2 py-1 text-center text-xs text-[#1A1A1A]">{index + 1}</span>
                <input
                  value={item.text}
                  onChange={(e) => updateItemText(section.id, item.id, e.target.value)}
                  className="flex-1 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                  placeholder="Item description"
                />
                <button type="button" onClick={() => removeItem(section.id, item.id)} className="rounded-md p-2 text-[#922B21] hover:bg-[#FAFAFA]">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <Button variant="secondary" className="mt-3" onClick={() => addItem(section.id)}>
            <Plus size={14} className="mr-2 inline" /> Add Item
          </Button>
        </div>
      ))}

      <Button variant="secondary" onClick={addSection}>
        <Plus size={14} className="mr-2 inline" /> Add Section
      </Button>
    </div>
  )
}
