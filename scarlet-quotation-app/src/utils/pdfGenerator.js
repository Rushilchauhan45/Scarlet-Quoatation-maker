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
    // Four animation frames + slightly longer delay ensures
    // base64 logo, fonts, layout all settled before capture
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTimeout(resolve, 150))
        )
      )
    )
  })

const capturePage = async (pageEl) => {
  const w = PAGE_PX_W
  const h = PAGE_PX_H

  const canvas = await html2canvas(pageEl, {
    scale: 3,                    // 3× = ~288 DPI — sharp text
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

      // ─── Ensure all images inside clone are fully loaded ─────────────────
      const images = el.querySelectorAll('img')
      images.forEach((img) => {
        // If image is already a base64 data URL, nothing to do
        if (img.src && img.src.startsWith('data:')) return
        // Otherwise force crossorigin so html2canvas can read it
        img.crossOrigin = 'anonymous'
      })
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

  const mmW = pdf.internal.pageSize.getWidth()   // 210
  const mmH = pdf.internal.pageSize.getHeight()  // 297

  const safeFileName = sanitizeFileName(fileName)

  let hadClass = false
  try {
    hadClass = document.body.classList.contains('pdf-export-mode')
    if (!hadClass) document.body.classList.add('pdf-export-mode')

    // Wait for fonts + layout + base64 logo to be fully painted
    if (document.fonts?.ready) await document.fonts.ready
    await waitForRender()

    for (let i = 0; i < pageElements.length; i++) {
      const canvas  = await capturePage(pageElements[i])
      const imgData = canvas.toDataURL('image/png')

      if (i > 0) pdf.addPage('a4', 'portrait')

      pdf.addImage(
        imgData,
        'PNG',
        0, 0,
        mmW, mmH,
        `p${i}`,
        'NONE',
      )
    }

    pdf.save(safeFileName)
  } finally {
    if (!hadClass) document.body.classList.remove('pdf-export-mode')
  }
}