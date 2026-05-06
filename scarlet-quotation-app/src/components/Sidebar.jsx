import { useMemo, useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'

export default function SavedQuotationsPanel({ history, onLoad, onDelete, onRename, open, onClose }) {
  const [search, setSearch] = useState('')
  const [bhkFilter, setBhkFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [draftName, setDraftName] = useState('')

  const parseDate = (value) => {
    if (!value) return null
    const normalized = String(value).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      return new Date(`${normalized}T00:00:00`)
    }
    const match = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (match) {
      const [, dd, mm, yyyy] = match
      return new Date(Number(yyyy), Number(mm) - 1, Number(dd))
    }
    const fallback = new Date(normalized)
    return Number.isNaN(fallback.getTime()) ? null : fallback
  }

  const formatDisplayDate = (value) => {
    const parsed = parseDate(value)
    if (!parsed) return value || 'No date'
    return parsed.toLocaleDateString('en-GB')
  }

  const formatPackageLabel = (value) => {
    const raw = String(value || '').trim()
    if (!raw) return 'Package'
    const map = {
      STANDARD: 'Standard',
      PREMIUM: 'Premium',
      LUXURIOUS: 'Luxury',
    }
    return map[raw] || `${raw[0]}${raw.slice(1).toLowerCase()}`
  }

  const formatQuotationTypeLabel = (value) => {
    const raw = String(value || '').trim()
    if (!raw) return 'Type'
    const lowered = raw.toLowerCase()
    if (lowered.includes('turnkey')) return 'Turnkey'
    if (lowered.includes('design')) return 'Designing'
    return raw
  }

  const filteredHistory = useMemo(() => {
    const term = search.trim().toLowerCase()
    const start = parseDate(startDate)
    const end = parseDate(endDate)
    const endOfDay = end ? new Date(end.getTime()) : null
    if (endOfDay) endOfDay.setHours(23, 59, 59, 999)

    return history.filter((item) => {
      const client = String(item.displayName || item.clientName || '').toLowerCase()
      if (term && !client.includes(term)) return false

      if (bhkFilter !== 'ALL') {
        const bhk = item.bhkType || item.data?.bhkType
        const normalizedBhk = String(bhk || '').toUpperCase()
        if (bhkFilter === 'OTHER') {
          if (normalizedBhk === '2BHK' || normalizedBhk === '3BHK' || normalizedBhk === '4BHK') return false
        } else if (normalizedBhk !== bhkFilter) {
          return false
        }
      }

      if (typeFilter !== 'ALL') {
        const quoteType = String(item.quotationType || item.data?.quotationType || '').toLowerCase()
        if (typeFilter === 'TURNKEY' && !quoteType.includes('turnkey')) return false
        if (typeFilter === 'DESIGNING' && !quoteType.includes('designing')) return false
      }

      if (start || endOfDay) {
        const itemDate = parseDate(item.date)
        if (!itemDate) return false
        if (start && itemDate < start) return false
        if (endOfDay && itemDate > endOfDay) return false
      }

      return true
    })
  }, [history, search, bhkFilter, typeFilter, startDate, endDate])

  const startRename = (item) => {
    setEditingId(item.id)
    setDraftName(item.displayName || item.clientName || '')
  }

  const cancelRename = () => {
    setEditingId(null)
    setDraftName('')
  }

  const commitRename = (itemId) => {
    if (!onRename) return
    onRename(itemId, draftName.trim())
    cancelRename()
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[420px] flex-col bg-[#1A1A1A] p-4 text-white shadow-2xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">Saved</p>
            <h2 className="text-lg font-semibold">Saved Quotations</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="mb-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/60">Search Client</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client name"
                className="w-full rounded-lg border border-white/10 bg-white px-3 py-2 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-white/60">BHK Filter</label>
                <select
                  value={bhkFilter}
                  onChange={(e) => setBhkFilter(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                >
                  <option value="ALL">All BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4BHK">4BHK</option>
                  <option value="OTHER">Others</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-white/60">Quotation Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                >
                  <option value="ALL">All Types</option>
                  <option value="TURNKEY">Turnkey</option>
                  <option value="DESIGNING">Designing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-white/60">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white px-2 py-2 text-xs text-[#1A1A1A] focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-white/60">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white px-2 py-2 text-xs text-[#1A1A1A] focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                />
              </div>
            </div>
          </div>

          <p className="mb-3 text-xs uppercase tracking-wider text-white/60">Recent Quotations</p>
          {filteredHistory.length ? (
            <ul className="space-y-2">
              {filteredHistory.map((item) => {
                const displayName = item.displayName || item.clientName || 'Untitled Client'
                const bhkLabel =
                  item.bhkType === 'Other'
                    ? item.data?.otherBhk || 'Other'
                    : item.bhkType || 'Other'
                const packageLabel = formatPackageLabel(item.package || item.data?.packageType)
                const quotationTypeLabel = formatQuotationTypeLabel(item.quotationType || item.data?.quotationType)
                const displayDate = formatDisplayDate(item.date)
                const isEditing = editingId === item.id

                return (
                  <li key={item.id} className="group rounded-lg border border-white/10 p-2 hover:bg-white/5">
                    <div className="flex items-start justify-between gap-2">
                      <button type="button" className="min-w-0 flex-1 text-left" onClick={() => onLoad(item)}>
                        {isEditing ? (
                          <input
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitRename(item.id)
                              if (e.key === 'Escape') cancelRename()
                            }}
                            className="w-full rounded-md border border-white/10 bg-white px-2 py-1 text-sm text-[#1A1A1A] focus:border-[#C0392B] focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                            autoFocus
                          />
                        ) : (
                          <p className="truncate text-sm font-semibold">{displayName}</p>
                        )}
                        <p className="text-xs text-white/70">
                          {bhkLabel} . {packageLabel} . {quotationTypeLabel} - {displayDate}
                        </p>
                      </button>
                      <div className="flex items-center gap-1">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => commitRename(item.id)}
                              className="rounded p-1 text-emerald-200 hover:bg-white/10"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={cancelRename}
                              className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startRename(item)}
                            className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="mt-1 hidden rounded p-1 text-white/70 hover:bg-white/10 hover:text-white group-hover:inline-flex"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
              No quotations match the current search or filters.
            </p>
          )}
        </div>

      </aside>
    </>
  )
}
