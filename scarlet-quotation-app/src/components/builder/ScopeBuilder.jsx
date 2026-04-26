import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import { computeItemAutoAmount, parseNumericInput } from '../../utils/quotationMath'

const createBlankItem = () => ({
  id: crypto.randomUUID(),
  text: '',
  paramLabel: 'quantity',
  paramValue: '',
  amount: '',
  pricing: null,
  usesGlobalSqft: false,
  hideInPdf: false,
  isSubTitle: false,
  manualAmount: true,
})

const normalizeItem = (item) => {
  if (typeof item === 'string') {
    return {
      ...createBlankItem(),
      text: item,
    }
  }

  const normalized = {
    ...createBlankItem(),
    ...(item || {}),
    text: item?.text || item?.name || '',
    paramLabel: item?.paramLabel || 'quantity',
    paramValue: item?.paramValue ?? '',
  }

  const hasPricing = Number.isFinite(parseNumericInput(normalized?.pricing?.rate))
  if (hasPricing && !normalized.manualAmount) {
    const autoAmount = computeItemAutoAmount(normalized)
    if (autoAmount !== null) normalized.amount = String(autoAmount)
  }

  return normalized
}

const normalizeSection = (section) => ({
  ...section,
  items: (section.items || []).map(normalizeItem),
})

export default function ScopeBuilder({ sections, onChange }) {
  const safeSections = (sections || []).map(normalizeSection)

  const updateSection = (id, patch) => {
    onChange(safeSections.map((section) => (section.id === id ? { ...section, ...patch } : section)))
  }

  const addSection = () => {
    onChange([
      ...safeSections,
      {
        id: crypto.randomUUID(),
        name: 'NEW SECTION',
        items: [createBlankItem()],
      },
    ])
  }

  const removeSection = (id) => onChange(safeSections.filter((section) => section.id !== id))

  const addItem = (sectionId) => {
    onChange(
      safeSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, createBlankItem()] }
          : section,
      ),
    )
  }

  const removeItem = (sectionId, itemId) => {
    onChange(
      safeSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
          : section,
      ),
    )
  }

  const updateItem = (sectionId, itemId, updater) => {
    onChange(
      safeSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? updater(item) : item)),
            }
          : section,
      ),
    )
  }

  const updateItemText = (sectionId, itemId, text) => {
    updateItem(sectionId, itemId, (item) => ({ ...item, text }))
  }

  const updateParameterLabel = (sectionId, itemId, paramLabel) => {
    updateItem(sectionId, itemId, (item) => ({ ...item, paramLabel }))
  }

  const updateParameterValue = (sectionId, itemId, paramValue) => {
    updateItem(sectionId, itemId, (item) => {
      const hasPricing = Number.isFinite(parseNumericInput(item?.pricing?.rate))
      const isCustom = String(paramValue).trim().toLowerCase() === 'custom'

      if (!hasPricing) {
        return { ...item, paramValue }
      }

      if (isCustom) {
        return {
          ...item,
          paramValue: 'custom',
          manualAmount: true,
        }
      }

      const autoAmount = computeItemAutoAmount(item, paramValue)
      if (autoAmount === null) {
        return { ...item, paramValue }
      }

      return {
        ...item,
        paramValue,
        amount: String(autoAmount),
        manualAmount: false,
      }
    })
  }

  const updateRate = (sectionId, itemId, rate) => {
    updateItem(sectionId, itemId, (item) => {
      const nextItem = {
        ...item,
        pricing: {
          ...(item.pricing || {}),
          rate,
        },
      }

      const autoAmount = computeItemAutoAmount(nextItem)
      if (autoAmount === null) {
        return nextItem
      }

      return {
        ...nextItem,
        amount: String(autoAmount),
        manualAmount: false,
      }
    })
  }

  const updateAmount = (sectionId, itemId, amount) => {
    updateItem(sectionId, itemId, (item) => {
      const hasPricing = Number.isFinite(parseNumericInput(item?.pricing?.rate))
      if (!hasPricing) {
        return { ...item, amount, manualAmount: true }
      }

      return {
        ...item,
        amount,
        paramValue: 'custom',
        manualAmount: true,
      }
    })
  }

  return (
    <div className="space-y-4">
      {safeSections.map((section) => (
        <div key={section.id} className="rounded-2xl border border-[#E8E8E8] bg-white p-4">
          {(() => {
            const hasRateColumn = section.items.some((item) => item?.pricing && !item.hideInPdf)
            const gridClass = hasRateColumn
              ? 'grid grid-cols-1 gap-2 rounded-xl border border-[#E8E8E8] p-2 md:grid-cols-[40px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_44px] md:items-center md:border-0 md:p-0'
              : 'grid grid-cols-1 gap-2 rounded-xl border border-[#E8E8E8] p-2 md:grid-cols-[40px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_44px] md:items-center md:border-0 md:p-0'

            return (
              <>
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

          <div
            className={`mb-2 hidden gap-2 px-1 text-xs font-semibold uppercase text-[#1A1A1A]/70 md:grid ${hasRateColumn ? 'grid-cols-[40px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_44px]' : 'grid-cols-[40px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_44px]'}`}
          >
            <span>#</span>
            <span>Item Name</span>
            <span>Parameter Label</span>
            <span>Param Value</span>
            {hasRateColumn ? <span>Rate</span> : null}
            <span>Amount</span>
            <span />
          </div>

          <div className="space-y-2">
            {section.items.filter((item) => !item.hideInPdf).map((item, index) => (
              <div key={item.id} className={gridClass}>
                <span className="w-9 rounded bg-[#E8E8E8] px-2 py-1 text-center text-xs text-[#1A1A1A]">{index + 1}</span>
                <input
                  value={item.text}
                  onChange={(e) => updateItemText(section.id, item.id, e.target.value)}
                  className="flex-1 rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                  placeholder="Item name"
                />
                <input
                  value={item.paramLabel}
                  onChange={(e) => updateParameterLabel(section.id, item.id, e.target.value)}
                  className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                  placeholder="feet / qty / sqft"
                />
                <input
                  value={item.paramValue}
                  onChange={(e) => updateParameterValue(section.id, item.id, e.target.value)}
                  className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                  placeholder="Parameter value"
                />
                {hasRateColumn ? (
                  item?.pricing ? (
                    <input
                      value={item?.pricing?.rate ?? ''}
                      onChange={(e) => updateRate(section.id, item.id, e.target.value)}
                      className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                      placeholder="Rate"
                    />
                  ) : (
                    <span className="rounded-lg border border-dashed border-[#E8E8E8] px-3 py-2 text-sm text-[#1A1A1A]/50">
                      —
                    </span>
                  )
                ) : null}
                <input
                  value={item.amount}
                  onChange={(e) => updateAmount(section.id, item.id, e.target.value)}
                  className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                  placeholder="Amount"
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
              </>
            )
          })()}
        </div>
      ))}

      <Button variant="secondary" onClick={addSection}>
        <Plus size={14} className="mr-2 inline" /> Add Section
      </Button>
    </div>
  )
}
