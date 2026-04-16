import { Globe, Instagram } from 'lucide-react'
import { formatDateDDMMYYYY, formatIndianCurrency } from '../../utils/formatCurrency'

const BRAND = {
  red: '#C0392B',
  darkRed: '#922B21',
  black: '#1A1A1A',
  offWhite: '#FAFAFA',
  gray: '#E8E8E8',
}

const chunkArray = (arr = [], size) => {
  const chunks = []
  if (!arr?.length) return chunks
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

const estimateScopeWeight = (items = []) => 1.35 + items.length * 0.23
const estimateMaterialWeight = (rows = []) => 1.45 + rows.length * 0.19
const estimateNotesWeight = (notes = []) => 1 + notes.length * 0.16
const estimatePaymentWeight = (rows = []) => 0.95 + rows.length * 0.17

const buildContentBlocks = (quotation) => {
  const blocks = []

  const introText = (quotation.introText || '').trim()
  if (introText) {
    blocks.push({
      type: 'intro',
      key: 'intro-section',
      title:
        quotation.quotationType === 'Only Designing (3D Visualization)'
          ? 'Quotation For Interior Designing'
          : `Quotation For ${quotation.bhkType || 'Project'} Interior Design`,
      introText,
      weight: 1.8,
    })
  }

  const sections = quotation.sections || []
  sections.forEach((section) => {
    chunkArray(section.items || [], 8).forEach((chunk, idx) => {
      blocks.push({
        type: 'scope',
        key: `scope-${section.id}-${idx}`,
        title: section.name,
        items: chunk,
        continued: idx > 0,
        weight: estimateScopeWeight(chunk),
      })
    })
  })

  if (quotation.materialSpec?.length) {
    chunkArray(quotation.materialSpec, 10).forEach((chunk, idx) => {
      blocks.push({
        type: 'material',
        key: `material-${idx}`,
        rows: chunk,
        continued: idx > 0,
        weight: estimateMaterialWeight(chunk),
      })
    })
  }

  if (quotation.notes?.length) {
    chunkArray(quotation.notes, 10).forEach((chunk, idx) => {
      blocks.push({
        type: 'notes',
        key: `notes-${idx}`,
        notes: chunk,
        continued: idx > 0,
        weight: estimateNotesWeight(chunk),
      })
    })
  }

  if (quotation.paymentSchedule?.length) {
    chunkArray(quotation.paymentSchedule, 7).forEach((chunk, idx) => {
      blocks.push({
        type: 'payment',
        key: `payment-${idx}`,
        rows: chunk,
        continued: idx > 0,
        weight: estimatePaymentWeight(chunk),
      })
    })
  }

  blocks.push({ type: 'total', key: 'total-cost', amount: quotation.estimatedCost, weight: 1.3 })
  return blocks
}

const paginateBlocks = (blocks = []) => {
  const pages = []
  let currentPage = []
  let used = 0
  const pageLimit = 10.7

  blocks.forEach((block) => {
    const weight = block.weight || 1.8
    if (used + weight > pageLimit && currentPage.length) {
      pages.push(currentPage)
      currentPage = [block]
      used = weight
    } else {
      currentPage.push(block)
      used += weight
    }
  })

  if (currentPage.length) pages.push(currentPage)
  return pages
}

const PageHeader = () => (
  <header className="mb-4 space-y-2 text-center" style={{ zIndex: 1 }}>
    <div className="flex justify-center">
      <img src="/logo.png" alt="Scarlet Interior Design" className="h-14 w-auto object-contain" />
    </div>
    <div className="text-sm font-semibold tracking-[0.38em]" style={{ color: BRAND.black }}>
      SCARLET INTERIOR DESIGN
    </div>
    <div className="text-xs italic" style={{ color: BRAND.darkRed }}>
      Beauty in Simplicity
    </div>
    <div className="h-[2px] w-full" style={{ backgroundColor: BRAND.red }} />
  </header>
)

const TopCorner = () => (
  <svg
    aria-hidden="true"
    className="absolute right-0 top-0 z-0"
    width="165"
    height="118"
    viewBox="0 0 165 118"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="165,0 38,0 165,118" fill={BRAND.darkRed} />
    <polygon points="165,0 62,0 165,96" fill={BRAND.red} />
  </svg>
)

const BottomCorner = () => (
  <svg
    aria-hidden="true"
    className="absolute bottom-0 left-0 z-0"
    width="170"
    height="120"
    viewBox="0 0 170 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="0,120 0,8 170,120" fill={BRAND.black} />
    <polygon points="0,120 0,34 136,120" fill="#2B2B2B" />
  </svg>
)

const ClientMeta = ({ quotation }) => (
  <section className="mb-3 grid grid-cols-2 gap-4 text-[11px] leading-5" style={{ zIndex: 1 }}>
    <div>
      <p className="font-semibold" style={{ color: BRAND.black }}>
        Client Name: {quotation.clientName || '-'}
      </p>
      <p>Address: {quotation.address || '-'}</p>
      <p>Contact: {quotation.contactNumber || '-'}</p>
      <p>GST No.: {quotation.gstNumber || '-'}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold" style={{ color: BRAND.black }}>
        DATE: {formatDateDDMMYYYY(quotation.date) || '-'}
      </p>
      <p>Quotation No.: {quotation.quotationNumber || '-'}</p>
      <p>Type: {quotation.quotationType || 'Turnkey Interior'}</p>
      <p>Package: {quotation.packageType || 'STANDARD'}</p>
    </div>
  </section>
)

const renderIntro = (block) => (
  <section key={block.key} className="space-y-2">
    <h2 className="text-center text-[18px] font-bold underline" style={{ color: BRAND.darkRed }}>
      {block.title}
    </h2>
    <p className="text-[12px] leading-6 indent-8" style={{ color: BRAND.black }}>
      {block.introText}
    </p>
  </section>
)

const renderScope = (block) => (
  <section key={block.key} className="space-y-2">
    <h4 className="text-center text-[15px] font-bold underline" style={{ color: BRAND.black }}>
      • {block.title} {block.continued ? '(CONT.)' : ''}
    </h4>
    <div className="rounded border" style={{ borderColor: BRAND.gray }}>
      <div className="px-3 py-1.5 text-sm font-bold text-white" style={{ backgroundColor: BRAND.red }}>
        DESCRIPTION
      </div>
      {block.items.map((item, i) => (
        <div
          key={item.id}
          className="grid grid-cols-[34px_1fr] items-start border-t px-2.5 py-1.5 text-[11px]"
          style={{
            borderColor: BRAND.gray,
            backgroundColor: i % 2 ? BRAND.offWhite : '#FFFFFF',
          }}
        >
          <span
            className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded text-[10px]"
            style={{ backgroundColor: BRAND.gray }}
          >
            {i + 1}
          </span>
          <span className="leading-5" style={{ color: BRAND.black }}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  </section>
)

const renderMaterial = (block) => (
  <section key={block.key}>
    <h3 className="mb-2 text-[14px] font-bold underline" style={{ color: BRAND.black }}>
      MATERIAL SPECIFICATION {block.continued ? '(CONT.)' : ''}
    </h3>
    <table className="w-full border-collapse text-[10px] leading-4">
      <thead>
        <tr className="text-white" style={{ backgroundColor: BRAND.red }}>
          <th className="border p-1.5 text-left" style={{ borderColor: BRAND.gray }}>
            Material
          </th>
          <th className="border p-1.5 text-left" style={{ borderColor: BRAND.gray }}>
            Specification
          </th>
          <th className="border p-1.5 text-left" style={{ borderColor: BRAND.gray }}>
            Important Clarity
          </th>
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row, i) => (
          <tr key={row.id} style={{ backgroundColor: i % 2 ? BRAND.offWhite : '#FFFFFF' }}>
            <td className="border p-1.5" style={{ borderColor: BRAND.gray }}>
              {row.material}
            </td>
            <td className="border p-1.5" style={{ borderColor: BRAND.gray }}>
              {row.specification}
            </td>
            <td className="border p-1.5" style={{ borderColor: BRAND.gray }}>
              {row.clarity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const renderNotes = (block) => (
  <section key={block.key}>
    <h3 className="text-[14px] font-bold underline" style={{ color: BRAND.black }}>
      Notes: {block.continued ? '(CONT.)' : ''}
    </h3>
    <ul className="list-disc space-y-1 pl-5 text-[11px] leading-5" style={{ color: BRAND.black }}>
      {block.notes.map((note, i) => (
        <li key={`${block.key}-${i}`}>{note}</li>
      ))}
    </ul>
  </section>
)

const renderPayment = (block) => (
  <section key={block.key}>
    <h3 className="text-[14px] font-bold underline" style={{ color: BRAND.red }}>
      PAYMENT SCHEDULE: {block.continued ? '(CONT.)' : ''}
    </h3>
    <ol className="list-decimal space-y-1 pl-5 text-[11px] leading-5" style={{ color: BRAND.black }}>
      {block.rows.map((line) => (
        <li key={line.id}>
          {line.stage} - {line.percentage}
        </li>
      ))}
    </ol>
  </section>
)

const renderTotal = (block) => (
  <section
    key={block.key}
    className="grid grid-cols-[1fr_1fr] border-2 text-[14px] font-bold"
    style={{ borderColor: BRAND.red }}
  >
    <div className="px-3 py-2 text-white" style={{ backgroundColor: BRAND.red }}>
      Total Estimated Cost
    </div>
    <div className="px-3 py-2" style={{ backgroundColor: BRAND.offWhite, color: BRAND.black }}>
      {formatIndianCurrency(block.amount || '')} Rs.
    </div>
  </section>
)

const LastPageFooter = () => (
  <footer className="mt-4 space-y-3 text-[11px]" style={{ color: BRAND.black }}>
    <p className="text-center">
      We look forward to transforming your space with elegance and functionality.
    </p>
    <p className="text-center">Thank you for considering Scarlet Interior Design.</p>
    <p className="font-semibold">Best Regards,</p>

    <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
      <div>
        <p className="font-bold tracking-wide">SCARLET INTERIOR DESIGN</p>
      </div>
      <div className="text-right">
        <div className="ml-auto mb-1 h-[1px] w-36" style={{ backgroundColor: BRAND.black }} />
        <p className="font-semibold">Client Signature</p>
      </div>
    </div>

    <div className="flex items-center justify-center gap-5 border-t pt-2" style={{ borderColor: BRAND.gray }}>
      <a
        href="https://scarletinteriordesign.com/"
        className="inline-flex items-center gap-1"
        style={{ color: BRAND.black }}
      >
        <Globe size={13} />
        <span>scarletinteriordesign.com</span>
      </a>
      <a
        href="https://www.instagram.com/scarletinteriordesigns"
        className="inline-flex items-center gap-1"
        style={{ color: BRAND.black }}
      >
        <Instagram size={13} />
        <span>@scarletinteriordesigns</span>
      </a>
    </div>
  </footer>
)

const renderBlock = (block) => {
  switch (block.type) {
    case 'intro':
      return renderIntro(block)
    case 'scope':
      return renderScope(block)
    case 'material':
      return renderMaterial(block)
    case 'notes':
      return renderNotes(block)
    case 'payment':
      return renderPayment(block)
    case 'total':
      return renderTotal(block)
    default:
      return null
  }
}

export default function QuotationPDF({ quotation }) {
  const contentBlocks = buildContentBlocks(quotation)
  const pages = paginateBlocks(contentBlocks)
  const totalPages = pages.length

  return (
    <div className="space-y-4">
      {pages.map((pageBlocks, pageIndex) => (
        <section
          key={`page-${pageIndex}`}
          className="pdf-export-page pdf-page relative mx-auto flex flex-col overflow-hidden bg-white shadow-lg"
        >
          {pageIndex === 0 ? <TopCorner /> : null}
          {pageIndex === totalPages - 1 ? <BottomCorner /> : null}

          <div className="relative z-10 flex h-full flex-col">
            {pageIndex === 0 ? <PageHeader /> : null}
            {pageIndex === 0 ? <ClientMeta quotation={quotation} /> : null}

            <main className="flex-grow space-y-4">
            {pageBlocks.map((block) => renderBlock(block))}
            </main>

            {pageIndex === totalPages - 1 ? <LastPageFooter /> : null}

            <div className="mt-auto pt-2 text-center text-[10px]" style={{ color: '#666' }}>
              Page {pageIndex + 1} of {totalPages}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
