import { useEffect } from 'react'
import CostSummary from '../builder/CostSummary'
import MaterialTable from '../builder/MaterialTable'
import NotesEditor from '../builder/NotesEditor'
import PaymentSchedule from '../builder/PaymentSchedule'
import ScopeBuilder from '../builder/ScopeBuilder'
import Card from '../ui/Card'

export default function Step4BuildQuotation({ quotation, update, applyTemplateSelection }) {
  const setBuildMode = (mode) => {
    update({ buildMode: mode })
    if (mode === 'template') applyTemplateSelection()
  }

  useEffect(() => {
    if (quotation.buildMode === 'template') {
      applyTemplateSelection()
    }
  }, [quotation.bhkType, quotation.packageType, quotation.quotationType])

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2">
        <Card selected={quotation.buildMode === 'template'} onClick={() => setBuildMode('template')}>
          <p className="text-lg font-semibold">📝 Edit Pre-built Format</p>
        </Card>
        <Card selected={quotation.buildMode === 'scratch'} onClick={() => setBuildMode('scratch')}>
          <p className="text-lg font-semibold">✏️ Build from Scratch</p>
        </Card>
      </div>

      {quotation.buildMode ? (
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold">Intro Text</label>
            <textarea
              className="h-24 w-full rounded-xl border border-[#E8E8E8] px-3 py-2"
              value={quotation.introText}
              onChange={(e) => update({ introText: e.target.value })}
            />
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold">Scope of Work</h4>
            <ScopeBuilder sections={quotation.sections} onChange={(sections) => update({ sections })} />
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold">Material Specification</h4>
            <MaterialTable rows={quotation.materialSpec} onChange={(materialSpec) => update({ materialSpec })} />
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold">Notes</h4>
            <NotesEditor notes={quotation.notes} onChange={(notes) => update({ notes })} />
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold">Payment Schedule</h4>
            <PaymentSchedule rows={quotation.paymentSchedule} onChange={(paymentSchedule) => update({ paymentSchedule })} />
          </div>

          <CostSummary value={quotation.estimatedCost} onChange={(estimatedCost) => update({ estimatedCost })} />
        </div>
      ) : null}
    </div>
  )
}
