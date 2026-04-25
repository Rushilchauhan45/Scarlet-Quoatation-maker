import { Globe, Instagram } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatDateDDMMYYYY, formatIndianCurrency } from '../../utils/formatCurrency'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const R = {
  red:      '#C0392B',
  darkRed:  '#922B21',
  black:    '#1A1A1A',
  offWhite: '#FAFAFA',
  gray:     '#E8E8E8',
}

// ─── Exact A4 pixel dimensions @ 96 DPI ──────────────────────────────────────
const PAGE_W   = 794
const PAGE_H   = 1123
const PAD_X    = 48
const PAD_TOP  = 44
const PAD_BOT  = 32

// Estimated heights of fixed chrome (px)
const HEADER_H   = 108
const CLIENT_H   = 90
const FOOTER_H   = 128
const PAGENO_H   = 22

const CONTENT_FIRST = PAGE_H - PAD_TOP - PAD_BOT - HEADER_H - CLIENT_H - PAGENO_H
const CONTENT_MID   = PAGE_H - PAD_TOP - PAD_BOT - PAGENO_H
// Reserve extra 20px buffer so footer never gets pushed to bottom
const CONTENT_LAST  = PAGE_H - PAD_TOP - PAD_BOT - FOOTER_H - PAGENO_H - 20

// ─── Helpers ──────────────────────────────────────────────────────────────────
const chunk = (arr = [], n) => {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

// Smart chunk: subtitles always stay with the item(s) that follow them
const smartChunk = (items = [], maxRows) => {
  const pages = []
  let current = []
  let count = 0  // only count non-subtitle rows against the limit

  items.forEach((item, i) => {
    const isSubTitle = item.isSubTitle

    if (!isSubTitle && count >= maxRows) {
      // Before flushing, if the last item in current is a subtitle, move it to next page
      // so subtitle is never orphaned at end of a chunk
      if (current.length > 0 && current[current.length - 1].isSubTitle) {
        const orphanedSubtitle = current.pop()
        pages.push(current)
        current = [orphanedSubtitle, item]
      } else {
        pages.push(current)
        current = [item]
      }
      count = 1
    } else {
      current.push(item)
      if (!isSubTitle) count++
    }
  })

  if (current.length) pages.push(current)
  return pages
}

// ─── Height estimators (conservative) ────────────────────────────────────────
const ROW_H       = 42    // slightly taller to avoid cutting
const HEADER_ROW  = 32
const TITLE_H     = 38
const DESC_BAR    = 32

const SUBTITLE_H  = 34    // height of a subtitle/category row

const blockH = (b) => {
  switch (b.type) {
    case 'intro':    return TITLE_H + 16 + Math.ceil((b.introText?.length || 0) / 88) * 21 + 16
    case 'scope': {
      const regularRows = b.items.filter(x => !x.isSubTitle).length
      const subTitleRows = b.items.filter(x => x.isSubTitle).length
      return TITLE_H + DESC_BAR + regularRows * ROW_H + subTitleRows * SUBTITLE_H + 24
    }
    case 'material': return TITLE_H + HEADER_ROW + b.rows.length * (ROW_H + 8) + 16
    case 'notes':    return TITLE_H + b.notes.length * 23 + 16
    case 'payment':  return TITLE_H + b.rows.length * 23 + 16
    case 'total':    return 52
    default:         return 40
  }
}

// ─── Build blocks ─────────────────────────────────────────────────────────────
const buildBlocks = (q) => {
  const blocks = []

  if ((q.introText || '').trim()) {
    blocks.push({
      type: 'intro', key: 'intro',
      title: q.quotationType === 'Only Designing (3D Visualization)'
        ? 'Quotation For Interior Designing'
        : `Quotation For ${q.bhkType || 'Project'} Interior Design`,
      introText: q.introText.trim(),
    })
  }

  ;(q.sections || []).forEach((sec) => {
    const visibleItems = (sec.items || []).filter((item) => !item?.hideInPdf)
    if (!visibleItems.length) return

    // Smart chunks — subtitles always stay with following items, max 10 rows per block
    smartChunk(visibleItems, 10).forEach((items, idx) => {
      blocks.push({ type: 'scope', key: `scope-${sec.id}-${idx}`, title: sec.name, items, continued: idx > 0 })
    })
  })

  if (q.materialSpec?.length) {
    chunk(q.materialSpec, 8).forEach((rows, idx) => {
      blocks.push({ type: 'material', key: `mat-${idx}`, rows, continued: idx > 0 })
    })
  }

  if (q.notes?.length) {
    chunk(q.notes, 12).forEach((notes, idx) => {
      blocks.push({ type: 'notes', key: `notes-${idx}`, notes, continued: idx > 0 })
    })
  }

  if (q.paymentSchedule?.length) {
    chunk(q.paymentSchedule, 8).forEach((rows, idx) => {
      blocks.push({ type: 'payment', key: `pay-${idx}`, rows, continued: idx > 0 })
    })
  }

  blocks.push({ type: 'total', key: 'total', amount: q.estimatedCost })
  return blocks
}

// ─── Paginate — a block NEVER splits across pages ────────────────────────────
const paginate = (blocks) => {
  const pages = []
  let page = []
  let used = 0

  blocks.forEach((block) => {
    const h = blockH(block)
    const isFirst = pages.length === 0
    const limit   = isFirst ? CONTENT_FIRST : CONTENT_MID

    if (used + h > limit && page.length > 0) {
      pages.push(page)
      page = [block]
      used = h
    } else {
      page.push(block)
      used += h
    }
  })

  if (page.length) pages.push(page)

  // Last page check: if footer + all content > CONTENT_LAST, 
  // keep moving blocks to a new second-to-last page until it fits
  const ensureFooterFits = () => {
    if (pages.length === 0) return
    let attempts = 0
    while (attempts < 20) {
      attempts++
      const lastPage = pages[pages.length - 1]
      const usedInLast = lastPage.reduce((s, b) => s + blockH(b), 0)
      if (usedInLast <= CONTENT_LAST || lastPage.length <= 1) break
      // Move second-to-last block (not the total block) to previous page
      const moved = lastPage.splice(lastPage.length - 2, 1)[0]
      const prevPage = pages[pages.length - 2]
      if (prevPage) {
        prevPage.push(moved)
      } else {
        pages.splice(pages.length - 1, 0, [moved])
      }
    }
  }
  ensureFooterFits()

  return pages
}

// ─── Logo loader — converts /favicon.png to base64 for reliable PDF capture ──
const useLogoBase64 = () => {
  const [src, setSrc] = useState('/favicon.png')

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width  = img.naturalWidth  || img.width
        canvas.height = img.naturalHeight || img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        setSrc(canvas.toDataURL('image/png'))
      } catch {
        // taint error — keep original src
      }
    }
    img.onerror = () => setSrc('/logo.png') // fallback to logo.png
    img.src = '/favicon.png'
  }, [])

  return src
}

