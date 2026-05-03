import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatDateDDMMYYYY, formatIndianCurrency } from '../../utils/formatCurrency'

const mm = (value) => value * 2.835

const COLORS = {
  red: '#C0392B',
  darkRed: '#922B21',
  black: '#1A1A1A',
  white: '#FFFFFF',
  offWhite: '#FDFCF8',
  gray: '#E8E8E8',
  paper: '#f8f7f2',
  mutedText: '#6F6F6F',
  subTitleBg: '#DCDCDC',
}

const PAGE_HEIGHT = mm(297)
const PAGE_PADDING_X = mm(14)
const PAGE_PADDING_TOP = mm(14)
const PAGE_PADDING_BOTTOM = mm(18)
const PAGE_NUMBER_SPACE = mm(8)
const FIRST_PAGE_RESERVED = mm(128)
const LAST_PAGE_FOOTER_RESERVED = mm(74)

const BLOCK_GAP = mm(4.2)

Font.registerHyphenationCallback((word) => [word])

const safeText = (value, fallback = '-') => {
  const text = String(value ?? '').trim()
  return text || fallback
}

const formatAmountForPdf = (value) => String(formatIndianCurrency(value)).replace(/^₹/, '')

const estimateLines = (value, charsPerLine) =>
  Math.max(1, Math.ceil(String(value ?? '').trim().length / charsPerLine))

