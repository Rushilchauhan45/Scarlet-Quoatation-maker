import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Plus } from 'lucide-react'
import SavedQuotationsPanel from './components/Sidebar'
import StepWizard, { STEP_LABELS } from './components/StepWizard'
import Button from './components/ui/Button'
import { useHistory } from './hooks/useHistory'
import { useQuotation } from './hooks/useQuotation'

function AppShell() {
  const [savedOpen, setSavedOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const { history, saveQuotation, deleteQuotation, renameQuotation, nextQuotationNumber } = useHistory()
  const { step, setStep, quotation, update, resetQuotation, applyTemplateSelection, canGoNext, loadFromHistory } =
    useQuotation(nextQuotationNumber)

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const handleSave = () => {
    const entry = saveQuotation(quotation)
    if (entry?.id && quotation.historyId !== entry.id) {
      update({ historyId: entry.id })
    }
    notify('Quotation saved!')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <SavedQuotationsPanel
        history={history}
        onLoad={(entry) => {
          loadFromHistory({ ...entry.data, historyId: entry.id })
          setSavedOpen(false)
        }}
        onDelete={deleteQuotation}
        onRename={renameQuotation}
        open={savedOpen}
        onClose={() => setSavedOpen(false)}
      />
      <Button
        className="fixed right-6 top-6 z-40 shadow-lg"
        onClick={() => setSavedOpen(true)}
      >
        Saved Quotations
      </Button>

      <main className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur">
          <div className="mx-auto w-full max-w-6xl px-4 py-5 md:px-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Scarlet Quotation Maker</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {STEP_LABELS.map((label, i) => (
                <div
                  key={label}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${step === i + 1 ? 'bg-[#C0392B] text-white' : 'bg-[#E8E8E8] text-[#1A1A1A]'}`}
                >
                  {i + 1}. {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-8">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={resetQuotation}
              aria-label="New quotation"
              title="New Quotation"
              className="mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#C0392B] text-white shadow-lg transition hover:bg-[#922B21]"
            >
              <Plus size={24} />
            </button>
            <div className="min-w-0 flex-1">
              <StepWizard
                step={step}
                setStep={setStep}
                quotation={quotation}
                update={update}
                canGoNext={canGoNext}
                applyTemplateSelection={applyTemplateSelection}
                onSave={handleSave}
                onNotify={notify}
                setGeneratingPdf={setGeneratingPdf}
                generatingPdf={generatingPdf}
                showHeader={false}
              />
            </div>
          </div>
        </div>

        <footer className="border-t border-[#E8E8E8] px-4 py-4 text-center text-sm text-[#1A1A1A]/80 md:px-8">
          © 2026 Scarlet Interior Design | Build By{' '}
          <a
            href="https://www.pixoragraphic.me"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-[#C0392B] underline decoration-[#C0392B]/40 underline-offset-2 transition hover:text-[#922B21] hover:decoration-[#922B21]"
          >
            PIXORA GRAPHICS
          </a>
        </footer>
      </main>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#1A1A1A] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />} />
    </Routes>
  )
}
