import { useRef } from 'react'
import { Download, Save } from 'lucide-react'
import QuotationPDF from '../pdf/QuotationPDF'
import Button from '../ui/Button'
import { generateQuotationPDF } from '../../utils/pdfGenerator'

export default function Step5PreviewDownload({ quotation, onSave, onNotify, setGeneratingPdf, generatingPdf }) {
  const pdfRef = useRef(null)

  const handleDownload = async () => {
    try {
      setGeneratingPdf(true)
      await generateQuotationPDF(pdfRef.current, `${quotation.clientName || 'quotation'}.pdf`)
      onNotify('PDF Downloaded!')
    } catch (error) {
      console.error('PDF generation failed:', error)
      onNotify('PDF generation failed. Please try again.')
    } finally {
      setGeneratingPdf(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button onClick={onSave}><Save size={14} className="mr-2 inline" /> Save Quotation</Button>
        <Button onClick={handleDownload} variant="secondary"><Download size={14} className="mr-2 inline" /> Download PDF</Button>
      </div>

      {generatingPdf ? <div className="rounded-xl bg-[#1A1A1A]/80 p-3 text-sm font-semibold text-white">Generating PDF...</div> : null}

      <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-3">
        <div ref={pdfRef}>
          <QuotationPDF quotation={quotation} />
        </div>
      </div>
    </div>
  )
}