// ─── Decorative Corners ───────────────────────────────────────────────────────
const TopCorner = () => (
  <>
    <div style={{
      position: 'absolute', top: 0, right: 0, zIndex: 1,
      width: 0, height: 0, borderStyle: 'solid',
      borderWidth: '0 165px 118px 0',
      borderColor: `transparent ${R.darkRed} transparent transparent`,
    }}/>
    <div style={{
      position: 'absolute', top: 0, right: 0, zIndex: 2,
      width: 0, height: 0, borderStyle: 'solid',
      borderWidth: '0 165px 96px 0',
      borderColor: `transparent ${R.red} transparent transparent`,
    }}/>
  </>
)

const BottomCorner = () => (
  <>
    <div style={{
      position: 'absolute', bottom: 0, left: 0, zIndex: 1,
      width: 0, height: 0, borderStyle: 'solid',
      borderWidth: '120px 0 0 170px',
      borderColor: `transparent transparent transparent ${R.black}`,
    }}/>
    <div style={{
      position: 'absolute', bottom: 0, left: 0, zIndex: 2,
      width: 0, height: 0, borderStyle: 'solid',
      borderWidth: '96px 0 0 136px',
      borderColor: `transparent transparent transparent #2B2B2B`,
    }}/>
  </>
)

// ─── Page Header — uses base64 logo ──────────────────────────────────────────
const PageHeader = ({ logoSrc }) => (
  <div style={{ textAlign: 'center', marginBottom: 10, position: 'relative', zIndex: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
      <img
        src={logoSrc}
        alt="Scarlet Interior Design"
        style={{ height: 62, width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.35em', color: R.black }}>
      SCARLET INTERIOR DESIGN
    </div>
    <div style={{ fontSize: 11, fontStyle: 'italic', color: R.darkRed, marginTop: 2 }}>
      Beauty in Simplicity
    </div>
    <div style={{ height: 2, width: '100%', backgroundColor: R.red, marginTop: 6 }}/>
  </div>
)

// ─── Client Meta ──────────────────────────────────────────────────────────────
const ClientMeta = ({ q }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
    fontSize: 11, lineHeight: '19px', marginBottom: 12,
    position: 'relative', zIndex: 10, color: R.black,
  }}>
    <div>
      <div style={{ fontWeight: 700 }}>Client Name: {q.clientName || '-'}</div>
      <div>Address: {q.address || '-'}</div>
      <div>Contact: {q.contactNumber || '-'}</div>
      <div>GST No.: {q.gstNumber || '-'}</div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontWeight: 700 }}>DATE: {formatDateDDMMYYYY(q.date) || '-'}</div>
      <div>Quotation No.: {q.quotationNumber || '-'}</div>
      <div>Type: {q.quotationType || 'Turnkey Interior'}</div>
      <div>Package: {q.packageType || 'STANDARD'}</div>
    </div>
  </div>
)

