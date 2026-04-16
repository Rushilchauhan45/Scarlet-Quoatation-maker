import { useMemo, useState } from 'react'
import { defaultNotes, getTemplateKey, paymentSchedules, templates } from '../data/templates'

const todayISO = new Date().toISOString().split('T')[0]

const toEditableSections = (sections = []) =>
  sections.map((section, sIndex) => ({
    id: crypto.randomUUID(),
    name: section.name || `SECTION ${sIndex + 1}`,
    items: (section.items || []).map((item) => ({
      id: crypto.randomUUID(),
      text: item,
    })),
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
  estimatedCost: '',
}

export const useQuotation = (quotationNumberFactory) => {
  const [step, setStep] = useState(1)
  const [quotation, setQuotation] = useState(() => ({
    ...defaultState,
    quotationNumber: quotationNumberFactory(),
  }))

  const update = (patch) => setQuotation((prev) => ({ ...prev, ...patch }))

  const resetQuotation = () => {
    setQuotation({
      ...defaultState,
      quotationNumber: quotationNumberFactory(),
    })
    setStep(1)
  }

  const applyTemplateSelection = () => {
    const key = getTemplateKey(quotation)
    const tpl = templates[key]
    if (!tpl) return false

    setQuotation((prev) => ({
      ...prev,
      introText: tpl.introText,
      sections: toEditableSections(tpl.sections),
      materialSpec: toEditableRows(tpl.materialSpec),
      notes: [...(tpl.notes?.length ? tpl.notes : defaultNotes)],
      paymentSchedule: paymentSchedules[tpl.paymentSchedule].map((x) => ({ ...x, id: crypto.randomUUID() })),
      estimatedCost: tpl.estimatedCost,
    }))
    return true
  }

  const loadFromHistory = (entryData) => {
    setQuotation(entryData)
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
      return Boolean(quotation.packageType || quotation.quotationType === 'Only Designing (3D Visualization)')
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
