import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const sanitizeFileName = (name = 'quotation.pdf') => {
  const base = String(name || 'quotation.pdf')
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
  if (!base) return 'quotation.pdf'
  return base.toLowerCase().endsWith('.pdf') ? base : `${base}.pdf`
}

const waitForNextPaint = () =>
  new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      setTimeout(resolve, 16)
      return
    }
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))
  })

const hasInvalidLuminance = (canvas) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return false

  const sampleWidth = Math.min(180, canvas.width)
  const sampleHeight = Math.min(180, canvas.height)
  const offsetX = Math.max(0, Math.floor((canvas.width - sampleWidth) / 2))
  const offsetY = Math.max(0, Math.floor((canvas.height - sampleHeight) / 2))
  const { data } = ctx.getImageData(offsetX, offsetY, sampleWidth, sampleHeight)

  let sumLum = 0
  let blackCount = 0
  let whiteCount = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 8) continue

    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    sumLum += lum
    if (lum <= 8) blackCount += 1
    if (lum >= 247) whiteCount += 1
  }

  const total = data.length / 4
  if (!total) return false
  const avgLum = sumLum / total
  const blackRatio = blackCount / total
  const whiteRatio = whiteCount / total

  return avgLum < 18 || blackRatio > 0.88 || whiteRatio > 0.985
}

const capturePageCanvas = async (pageEl, scaleHint) => {
  const width = Math.max(pageEl.scrollWidth, Math.ceil(pageEl.getBoundingClientRect().width))
  const height = Math.max(pageEl.scrollHeight, Math.ceil(pageEl.getBoundingClientRect().height))

  if (width < 100 || height < 100) {
    throw new Error('Invalid page size for PDF capture')
  }

  const attempts = [
    { scale: scaleHint, foreignObjectRendering: false },
    { scale: Math.max(2.15, scaleHint - 0.35), foreignObjectRendering: false },
    { scale: Math.max(1.8, scaleHint - 0.65), foreignObjectRendering: true },
  ]

  let lastError = null
  for (const attempt of attempts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const canvas = await html2canvas(pageEl, {
        scale: attempt.scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        windowWidth: width,
        windowHeight: height,
        imageTimeout: 20000,
        logging: false,
        foreignObjectRendering: attempt.foreignObjectRendering,
      })
      if (!canvas?.width || !canvas?.height) throw new Error('Canvas generation returned empty output')
      if (hasInvalidLuminance(canvas)) throw new Error('Captured canvas appears invalid (black/white)')
      return canvas
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('Failed to capture PDF page')
}

export const generateQuotationPDF = async (containerEl, fileName = 'quotation.pdf') => {
  if (!containerEl) throw new Error('PDF container not found')
  const pageElements = Array.from(containerEl.querySelectorAll('.pdf-export-page'))
  if (!pageElements.length) throw new Error('No PDF pages available for export')

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const deviceScale = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const exportScale = Math.max(2.1, Math.min(2.8, deviceScale * 1.75))
  const safeFileName = sanitizeFileName(fileName)

  let hadExportClass = false
  try {
    hadExportClass = document.body.classList.contains('pdf-export-mode')
    if (!hadExportClass) document.body.classList.add('pdf-export-mode')

    if (document.fonts?.ready) {
      await document.fonts.ready
    }
    await waitForNextPaint()

    for (let i = 0; i < pageElements.length; i += 1) {
      const pageEl = pageElements[i]
      // eslint-disable-next-line no-await-in-loop
      const canvas = await capturePageCanvas(pageEl, exportScale)

      const imgData = canvas.toDataURL('image/png', 1)
      if (i > 0) pdf.addPage('a4', 'portrait')
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')
    }

    pdf.save(safeFileName)
  } finally {
    if (!hadExportClass) document.body.classList.remove('pdf-export-mode')
  }
}
