export const parseNumericInput = (value) => {
  if (value === null || value === undefined) return NaN
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN

  const cleaned = String(value).replace(/,/g, '').trim()
  if (!cleaned) return NaN

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : NaN
}

export const roundToRupee = (value) => Math.round(value)

export const computeItemAutoAmount = (item, paramOverride) => {
  const rate = parseNumericInput(item?.pricing?.rate)
  const parameter = parseNumericInput(paramOverride ?? item?.paramValue)

  if (!Number.isFinite(rate) || !Number.isFinite(parameter)) return null
  return roundToRupee(rate * parameter)
}

export const computeItemAmount = (item) => {
  if (!item) return 0

  if (!item.manualAmount) {
    const autoAmount = computeItemAutoAmount(item)
    if (autoAmount !== null) return autoAmount
  }

  const manual = parseNumericInput(item.amount)
  if (!Number.isFinite(manual)) return 0
  return roundToRupee(manual)
}

export const computeSectionsSubtotal = (sections = []) =>
  sections.reduce((total, section) => {
    const sectionTotal = (section.items || []).reduce((sum, item) => sum + computeItemAmount(item), 0)
    return total + sectionTotal
  }, 0)

export const computeFinalAmount = (subtotal, marginAmount) => {
  const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0
  const margin = parseNumericInput(marginAmount)
  const safeMargin = Number.isFinite(margin) ? margin : 0
  return roundToRupee(safeSubtotal + safeMargin)
}