// ─── Shared cell style ─────────────────────────────────────────────────────────
const td = (extra = {}) => ({
  border: `1px solid ${R.gray}`,
  padding: '6px 8px',
  verticalAlign: 'middle',
  textAlign: 'left',
  color: R.black,
  lineHeight: '16px',
  ...extra,
})

// ─── Block Renderers ──────────────────────────────────────────────────────────
const RenderIntro = ({ block }) => (
  <div style={{ marginBottom: 14, position: 'relative', zIndex: 10 }}>
    <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, textDecoration: 'underline', color: R.darkRed, marginBottom: 8 }}>
      {block.title}
    </div>
    <div style={{ fontSize: 12, lineHeight: '22px', textIndent: '2em', color: R.black }}>
      {block.introText}
    </div>
  </div>
)

const RenderScope = ({ block }) => (
  <div style={{ marginBottom: 14, position: 'relative', zIndex: 10 }}>
    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, textDecoration: 'underline', color: R.black, marginBottom: 6 }}>
      • {block.title}{block.continued ? ' (CONT.)' : ''}
    </div>
    <div style={{ border: `1px solid ${R.gray}`, borderRadius: 3, overflow: 'visible' }}>
      <div style={{ backgroundColor: R.red, color: '#fff', fontWeight: 700, fontSize: 12, padding: '6px 12px' }}>
        DESCRIPTION
      </div>
      {block.items.map((item, i) => (
        item.isSubTitle ? (
          <div
            key={item.id}
            style={{
              borderTop: `1px solid ${R.gray}`,
              padding: '7px 10px',
              backgroundColor: '#D8D8D8',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: R.black,
            }}
          >
            {item.text}
          </div>
        ) : (
          <div key={item.id} style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            alignItems: 'center',           // ← FIXED: was 'start', now 'center' for vertical centering
            borderTop: `1px solid ${R.gray}`,
            padding: '6px 10px',
            fontSize: 11,
            minHeight: 42,                  // ← slightly taller for breathing room
            backgroundColor: i % 2 ? R.offWhite : '#fff',
            boxSizing: 'border-box',
          }}>
            <span style={{
              display: 'inline-flex',
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              fontSize: 10,
              backgroundColor: R.gray,
              flexShrink: 0,
              fontWeight: 600,
              alignSelf: 'center',          // ← ensures number badge is always centered
            }}>
              {block.items.slice(0, i + 1).filter((x) => !x.isSubTitle).length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', minHeight: 26 }}>
              <div style={{ lineHeight: '1.25', color: R.black, margin: 0 }}>{item.text}</div>
            </div>
          </div>
        )
      ))}
    </div>
  </div>
)

