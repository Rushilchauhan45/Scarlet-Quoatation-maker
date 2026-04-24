import { useCallback, useMemo, useState } from 'react'
import { defaultNotes, getTemplateKey, paymentSchedules, templates } from '../data/templates'
import { normalizePackageForFlow } from '../data/quotationFlow'
import { computeItemAutoAmount, parseNumericInput } from '../utils/quotationMath'

const todayISO = new Date().toISOString().split('T')[0]

const toEditableSections = (sections = []) =>
  sections.map((section, sIndex) => ({
    id: crypto.randomUUID(),
    name: section.name || `SECTION ${sIndex + 1}`,
    items: (section.items || []).map((item) => {
      if (typeof item === 'string') {
        return {
          id: crypto.randomUUID(),
          text: item,
          paramLabel: 'quantity',
          paramValue: '',
          amount: '',
          pricing: null,
          usesGlobalSqft: false,
          hideInPdf: false,
          isSubTitle: false,
          manualAmount: true,
        }
      }

      const normalized = {
        id: crypto.randomUUID(),
        text: item?.text || item?.name || '',
        paramLabel: item?.paramLabel || 'quantity',
        paramValue: item?.paramValue ?? '',
        amount: item?.amount ?? '',
        pricing: item?.pricing || null,
        usesGlobalSqft: Boolean(item?.usesGlobalSqft),
        hideInPdf: Boolean(item?.hideInPdf),
        isSubTitle: Boolean(item?.isSubTitle),
        manualAmount: typeof item?.manualAmount === 'boolean' ? item.manualAmount : false,
      }

      const hasPricing = Number.isFinite(parseNumericInput(normalized?.pricing?.rate))
      if (hasPricing && !normalized.manualAmount) {
        const autoAmount = computeItemAutoAmount(normalized)
        if (autoAmount !== null) normalized.amount = String(autoAmount)
      }

      return normalized
    }),
  }))

const toEditableRows = (rows = []) =>
  rows.map((row) => ({
    id: crypto.randomUUID(),
    material: row.material || '',
    specification: row.specification || '',
    clarity: row.clarity || '',
  }))

const defaultState = {
  clientName: '',
  address: '',
  contactNumber: '',
  gstNumber: '',
  date: todayISO,
  quotationNumber: '',
  bhkType: '',
  otherBhk: '',
  quotationType: '',
  packageType: '',
  buildMode: '',
  introText:
    'Thank you for your inquiry. With reference to our recent discussion, we are pleased to share our interior package quotation...',
  sections: [],
  materialSpec: [],
  notes: [...defaultNotes],
  paymentSchedule: paymentSchedules['turnkey-6stage'].map((x) => ({ ...x, id: crypto.randomUUID() })),
  marginAmount: '0',
  estimatedCost: '',
}

export const useQuotation = (quotationNumberFactory) => {
  const [step, setStep] = useState(1)
  const [quotation, setQuotation] = useState(() => ({
    ...defaultState,
    quotationNumber: quotationNumberFactory(),
  }))

  const update = (patch) =>
    setQuotation((prev) => {
      const next = { ...prev, ...patch }
      if (
        Object.prototype.hasOwnProperty.call(patch, 'bhkType') ||
        Object.prototype.hasOwnProperty.call(patch, 'packageType')
      ) {
        next.packageType = normalizePackageForFlow(next.bhkType, next.packageType)
      }
      return next
    })

  const resetQuotation = () => {
    setQuotation({
      ...defaultState,
      quotationNumber: quotationNumberFactory(),
    })
    setStep(1)
  }

  const applyTemplateSelection = useCallback(() => {
    let applied = false

    setQuotation((prev) => {
      const key = getTemplateKey(prev)
      const fallbackKey = getTemplateKey({ ...prev, packageType: 'STANDARD' })
      const tpl = templates[key] || templates[fallbackKey]
      if (!tpl) return prev

      applied = true
      const editableSections = toEditableSections(tpl.sections)
      return {
        ...prev,
        introText: tpl.introText,
        sections: editableSections,
        materialSpec: toEditableRows(tpl.materialSpec),
        notes: [...(tpl.notes?.length ? tpl.notes : defaultNotes)],
        paymentSchedule: paymentSchedules[tpl.paymentSchedule].map((x) => ({ ...x, id: crypto.randomUUID() })),
        estimatedCost: tpl.estimatedCost,
      }
    })

    return applied
  }, [])

  const loadFromHistory = (entryData) => {
    const safeSections = toEditableSections(entryData.sections || [])

    setQuotation({
      ...entryData,
      packageType: normalizePackageForFlow(entryData.bhkType, entryData.packageType),
      sections: safeSections,
      marginAmount: entryData.marginAmount ?? entryData.marginPercent ?? '0',
    })
    setStep(5)
  }

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return Boolean(quotation.clientName && quotation.address && quotation.contactNumber)
    }
    if (step === 2) {
      return Boolean(quotation.bhkType && quotation.quotationType)
    }
    if (step === 3) {
      return Boolean(quotation.packageType)
    }
    if (step === 4) {
      return Boolean(quotation.buildMode)
    }
    return true
  }, [quotation, step])

  return {
    step,
    setStep,
    quotation,
    update,
    resetQuotation,
    applyTemplateSelection,
    canGoNext,
    loadFromHistory,
    setQuotation,
  }
}
