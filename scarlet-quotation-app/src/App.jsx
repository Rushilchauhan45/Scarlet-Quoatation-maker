import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import StepWizard from './components/StepWizard'
import { useHistory } from './hooks/useHistory'
import { useQuotation } from './hooks/useQuotation'

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const { history, saveQuotation, deleteQuotation, nextQuotationNumber } = useHistory()
  const { step, setStep, quotation, update, resetQuotation, applyTemplateSelection, canGoNext, loadFromHistory } =
    useQuotation(nextQuotationNumber)

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const handleSave = () => {
    saveQuotation(quotation)
    notify('Quotation saved!')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <Sidebar
        history={history}
        onNew={resetQuotation}
        onLoad={(entry) => {
          loadFromHistory(entry.data)
          setMobileOpen(false)
        }}
        onDelete={deleteQuotation}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex min-h-screen flex-col md:ml-[300px]">
        <div className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-8">
          <h1 className="mb-5 text-2xl font-bold text-[#1A1A1A]">Scarlet Quotation Maker</h1>
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
          />
        </div>

        <footer className="border-t border-[#E8E8E8] px-4 py-4 text-center text-sm text-[#1A1A1A]/80 md:px-8">
          © 2026 Scarlet Interior Design | Made by Rushil Chauhan
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
