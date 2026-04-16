export const formatIndianCurrency = (value) => {
  if (value === null || value === undefined) return '₹0/-'
  const numeric = String(value).replace(/[^\d]/g, '')
  if (!numeric) return '₹0/-'
  const number = Number(numeric)
  return `₹${number.toLocaleString('en-IN')}/-`
}

export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB')
}
