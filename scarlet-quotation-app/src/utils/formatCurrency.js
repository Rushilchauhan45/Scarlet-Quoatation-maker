import { parseNumericInput, roundToRupee } from './quotationMath'

export const formatIndianCurrency = (value) => {
  if (value === null || value === undefined) return '₹0/-'
  const numeric = parseNumericInput(value)
  if (!Number.isFinite(numeric)) return '₹0/-'
  return `₹${roundToRupee(numeric).toLocaleString('en-IN')}/-`
}

export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB')
}
