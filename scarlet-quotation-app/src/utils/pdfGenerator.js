import { createElement } from 'react'
import { pdf } from '@react-pdf/renderer'
import { QuotationPDFDocument } from '../components/pdf/QuotationPDFDocument'

const loadImageBase64 = async (path) => {
  try {
    const response = await fetch(path)
    if (!response.ok) return null
    const blob = await response.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export const generateQuotationPDF = async (quotation, fileName = 'quotation.pdf') => {
  if (!quotation) throw new Error('Quotation data is required for PDF generation')

  const [headerImageBase64, footerImageBase64] = await Promise.all([
    loadImageBase64('/Header.png'),
    loadImageBase64('/Footer.png'),
  ])

  const blob = await pdf(
    createElement(QuotationPDFDocument, {
      quotation,
      headerImageBase64,
      footerImageBase64,
    }),
  ).toBlob()

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
