import { useMemo, useState } from 'react'

const HISTORY_KEY = 'scarlet_quotations'
const COUNTER_KEY = 'scarlet_quote_counter'

const readHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useHistory = () => {
  const [history, setHistory] = useState(readHistory)

  const persist = (next) => {
    setHistory(next)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  }

  const saveQuotation = (quotation) => {
    const existingId = quotation?.historyId
    const id = existingId || crypto.randomUUID()
    const entry = {
      id,
      clientName: quotation.clientName,
      bhkType: quotation.bhkType,
      package: quotation.packageType,
      date: quotation.date,
      quotationType: quotation.quotationType,
      data: { ...quotation, historyId: id },
    }

    const hasMatch = Boolean(existingId && history.some((item) => item.id === existingId))
    const next = hasMatch
      ? history.map((item) => (item.id === existingId ? entry : item))
      : [...history, entry]
    persist(next)
    return entry
  }

  const deleteQuotation = (id) => {
    const next = history.filter((item) => item.id !== id)
    persist(next)
  }

  const nextQuotationNumber = useMemo(() => {
    return () => {
      const current = Number(localStorage.getItem(COUNTER_KEY) || 0) + 1
      localStorage.setItem(COUNTER_KEY, String(current))
      const year = new Date().getFullYear()
      return `SCR-${year}-${String(current).padStart(3, '0')}`
    }
  }, [])

  return { history, saveQuotation, deleteQuotation, nextQuotationNumber }
}
