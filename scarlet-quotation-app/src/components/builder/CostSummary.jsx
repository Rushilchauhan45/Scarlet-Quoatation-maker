import { useEffect, useMemo, useRef } from 'react'
import { formatIndianCurrency } from '../../utils/formatCurrency'
import { computeFinalAmount, computeSectionsSubtotal, parseNumericInput, roundToRupee } from '../../utils/quotationMath'

const hasPricedRows = (sections = []) =>
  sections.some((section) =>
    (section.items || []).some((item) => {
      const rate = parseNumericInput(item?.pricing?.rate)
      const amount = parseNumericInput(item?.amount)
      return Number.isFinite(rate) || Number.isFinite(amount)
    }),
  )

export default function CostSummary({ sections, marginAmount, onMarginAmountChange, value, onChange }) {
  const onChangeRef = useRef(onChange)
  const manualBaseRef = useRef(null)
  const lastValueRef = useRef(null)
  const lastMarginRef = useRef(null)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const rowBasedSubtotal = useMemo(() => computeSectionsSubtotal(sections), [sections])
  const pricedRows = useMemo(() => hasPricedRows(sections), [sections])
  const numericValue = parseNumericInput(value)
  const numericMargin = parseNumericInput(marginAmount)
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0
  const safeMargin = Number.isFinite(numericMargin) ? numericMargin : 0

  let manualSubtotal = 0
  if (!pricedRows) {
    const prevValue = lastValueRef.current
    const prevMargin = lastMarginRef.current
    const currentBase = manualBaseRef.current

    if (!Number.isFinite(currentBase)) {
      manualBaseRef.current = roundToRupee(safeValue - safeMargin)
    } else if (Number.isFinite(prevValue) && roundToRupee(safeValue) !== roundToRupee(prevValue)) {
      const expected = roundToRupee(currentBase + safeMargin)
      if (roundToRupee(safeValue) !== expected) {
        manualBaseRef.current = roundToRupee(safeValue - safeMargin)
      }
    } else if (!Number.isFinite(prevValue) || !Number.isFinite(prevMargin)) {
      manualBaseRef.current = roundToRupee(safeValue - safeMargin)
    }

    manualSubtotal = Number.isFinite(manualBaseRef.current) ? manualBaseRef.current : 0
  } else {
    manualBaseRef.current = null
  }

  const subtotal = pricedRows ? rowBasedSubtotal : manualSubtotal
  const finalAmount = useMemo(() => computeFinalAmount(subtotal, marginAmount), [subtotal, marginAmount])

  useEffect(() => {
    if (String(value || '') !== String(finalAmount)) {
      onChangeRef.current(String(finalAmount))
    }
  }, [finalAmount, value])

  useEffect(() => {
    lastValueRef.current = safeValue
    lastMarginRef.current = safeMargin
  }, [safeValue, safeMargin])

  return (
    <div className="space-y-4 rounded-2xl border-2 border-[#C0392B] p-4">
      <h4 className="text-base font-bold text-[#1A1A1A]">Final Estimate</h4>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-3 py-2">
          <p className="text-xs font-semibold uppercase text-[#1A1A1A]/70">Subtotal</p>
          <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">{formatIndianCurrency(subtotal)}</p>
        </div>

        <label className="rounded-xl border border-[#E8E8E8] bg-white px-3 py-2">
          <p className="text-xs font-semibold uppercase text-[#1A1A1A]/70">Add Your Margin Amount (₹)</p>
          <input
            value={marginAmount}
            onChange={(e) => onMarginAmountChange(e.target.value)}
            className="mt-1 w-full border-0 p-0 text-lg font-semibold text-[#1A1A1A] focus:outline-none"
            placeholder="0"
          />
        </label>
      </div>

      <div className="rounded-xl bg-[#C0392B] px-4 py-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide">Final Estimated Amount</p>
        <p className="mt-1 text-2xl font-bold">{formatIndianCurrency(finalAmount)}</p>
      </div>
    </div>
  )
}