const estimateScopeBlockHeight = (block) => {
  const base = mm(17)
  const rowsHeight = (block.items || []).reduce((sum, item) => {
    if (item?.isSubTitle) return sum + mm(8.8)
    const textLines = estimateLines(item?.text, 72)
    const rowHeight = Math.max(mm(9.4), textLines * mm(5) + mm(3.2))
    return sum + rowHeight
  }, 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimateMaterialRowHeight = (row) => {
  const lines = Math.max(
    estimateLines(row?.material, 19),
    estimateLines(row?.specification, 26),
    estimateLines(row?.clarity, 26),
  )
  return Math.max(mm(10), lines * mm(4.9) + mm(3.2))
}

const estimateMaterialBlockHeight = (block) => {
  const base = mm(17)
  const rowsHeight = (block.rows || []).reduce((sum, row) => sum + estimateMaterialRowHeight(row), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimateNoteRowHeight = (note) => {
  const lines = estimateLines(note, 84)
  return Math.max(mm(7), lines * mm(4.4))
}

const estimateNotesBlockHeight = (block) => {
  const base = mm(11)
  const rowsHeight = (block.notes || []).reduce((sum, note) => sum + estimateNoteRowHeight(note), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimatePaymentRowHeight = (row) => {
  const text = `${row?.stage || ''} ${row?.percentage || ''}`.trim()
  const lines = estimateLines(text, 80)
  return Math.max(mm(7.2), lines * mm(4.4))
}

const estimatePaymentBlockHeight = (block) => {
  const base = mm(15)
  const rowsHeight = (block.rows || []).reduce((sum, row) => sum + estimatePaymentRowHeight(row), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimateTotalBlockHeight = () => mm(16) + BLOCK_GAP

const estimateBlockHeight = (block) => {
  if (block.type === 'scope') return estimateScopeBlockHeight(block)
  if (block.type === 'material') return estimateMaterialBlockHeight(block)
  if (block.type === 'notes') return estimateNotesBlockHeight(block)
  if (block.type === 'payment') return estimatePaymentBlockHeight(block)
  if (block.type === 'total') return estimateTotalBlockHeight()
  return mm(10)
}

const sumHeights = (blocks = []) => blocks.reduce((sum, block) => sum + estimateBlockHeight(block), 0)

const buildBlocks = (quotation = {}) => {
  const blocks = []

  ;(quotation.sections || []).forEach((section, sectionIndex) => {
    const visibleItems = (section?.items || []).filter((item) => !item?.hideInPdf)
    if (!visibleItems.length) return

    blocks.push({
      type: 'scope',
      key: `scope-${section?.id || sectionIndex}`,
      name: safeText(section?.name, `SECTION ${sectionIndex + 1}`),
      items: visibleItems,
    })
  })

  if ((quotation.materialSpec || []).length) {
    blocks.push({
      type: 'material',
      key: 'material',
      rows: quotation.materialSpec,
      continued: false,
    })
  }

  if ((quotation.notes || []).length) {
    blocks.push({
      type: 'notes',
      key: 'notes',
      notes: quotation.notes,
      continued: false,
    })
  }

  if ((quotation.paymentSchedule || []).length) {
    blocks.push({
      type: 'payment',
      key: 'payment',
      rows: quotation.paymentSchedule,
      continued: false,
    })
  }

  blocks.push({
    type: 'total',
    key: 'total',
    amount: quotation.estimatedCost,
  })

  return blocks
}

const createSplitBlocks = (block, fitCount, partTag) => {
  if (block.type === 'material') {
    return {
      fitted: {
        ...block,
        key: `${block.key}-part-${partTag}`,
        rows: block.rows.slice(0, fitCount),
      },
      remaining: {
        ...block,
        key: `${block.key}-part-${partTag + 1}`,
        rows: block.rows.slice(fitCount),
        continued: true,
      },
    }
  }

  if (block.type === 'notes') {
    return {
      fitted: {
        ...block,
        key: `${block.key}-part-${partTag}`,
        notes: block.notes.slice(0, fitCount),
      },
      remaining: {
        ...block,
        key: `${block.key}-part-${partTag + 1}`,
        notes: block.notes.slice(fitCount),
        continued: true,
      },
    }
  }

  if (block.type === 'payment') {
    return {
      fitted: {
        ...block,
        key: `${block.key}-part-${partTag}`,
        rows: block.rows.slice(0, fitCount),
      },
      remaining: {
        ...block,
        key: `${block.key}-part-${partTag + 1}`,
        rows: block.rows.slice(fitCount),
        continued: true,
      },
    }
  }

  return { fitted: null, remaining: block }
}

const paginateBlocks = (blocks = []) => {
  const baseLimit = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - PAGE_NUMBER_SPACE
  const firstPageLimit = baseLimit - FIRST_PAGE_RESERVED
  const regularPageLimit = baseLimit

  const pages = []
  let currentPage = []
  let currentHeight = 0
  let pageIndex = 0
  let splitTag = 0
  const pending = [...blocks]

  while (pending.length) {
    const block = pending.shift()
    const limit = pageIndex === 0 ? firstPageLimit : regularPageLimit
    const available = limit - currentHeight
    const blockHeight = estimateBlockHeight(block)

    if (currentHeight + blockHeight <= limit) {
      currentPage.push(block)
      currentHeight += blockHeight
      continue
    }

    const isSplitCandidate = block.type === 'material' || block.type === 'notes' || block.type === 'payment'

    if (isSplitCandidate && available > mm(22)) {
      const source = block.type === 'notes' ? block.notes : block.rows
      const rowHeightGetter =
        block.type === 'material'
          ? estimateMaterialRowHeight
          : block.type === 'notes'
            ? estimateNoteRowHeight
            : estimatePaymentRowHeight
      const baseHeight =
        block.type === 'material' ? mm(17) : block.type === 'notes' ? mm(11) : mm(15)

      let used = baseHeight + BLOCK_GAP
      let fitCount = 0
      for (let i = 0; i < source.length; i += 1) {
        const nextUsed = used + rowHeightGetter(source[i])
        if (nextUsed > available) break
        fitCount += 1
        used = nextUsed
      }

      if (fitCount > 0 && fitCount < source.length) {
        const splitResult = createSplitBlocks(block, fitCount, splitTag)
        splitTag += 2
        currentPage.push(splitResult.fitted)
        currentHeight += estimateBlockHeight(splitResult.fitted)
        pending.unshift(splitResult.remaining)
      } else if (fitCount === source.length) {
        currentPage.push(block)
        currentHeight += blockHeight
      } else {
        pending.unshift(block)
      }
    } else {
      pending.unshift(block)
    }

    if (currentPage.length > 0) {
      pages.push(currentPage)
      currentPage = []
      currentHeight = 0
      pageIndex += 1
      continue
    }

    currentPage.push(pending.shift())
    currentHeight = estimateBlockHeight(currentPage[0])
    pages.push(currentPage)
    currentPage = []
    currentHeight = 0
    pageIndex += 1
  }

  if (currentPage.length) {
    pages.push(currentPage)
  }

  if (!pages.length) {
    pages.push([])
  }

  let guard = 0
  while (guard < 50) {
    guard += 1
    const lastIndex = pages.length - 1
    const lastLimit = (lastIndex === 0 ? firstPageLimit : regularPageLimit) - LAST_PAGE_FOOTER_RESERVED
    const usedHeight = sumHeights(pages[lastIndex])

    if (usedHeight <= lastLimit || pages[lastIndex].length <= 1) break

    const movedBlock = pages[lastIndex].pop()
    if (!pages[lastIndex + 1]) pages.push([])
    pages[lastIndex + 1].unshift(movedBlock)
  }

  return pages
}

const renderScopeRow = (item, index, items) => {
  const rowKey = item?.id || `${item?.text || 'scope'}-${index}`
  const serial = items.slice(0, index + 1).filter((entry) => !entry?.isSubTitle).length

  if (item?.isSubTitle) {
    return (
      <View key={rowKey} style={styles.scopeSubTitleRow}>
        <Text style={styles.scopeSubTitleText}>{safeText(item?.text)}</Text>
      </View>
    )
  }

  const isAlt = serial % 2 === 0
  return (
    <View key={rowKey} style={[styles.scopeRow, isAlt ? styles.altBackground : null]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{serial}</Text>
      </View>
      <View style={styles.scopeTextWrap}>
        <Text style={styles.scopeItemText}>{safeText(item?.text)}</Text>
      </View>
    </View>
  )
}

const ScopeBlock = ({ block }) => (
  <View style={styles.block} wrap={false}>
    <View style={styles.descriptionHeader}>
      <Text style={styles.descriptionHeaderText}>{safeText(block?.name)}</Text>
    </View>
    <View style={styles.scopeTable}>
      {(block?.items || []).map((item, index, rows) => renderScopeRow(item, index, rows))}
    </View>
  </View>
)

const MaterialBlock = ({ block }) => (
  <View style={styles.block} wrap={false}>
    <Text style={styles.materialHeading}>
      MATERIAL SPECIFICATION{block?.continued ? ' (CONT.)' : ''}
    </Text>
    <View style={styles.materialTable}>
      <View style={styles.materialHeaderRow}>
        <View style={[styles.materialCell, styles.materialCol1, styles.materialHeaderCell]}>
          <Text style={styles.materialHeaderText}>Material</Text>
        </View>
        <View style={[styles.materialCell, styles.materialCol2, styles.materialHeaderCell]}>
          <Text style={styles.materialHeaderText}>Specification</Text>
        </View>
        <View style={[styles.materialCell, styles.materialCol3, styles.materialHeaderCell]}>
          <Text style={styles.materialHeaderText}>Important Clarity</Text>
        </View>
      </View>

      {(block?.rows || []).map((row, index) => (
        <View
          key={row?.id || `material-${index}`}
          style={[styles.materialRow, index % 2 === 1 ? styles.altBackground : null]}
        >
          <View style={[styles.materialCell, styles.materialCol1]}>
            <Text style={styles.materialCellText}>{safeText(row?.material)}</Text>
          </View>
          <View style={[styles.materialCell, styles.materialCol2]}>
            <Text style={styles.materialCellText}>{safeText(row?.specification)}</Text>
          </View>
          <View style={[styles.materialCell, styles.materialCol3]}>
            <Text style={styles.materialCellText}>{safeText(row?.clarity)}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
)

const NotesBlock = ({ block }) => (
  <View style={styles.block} wrap={false}>
    <Text style={styles.notesHeading}>Notes:{block?.continued ? ' (CONT.)' : ''}</Text>
    {(block?.notes || []).map((note, index) => (
      <View key={`note-${index}`} style={styles.noteRow}>
        <Text style={styles.noteBullet}>•</Text>
        <Text style={styles.noteText}>{safeText(note)}</Text>
      </View>
    ))}
  </View>
)

const PaymentBlock = ({ block }) => (
  <View style={styles.block} wrap={false}>
    <Text style={styles.paymentHeading}>PAYMENT SCHEDULE:{block?.continued ? ' (CONT.)' : ''}</Text>
    <Text style={styles.paymentIntro}>Payment should be done in stage wise as follows:</Text>
    {(block?.rows || []).map((row, index) => (
      <Text key={row?.id || `payment-${index}`} style={styles.paymentItemText}>
        {`${index + 1}. ${safeText(row?.stage)} - ${safeText(row?.percentage)}`}
      </Text>
    ))}
  </View>
)

const TotalBlock = ({ block }) => (
  <View style={styles.totalBox} wrap={false}>
    <View style={styles.totalLeft}>
      <Text style={styles.totalLeftText}>Total Estimated Cost</Text>
    </View>
    <View style={styles.totalRight}>
      <Text style={styles.totalRightText}>{`${formatAmountForPdf(block?.amount || '')} Rs.`}</Text>
    </View>
  </View>
)

const PageHeader = ({ headerImageBase64 }) => (
  <View style={styles.headerWrap}>
    {headerImageBase64 ? <Image src={headerImageBase64} style={styles.headerImage} /> : null}
  </View>
)

const ClientSection = ({ quotation = {} }) => (
  <View style={styles.clientSectionWrap}>
    <Text style={styles.quotationTitle}>
      {quotation?.quotationType === 'Only Designing (3D Visualization)'
        ? 'Quotation For Interior Designing'
        : `Quotation For ${safeText(quotation?.bhkType, 'Project')} Interior Design`}
    </Text>

    <View style={styles.clientMetaRow}>
      <View style={styles.clientMetaColLeft}>
        <Text style={styles.metaLine}><Text style={styles.metaLabel}>Client Name:</Text> {safeText(quotation?.clientName)}</Text>
        <Text style={styles.metaLine}><Text style={styles.metaLabel}>Address:</Text> {safeText(quotation?.address)}</Text>
        <Text style={styles.metaLine}><Text style={styles.metaLabel}>Contact :</Text> {safeText(quotation?.contactNumber)}</Text>
        {quotation?.showGstInPdf && String(quotation?.gstNumber || '').trim() ? (
          <Text style={styles.metaLine}><Text style={styles.metaLabel}>GST NO. -</Text> {safeText(quotation?.gstNumber)}</Text>
        ) : null}
      </View>
      <View style={styles.clientMetaColRight}>
        <Text style={styles.metaDate}><Text style={styles.metaLabel}>DATE :</Text> {safeText(formatDateDDMMYYYY(quotation?.date))}</Text>
      </View>
    </View>

    <Text style={styles.dearLine}>Dear Sir/Ma'am,</Text>
    <Text style={styles.introLine}>
      {safeText(
        quotation?.introText,
        'Thank you for your inquiry. We are pleased to share our quotation for your interior requirements.',
      )}
    </Text>
    <Text style={styles.scopeOfWorkHeading}>SCOPE OF WORK</Text>
  </View>
)

const LastPageFooter = () => (
  <View style={styles.footerWrap} wrap={false}>
    <Text style={styles.footerCenterLine}>We look forward to transforming your space with elegance and functionality.</Text>
    <Text style={styles.footerCenterLine}>Thank you for considering Scarlet Interior Design.</Text>
    <Text style={styles.bestRegards}>Best Regards,</Text>

    <View style={styles.footerSignatureRow}>
      <Text style={styles.footerBrand}>SCARLET INTERIOR DESIGN</Text>
      <View style={styles.clientSignatureWrap}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureLabel}>Client Signature</Text>
      </View>
    </View>
  </View>
)

const renderBlock = (block) => {
  if (block.type === 'scope') return <ScopeBlock key={block.key} block={block} />
  if (block.type === 'material') return <MaterialBlock key={block.key} block={block} />
  if (block.type === 'notes') return <NotesBlock key={block.key} block={block} />
  if (block.type === 'payment') return <PaymentBlock key={block.key} block={block} />
  if (block.type === 'total') return <TotalBlock key={block.key} block={block} />
  return null
}

export const QuotationPDFDocument = ({ quotation = {}, headerImageBase64 = null, footerImageBase64 = null }) => {
  const blocks = buildBlocks(quotation)
  const pages = paginateBlocks(blocks)

  return (
    <Document>
      {pages.map((pageBlocks, pageIndex) => {
        const isFirstPage = pageIndex === 0
        const isLastPage = pageIndex === pages.length - 1

        return (
          <Page key={`quotation-page-${pageIndex}`} size="A4" style={styles.page}>
            <View style={styles.pageInner}>
              {isFirstPage ? <PageHeader headerImageBase64={headerImageBase64} /> : null}
              {isFirstPage ? <ClientSection quotation={quotation} /> : null}
              {pageBlocks.map(renderBlock)}
              {isLastPage ? <LastPageFooter /> : null}
            </View>
            {isLastPage && footerImageBase64 ? <Image src={footerImageBase64} style={styles.footerImage} /> : null}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              fixed
            />
          </Page>
        )
      })}
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.paper,
    fontFamily: 'Helvetica',
    color: COLORS.black,
    paddingTop: PAGE_PADDING_TOP,
    paddingHorizontal: PAGE_PADDING_X,
    paddingBottom: PAGE_PADDING_BOTTOM,
    fontSize: 12,
    lineHeight: 1.38,
    position: 'relative',
  },
  pageInner: {
    flexDirection: 'column',
  },

  headerWrap: {
    marginTop: 0,
    marginBottom: mm(5.6),
  },
  headerImage: {
    width: '100%',
    height: mm(52),
    objectFit: 'contain',
  },

  clientSectionWrap: {
    marginBottom: mm(5.2),
  },
  quotationTitle: {
    fontSize: 16.6,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.red,
    marginTop: mm(2.8),
    marginBottom: mm(4),
  },
  clientMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mm(4.2),
    gap: mm(4),
  },
  clientMetaColLeft: {
    width: '70%',
  },
  clientMetaColRight: {
    width: '30%',
    alignItems: 'flex-end',
  },
  metaLine: {
    fontSize: 12.2,
    lineHeight: 1.46,
    marginBottom: mm(1.2),
  },
  metaDate: {
    fontSize: 12.6,
    lineHeight: 1.46,
  },
  metaLabel: {
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  dearLine: {
    fontSize: 12.2,
    marginBottom: mm(1),
  },
  introLine: {
    fontSize: 11.6,
    lineHeight: 1.5,
    marginBottom: mm(3.2),
  },
  scopeOfWorkHeading: {
    fontSize: 12.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },

  block: {
    marginBottom: BLOCK_GAP,
  },
  descriptionHeader: {
    backgroundColor: COLORS.red,
    paddingVertical: mm(1.8),
    paddingHorizontal: mm(3),
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderBottomWidth: 0,
  },
  descriptionHeaderText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  scopeTable: {
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  scopeSubTitleRow: {
    backgroundColor: COLORS.subTitleBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    paddingVertical: mm(2),
    paddingHorizontal: mm(3),
  },
  scopeSubTitleText: {
    fontSize: 11.4,
    fontWeight: 'bold',
  },
  scopeRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    paddingVertical: mm(1.9),
    paddingHorizontal: mm(2.6),
    alignItems: 'center',
  },
  altBackground: {
    backgroundColor: COLORS.offWhite,
  },
  badge: {
    width: mm(7),
    height: mm(7),
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mm(2.4),
  },
  badgeText: {
    fontSize: 9.4,
    fontWeight: 'bold',
  },
  scopeTextWrap: {
    flex: 1,
  },
  scopeItemText: {
    fontSize: 11.5,
    lineHeight: 1.38,
  },

  materialHeading: {
    fontSize: 12.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: mm(2),
  },
  materialTable: {
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  materialHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.red,
  },
  materialRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  materialCell: {
    minHeight: mm(10),
    justifyContent: 'center',
    paddingHorizontal: mm(2.2),
    paddingVertical: mm(1.8),
    borderRightWidth: 1,
    borderRightColor: COLORS.gray,
  },
  materialCol1: {
    width: '26%',
  },
  materialCol2: {
    width: '37%',
  },
  materialCol3: {
    width: '37%',
    borderRightWidth: 0,
  },
  materialHeaderCell: {
    borderRightColor: COLORS.white,
  },
  materialHeaderText: {
    color: COLORS.white,
    fontSize: 11.6,
    fontWeight: 'bold',
  },
  materialCellText: {
    fontSize: 10.6,
    lineHeight: 1.38,
  },

  notesHeading: {
    fontSize: 12.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: mm(1.5),
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: mm(1.2),
  },
  noteBullet: {
    width: mm(4),
    fontSize: 9.6,
    marginTop: 1,
  },
  noteText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.4,
  },

  paymentHeading: {
    fontSize: 12.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: COLORS.red,
    marginBottom: mm(1.5),
  },
  paymentIntro: {
    fontSize: 10.8,
    marginBottom: mm(1.4),
  },
  paymentItemText: {
    fontSize: 10.8,
    lineHeight: 1.4,
    marginBottom: mm(1.2),
  },

  totalBox: {
    flexDirection: 'row',
    borderWidth: 1.6,
    borderColor: COLORS.red,
    marginBottom: BLOCK_GAP,
  },
  totalLeft: {
    width: '50%',
    backgroundColor: COLORS.red,
    paddingVertical: mm(2.4),
    paddingHorizontal: mm(3),
    justifyContent: 'center',
  },
  totalRight: {
    width: '50%',
    backgroundColor: COLORS.offWhite,
    paddingVertical: mm(2.4),
    paddingHorizontal: mm(3),
    justifyContent: 'center',
  },
  totalLeftText: {
    color: COLORS.white,
    fontSize: 12.2,
    fontWeight: 'bold',
  },
  totalRightText: {
    color: COLORS.black,
    fontSize: 12.2,
    fontWeight: 'bold',
  },

  footerWrap: {
    marginTop: mm(2.2),
    marginBottom: mm(44),
  },
  footerCenterLine: {
    textAlign: 'center',
    fontSize: 10.5,
    marginBottom: 2,
  },
  bestRegards: {
    fontSize: 10.8,
    marginTop: mm(1.4),
    marginBottom: mm(1.5),
  },
  footerSignatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerBrand: {
    fontSize: 11.4,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    width: '58%',
  },
  clientSignatureWrap: {
    width: '42%',
    alignItems: 'flex-end',
  },
  signatureLine: {
    width: mm(36),
    borderTopWidth: 1,
    borderTopColor: COLORS.black,
    marginBottom: 3,
  },
  signatureLabel: {
    fontSize: 10,
  },
  footerImage: {
    position: 'absolute',
    left: PAGE_PADDING_X,
    right: PAGE_PADDING_X,
    bottom: mm(8),
    height: mm(42),
    objectFit: 'contain',
  },

  pageNumber: {
    position: 'absolute',
    bottom: mm(6.5),
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10.2,
    color: COLORS.mutedText,
  },
})

export default QuotationPDFDocument
