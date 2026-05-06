import Button from './ui/Button'
import Step1ClientDetails from './steps/Step1ClientDetails'
import Step2ProjectType from './steps/Step2ProjectType'
import Step3Package from './steps/Step3Package'
import Step4BuildQuotation from './steps/Step4BuildQuotation'
import Step5PreviewDownload from './steps/Step5PreviewDownload'

export const STEP_LABELS = ['Client Details', 'Project Type', 'Package', 'Build Quotation', 'Save & Download']

export default function StepWizard({
  step,
  setStep,
  quotation,
  update,
  canGoNext,
  applyTemplateSelection,
  onSave,
  onNotify,
  setGeneratingPdf,
  generatingPdf,
  showHeader = true,
}) {
  return (
    <div className="space-y-6">
      {showHeader ? (
        <div className="flex flex-wrap gap-2">
          {STEP_LABELS.map((label, i) => (
            <div
              key={label}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${step === i + 1 ? 'bg-[#C0392B] text-white' : 'bg-[#E8E8E8] text-[#1A1A1A]'}`}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5">
        {step === 1 && <Step1ClientDetails quotation={quotation} update={update} />}
        {step === 2 && <Step2ProjectType quotation={quotation} update={update} />}
        {step === 3 && <Step3Package quotation={quotation} update={update} />}
        {step === 4 && (
          <Step4BuildQuotation quotation={quotation} update={update} applyTemplateSelection={applyTemplateSelection} />
        )}
        {step === 5 && (
          <Step5PreviewDownload
            quotation={quotation}
            onSave={onSave}
            onNotify={onNotify}
            setGeneratingPdf={setGeneratingPdf}
            generatingPdf={generatingPdf}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>Previous</Button>
        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))} disabled={!canGoNext}>Next</Button>
        ) : null}
      </div>
    </div>
  )
}
