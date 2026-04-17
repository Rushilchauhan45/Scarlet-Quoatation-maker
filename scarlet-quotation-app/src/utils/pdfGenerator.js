import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Exact A4 pixel size that matches our QuotationPDF component
const PAGE_PX_W = 794
const PAGE_PX_H = 1123

const sanitizeFileName = (name = 'quotation.pdf') => {
  const base = String(name || 'quotation.pdf')
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
  if (!base) return 'quotation.pdf'
  return base.toLowerCase().endsWith('.pdf') ? base : `${base}.pdf`
}

const waitForRender = () =>
  new Promise((resolve) => {
    // Three animation frames + small delay ensures fonts, layout, images settled
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTimeout(resolve, 80))
      )
    )
  })

const capturePage = async (pageEl) => {
  // Force the element to its exact declared size before capture
  const w = PAGE_PX_W
  const h = PAGE_PX_H

  const canvas = await html2canvas(pageEl, {
    scale: 3,                    // 3× = ~288 DPI — sharp text, no blur on zoom
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    width: w,
    height: h,
    windowWidth: w,
    windowHeight: h,
    scrollX: 0,
    scrollY: 0,
    imageTimeout: 25000,
    logging: false,
    foreignObjectRendering: false,
    onclone: (_doc, el) => {
      // Guarantee background & no shadow in capture clone
      el.style.background    = '#ffffff'
      el.style.boxShadow     = 'none'
      el.style.border        = 'none'
      el.style.margin        = '0'
      el.style.width         = `${w}px`
      el.style.height        = `${h}px`
      el.style.minHeight     = `${h}px`
      el.style.maxHeight     = `${h}px`
      el.style.overflow      = 'hidden'
      el.style.boxSizing     = 'border-box'
    },
  })

  if (!canvas?.width || !canvas?.height) {
    throw new Error('Canvas generation returned empty output')
  }

  return canvas
}

export const generateQuotationPDF = async (containerEl, fileName = 'quotation.pdf') => {
  if (!containerEl) throw new Error('PDF container not found')

  const pageElements = Array.from(containerEl.querySelectorAll('.pdf-export-page'))
  if (!pageElements.length) throw new Error('No PDF pages found for export')

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })

  // A4 in mm
  const mmW = pdf.internal.pageSize.getWidth()   // 210
  const mmH = pdf.internal.pageSize.getHeight()  // 297

  const safeFileName = sanitizeFileName(fileName)

  let hadClass = false
  try {
    hadClass = document.body.classList.contains('pdf-export-mode')
    if (!hadClass) document.body.classList.add('pdf-export-mode')

    // Wait for fonts + layout
    if (document.fonts?.ready) await document.fonts.ready
    await waitForRender()

    for (let i = 0; i < pageElements.length; i++) {
      const canvas  = await capturePage(pageElements[i])
      const imgData = canvas.toDataURL('image/png')        // lossless PNG — no JPEG blur

      if (i > 0) pdf.addPage('a4', 'portrait')

      pdf.addImage(
        imgData,
        'PNG',
        0, 0,         // x, y — fill edge-to-edge
        mmW, mmH,     // width, height in mm
        `p${i}`,      // alias (deduplication key)
        'NONE',       // ← NO compression — keeps full PNG quality
      )
    }

    pdf.save(safeFileName)
  } finally {
    if (!hadClass) document.body.classList.remove('pdf-export-mode')
  }
}