const RenderMaterial = ({ block }) => (
  <div style={{ marginBottom: 14, position: 'relative', zIndex: 10 }}>
    <div style={{ fontSize: 13, fontWeight: 700, textDecoration: 'underline', color: R.black, marginBottom: 6 }}>
      MATERIAL SPECIFICATION{block.continued ? ' (CONT.)' : ''}
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '26%' }}/>
        <col style={{ width: '37%' }}/>
        <col style={{ width: '37%' }}/>
      </colgroup>
      <thead>
        <tr style={{ backgroundColor: R.red }}>
          {['Material', 'Specification', 'Important Clarity'].map(h => (
            <th key={h} style={td({ color: '#fff', fontWeight: 700, fontSize: 11 })}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row, i) => (
          <tr key={row.id} style={{ backgroundColor: i % 2 ? R.offWhite : '#fff' }}>
            <td style={td({ fontWeight: 600, verticalAlign: 'middle' })}>
              <div style={{ display: 'flex', alignItems: 'center', minHeight: 20 }}>{row.material}</div>
            </td>
            <td style={td({ verticalAlign: 'middle' })}>
              <div style={{ display: 'flex', alignItems: 'center', minHeight: 20 }}>{row.specification}</div>
            </td>
            <td style={td({ verticalAlign: 'middle' })}>
              <div style={{ display: 'flex', alignItems: 'center', minHeight: 20 }}>{row.clarity}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const RenderNotes = ({ block }) => (
  <div style={{ marginBottom: 14, position: 'relative', zIndex: 10 }}>
    <div style={{ fontSize: 13, fontWeight: 700, textDecoration: 'underline', color: R.black, marginBottom: 6 }}>
      Notes:{block.continued ? ' (CONT.)' : ''}
    </div>
    <ul style={{ margin: 0, paddingLeft: 20, color: R.black }}>
      {block.notes.map((note, i) => (
        <li key={i} style={{ fontSize: 11, lineHeight: '20px', marginBottom: 3 }}>{note}</li>
      ))}
    </ul>
  </div>
)

const RenderPayment = ({ block }) => (
  <div style={{ marginBottom: 14, position: 'relative', zIndex: 10 }}>
    <div style={{ fontSize: 13, fontWeight: 700, textDecoration: 'underline', color: R.red, marginBottom: 6 }}>
      PAYMENT SCHEDULE:{block.continued ? ' (CONT.)' : ''}
    </div>
    <ol style={{ margin: 0, paddingLeft: 20, color: R.black }}>
      {block.rows.map((line) => (
        <li key={line.id} style={{ fontSize: 11, lineHeight: '20px', marginBottom: 3 }}>
          {line.stage} - {line.percentage}
        </li>
      ))}
    </ol>
  </div>
)

const RenderTotal = ({ block }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    border: `2px solid ${R.red}`, borderRadius: 2,
    overflow: 'hidden', fontSize: 13, fontWeight: 700,
    position: 'relative', zIndex: 10,
  }}>
    <div style={{ padding: '8px 14px', backgroundColor: R.red, color: '#fff' }}>Total Estimated Cost</div>
    <div style={{ padding: '8px 14px', backgroundColor: R.offWhite, color: R.black }}>
      {formatIndianCurrency(block.amount || '')} Rs.
    </div>
  </div>
)

// ─── Last Page Footer ─────────────────────────────────────────────────────────
const LastFooter = () => (
  <div style={{ fontSize: 11, color: R.black, marginTop: 12, position: 'relative', zIndex: 10 }}>
    <div style={{ textAlign: 'center', marginBottom: 3 }}>
      We look forward to transforming your space with elegance and functionality.
    </div>
    <div style={{ textAlign: 'center', marginBottom: 10 }}>
      Thank you for considering Scarlet Interior Design.
    </div>
    <div style={{ fontWeight: 600, marginBottom: 10 }}>Best Regards,</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
      <div style={{ fontWeight: 700, letterSpacing: '0.05em' }}>SCARLET INTERIOR DESIGN</div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ height: 1, width: 140, backgroundColor: R.black, marginLeft: 'auto', marginBottom: 4 }}/>
        <div style={{ fontWeight: 600 }}>Client Signature</div>
      </div>
    </div>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 20, borderTop: `1px solid ${R.gray}`, paddingTop: 8,
    }}>
      <a href="https://scarletinteriordesign.com/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: R.black, textDecoration: 'none' }}>
        <Globe size={12}/><span>scarletinteriordesign.com</span>
      </a>
      <a href="https://www.instagram.com/scarletinteriordesigns"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: R.black, textDecoration: 'none' }}>
        <Instagram size={12}/><span>@scarletinteriordesigns</span>
      </a>
    </div>
  </div>
)

const renderBlock = (block, logoSrc) => {
  switch (block.type) {
    case 'intro':    return <RenderIntro    key={block.key} block={block}/>
    case 'scope':    return <RenderScope    key={block.key} block={block}/>
    case 'material': return <RenderMaterial key={block.key} block={block}/>
    case 'notes':    return <RenderNotes    key={block.key} block={block}/>
    case 'payment':  return <RenderPayment  key={block.key} block={block}/>
    case 'total':    return <RenderTotal    key={block.key} block={block}/>
    default:         return null
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function QuotationPDF({ quotation }) {
  const blocks  = buildBlocks(quotation)
  const pages   = paginate(blocks)
  const total   = pages.length
  const logoSrc = useLogoBase64()   // ← base64 logo, guaranteed to render in html2canvas

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 16,
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    }}>
      {pages.map((pageBlocks, pi) => {
        const isFirst = pi === 0
        const isLast  = pi === total - 1

        return (
          <section
            key={`page-${pi}`}
            className="pdf-export-page pdf-page"
            style={{
              position: 'relative',
              width:     PAGE_W,
              height:    PAGE_H,
              minHeight: PAGE_H,
              maxHeight: PAGE_H,
              overflow:  'hidden',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOT}px`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isFirst && <TopCorner/>}
            {isLast  && <BottomCorner/>}

            {isFirst && <PageHeader logoSrc={logoSrc}/>}
            {isFirst && <ClientMeta q={quotation}/>}

            {/* Content area — overflow visible so rows never get clipped */}
            <div style={{ overflow: 'visible' }}>
              {pageBlocks.map((block) => renderBlock(block, logoSrc))}
            </div>

            {isLast && <LastFooter/>}

            <div style={{
              textAlign: 'center', fontSize: 10, color: '#888',
              marginTop: 4, flexShrink: 0, position: 'relative', zIndex: 10,
            }}>
              Page {pi + 1} of {total}
            </div>
          </section>
        )
      })}
    </div>
  )
}