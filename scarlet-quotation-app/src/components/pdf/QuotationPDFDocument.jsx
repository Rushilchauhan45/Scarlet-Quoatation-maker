import { Circle, Document, Font, Image, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer'
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
const FIRST_PAGE_RESERVED_MIN = mm(122)
const FIRST_PAGE_RESERVED_MAX = mm(162)
const LAST_PAGE_FOOTER_RESERVED = mm(82)

const BLOCK_GAP = mm(3.6)

Font.registerHyphenationCallback((word) => [word])

const normalizePdfText = (value) => String(value ?? '').replace(/₹/g, 'Rs.')

const safeText = (value, fallback = '-') => {
  const text = String(value ?? '').trim()
  const output = text || String(fallback ?? '').trim()
  return normalizePdfText(output || '-')
}

const formatIntroForPdf = (quotation = {}) => {
  const intro = String(quotation?.introText ?? '')
  const isLuxury4Bhk = String(quotation?.bhkType || '').trim().toUpperCase() === '4BHK'
    && String(quotation?.packageType || '').trim().toUpperCase() === 'LUXURIOUS'
  const normalized = isLuxury4Bhk ? intro.replace(/\n\s*\n/g, '\n') : intro
  return safeText(normalized)
}

const formatAmountForPdf = (value) =>
  String(formatIndianCurrency(value)).replace(/^₹/, '').replace(/\/-\s*$/, '').trim()

const estimateLines = (value, charsPerLine) =>
  Math.max(1, Math.ceil(String(value ?? '').trim().length / charsPerLine))

const isNoteSectionHeading = (note) => /^\[\d+\]/.test(String(note ?? '').trim())
const isDesigningQuotation = (quotation = {}) =>
  String(quotation?.quotationType || '').trim() === 'Only Designing (3D Visualization)'

const countScopeItems = (items = []) => items.filter((item) => !item?.isSubTitle).length

const estimateFirstPageReserved = (quotation = {}) => {
  const hasGst = Boolean(quotation?.showGstInPdf && String(quotation?.gstNumber || '').trim())
  const hasSquareFeet = Boolean(String(quotation?.totalSquareFeet ?? '').trim())

  const leftMetaRows = 3 + (hasGst ? 1 : 0)
  const rightMetaRows = 1 + (hasSquareFeet ? 1 : 0)
  const metaRows = Math.max(leftMetaRows, rightMetaRows)
  const introLines = estimateLines(quotation?.introText, 102)

  const estimated =
    mm(60) + // header image + its bottom gap
    mm(30) + // title area + spacing below title
    metaRows * mm(6.5) +
    mm(9.2) + // spacing below metadata
    Math.max(mm(9.6), introLines * mm(5.4)) +
    mm(16.5) // space after intro + "SCOPE OF WORK"

  return Math.min(Math.max(estimated, FIRST_PAGE_RESERVED_MIN), FIRST_PAGE_RESERVED_MAX)
}

const estimateScopeBlockHeight = (block) => {
  const base = mm(18.5)
  const rowsHeight = (block.items || []).reduce((sum, item) => {
    if (item?.isSubTitle) return sum + mm(9.8)
    const textLines = estimateLines(item?.text, 88)
    const rowHeight = Math.max(mm(10.4), textLines * mm(5.4) + mm(3.4))
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
  return Math.max(mm(11), lines * mm(5.4) + mm(3.4))
}

const estimateMaterialBlockHeight = (block) => {
  const base = mm(18.5)
  const rowsHeight = (block.rows || []).reduce((sum, row) => sum + estimateMaterialRowHeight(row), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimateNoteRowHeight = (note) => {
  if (isNoteSectionHeading(note)) return mm(8.4)
  const lines = estimateLines(note, 84)
  return Math.max(mm(7.8), lines * mm(4.8))
}

const estimateNotesBlockHeight = (block) => {
  const base = mm(12)
  const rowsHeight = (block.notes || []).reduce((sum, note) => sum + estimateNoteRowHeight(note), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimatePaymentRowHeight = (row) => {
  const text = `${row?.stage || ''} ${row?.percentage || ''}`.trim()
  const lines = estimateLines(text, 80)
  return Math.max(mm(8), lines * mm(4.8))
}

const estimatePaymentBlockHeight = (block) => {
  const base = mm(16.2)
  const rowsHeight = (block.rows || []).reduce((sum, row) => sum + estimatePaymentRowHeight(row), 0)
  return base + rowsHeight + BLOCK_GAP
}

const estimateTotalBlockHeight = () => mm(18) + BLOCK_GAP

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

const splitScopeBlockByCount = (block, firstCount) => {
  if (!block || block.type !== 'scope') return { firstBlock: block, secondBlock: null }
  const items = block.items || []
  const firstItems = items.slice(0, firstCount)
  const remainingItems = items.slice(firstCount)
  const firstBlock = {
    ...block,
    key: `${block.key}-part-1`,
    items: firstItems,
    serialOffset: 0,
  }
  const secondBlock = remainingItems.length
    ? {
        ...block,
        key: `${block.key}-part-2`,
        items: remainingItems,
        continued: true,
        serialOffset: countScopeItems(firstItems),
      }
    : null

  return { firstBlock, secondBlock }
}

const paginateDesigningBlocks = (blocks = []) => {
  const scopeBlocks = blocks.filter((block) => block.type === 'scope')
  const notesBlock = blocks.find((block) => block.type === 'notes')
  const paymentBlock = blocks.find((block) => block.type === 'payment')
  const totalBlock = blocks.find((block) => block.type === 'total')

  const pages = []
  const [firstScope, ...restScopes] = scopeBlocks

  if (firstScope) {
    const { firstBlock, secondBlock } = splitScopeBlockByCount(firstScope, 3)
    pages.push([firstBlock])

    const pageTwoBlocks = []
    if (secondBlock) pageTwoBlocks.push(secondBlock)
    if (restScopes.length) pageTwoBlocks.push(...restScopes)
    if (notesBlock) pageTwoBlocks.push(notesBlock)
    pages.push(pageTwoBlocks)
  } else {
    pages.push([])
    pages.push(notesBlock ? [notesBlock] : [])
  }

  const pageThreeBlocks = []
  if (paymentBlock) pageThreeBlocks.push(paymentBlock)
  if (totalBlock) pageThreeBlocks.push(totalBlock)
  pages.push(pageThreeBlocks)

  return pages
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

const paginateBlocks = (blocks = [], quotation = {}, pinnedHeight = 0) => {
  const baseLimit = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - PAGE_NUMBER_SPACE
  let firstPageLimit = baseLimit - estimateFirstPageReserved(quotation) + mm(6)
  if (pinnedHeight) firstPageLimit -= pinnedHeight + mm(3)
  if (firstPageLimit < mm(30)) firstPageLimit = mm(30)
  if (firstPageLimit > baseLimit) firstPageLimit = baseLimit
  const regularPageLimit = baseLimit

  const firstBlock = blocks[0]
  if (firstBlock?.type === 'scope') {
    const firstBlockHeight = estimateBlockHeight(firstBlock)
    const minFirstPage = Math.min(baseLimit, firstBlockHeight + mm(6))
    if (firstPageLimit < minFirstPage) firstPageLimit = minFirstPage
  }

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

    if (pageIndex === 0 && currentPage.length === 0 && block.type === 'scope') {
      currentPage.push(block)
      currentHeight += blockHeight
      continue
    }

    const isSplitCandidate = block.type === 'material' || block.type === 'notes' || block.type === 'payment'

    if (isSplitCandidate && available > mm(14)) {
      const source = block.type === 'notes' ? block.notes : block.rows
      const rowHeightGetter =
        block.type === 'material'
          ? estimateMaterialRowHeight
          : block.type === 'payment'
            ? estimatePaymentRowHeight
            : estimateNoteRowHeight
      const baseHeight = block.type === 'material' ? mm(18.5) : block.type === 'payment' ? mm(16.2) : mm(12)

      let used = baseHeight + BLOCK_GAP
      let fitCount = 0
      for (let i = 0; i < source.length; i += 1) {
        const nextUsed = used + rowHeightGetter(source[i])
        if (nextUsed > available) break
        fitCount += 1
        used = nextUsed
      }

      const totalRows = source.length
      const minSplitRemainder = block.type === 'material' ? 4 : 2
      let splitCount = fitCount

      if (fitCount > 0 && fitCount < totalRows) {
        const remaining = totalRows - fitCount
        const maxSplitRows = totalRows - minSplitRemainder

        if (maxSplitRows <= 0) {
          splitCount = 0
        } else if (remaining < minSplitRemainder) {
          const canMoveWhole =
            currentPage.length > 0 &&
            estimateBlockHeight(block) <= regularPageLimit
          if (canMoveWhole) {
            splitCount = 0
          } else {
            splitCount = Math.min(splitCount, maxSplitRows)
            if (splitCount >= totalRows) splitCount = 0
          }
        }
      }

      if (splitCount > 0 && splitCount < totalRows) {
        const splitResult = createSplitBlocks(block, splitCount, splitTag)
        splitTag += 2
        currentPage.push(splitResult.fitted)
        currentHeight += estimateBlockHeight(splitResult.fitted)
        pending.unshift(splitResult.remaining)
      } else if (fitCount === totalRows) {
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

  if (pages[0].length === 0 && pages.length > 1 && pages[1].length > 0) {
    const moved = pages[1].shift()
    if (moved) pages[0].push(moved)
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

const renderScopeRow = (item, index, items, serialOffset = 0) => {
  const rowKey = item?.id || `${item?.text || 'scope'}-${index}`
  const serial =
    serialOffset + items.slice(0, index + 1).filter((entry) => !entry?.isSubTitle).length

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
  <View style={styles.block}>
    <View style={styles.descriptionHeader}>
      <Text style={styles.descriptionHeaderText}>{safeText(block?.name)}</Text>
    </View>
    <View style={styles.scopeTable}>
      {(block?.items || []).map((item, index, rows) =>
        renderScopeRow(item, index, rows, block?.serialOffset || 0),
      )}
    </View>
  </View>
)

const MaterialBlock = ({ block }) => (
  <View style={styles.block}>
    {!block?.continued ? <Text style={styles.materialHeading}>MATERIAL SPECIFICATION</Text> : null}
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
  <View style={styles.block}>
    <Text style={styles.notesHeading}>• Notes:</Text>
    {(block?.notes || []).map((note, index) => {
      const safeNote = safeText(note)
      if (isNoteSectionHeading(safeNote)) {
        return (
          <Text key={`note-heading-${index}`} style={styles.noteSectionHeading}>
            {safeNote}
          </Text>
        )
      }

      const visitMatch = safeNote.match(/^(\d+(?:st|nd|rd|th)\s+Visit:)\s*(.*)$/i)
      return (
        <View key={`note-${index}`} style={styles.noteRow}>
          <Text style={styles.noteBullet}>•</Text>
          <Text style={styles.noteText}>
            {visitMatch ? <Text style={styles.noteVisitLabel}>{visitMatch[1]} </Text> : null}
            {visitMatch ? visitMatch[2] : safeNote}
          </Text>
        </View>
      )
    })}
  </View>
)

const PaymentBlock = ({ block }) => (
  <View style={styles.block}>
    <Text style={styles.paymentHeading}>PAYMENT SCHEDULE:</Text>
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
          <Text style={styles.metaLine}><Text style={styles.metaLabel}>GST NO. :</Text> {safeText(quotation?.gstNumber)}</Text>
        ) : null}
      </View>
      <View style={styles.clientMetaColRight}>
        <Text style={styles.metaDate}><Text style={styles.metaLabel}>DATE :</Text> {safeText(formatDateDDMMYYYY(quotation?.date))}</Text>
        {String(quotation?.totalSquareFeet ?? '').trim() ? (
          <View style={styles.metaSquareFeetBox}>
            <Text style={styles.metaSquareFeetText} wrap={false}>
              Total Project Area : {safeText(quotation?.totalSquareFeet)} sqft
            </Text>
          </View>
        ) : null}
      </View>
    </View>

    <Text style={styles.introLine}>
      {formatIntroForPdf({
        ...quotation,
        introText:
          quotation?.introText ||
          'Thank you for your inquiry. We are pleased to share our quotation for your interior requirements.',
      })}
    </Text>
    <Text style={styles.scopeOfWorkHeading}>SCOPE OF WORK</Text>
  </View>
)

const IconGlobe = () => (
  <Svg viewBox="0 0 24 24" style={styles.iconSvg}>
    <Circle cx="12" cy="12" r="9" stroke={COLORS.white} strokeWidth="2" />
    <Path d="M3 12h18" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 3v18" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" />
  </Svg>
)

const IconInstagram = () => (
  <Svg viewBox="0 0 24 24" style={styles.iconSvg}>
    <Path
      d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
      stroke={COLORS.white}
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="12" cy="12" r="3.5" stroke={COLORS.white} strokeWidth="2" fill="none" />
    <Circle cx="17" cy="7" r="1" fill={COLORS.white} />
  </Svg>
)

const IconLocation = () => (
  <Svg viewBox="0 0 24 24" style={styles.iconSvg}>
    <Path
      d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"
      stroke={COLORS.white}
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="10" r="2.5" stroke={COLORS.white} strokeWidth="2" fill="none" />
  </Svg>
)

const LastPageFooter = () => (
  <View style={styles.footerWrap} wrap={false}>
    <Text style={styles.footerCenterLine}>We look forward to transforming your space with elegance and functionality.</Text>
    <Text style={styles.footerCenterLine}>Thank you for considering Scarlet Interior Design.</Text>
    <Text style={styles.bestRegards}>Regards,</Text>

    <View style={styles.footerSignatureRow}>
      <Text style={styles.footerBrand}>SCARLET INTERIOR DESIGN</Text>
      <View style={styles.clientSignatureWrap}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureLabel}>Client Signature</Text>
      </View>
    </View>

    <View style={styles.linkSection}>
      <Text style={styles.linkTitle}>Meanwhile, you can explore our work here:</Text>
      <View style={styles.linkRow}>
        <Link src="https://scarletinteriordesign.com/">
          <View style={styles.linkIcon}><IconGlobe /></View>
        </Link>
        <Text style={styles.linkText}>www.scarletinteriordesign.com</Text>
      </View>
      <View style={styles.linkRow}>
        <Link src="https://www.instagram.com/scarletinteriordesigns?igsh=MjM2b3djN3hyZTNq">
          <View style={styles.linkIcon}><IconInstagram /></View>
        </Link>
        <Text style={styles.linkText}>@scarletinteriordesigns</Text>
      </View>
      <View style={styles.linkRow}>
        <Link src="https://share.google/5p1cPPZQ7WwhlyzWE">
          <View style={styles.linkIcon}><IconLocation /></View>
        </Link>
        <Text style={styles.linkText}>915, Satyamev Eminence, Science City Road, Sola, Ahmedabad</Text>
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
  const pages = isDesigningQuotation(quotation)
    ? paginateDesigningBlocks(blocks)
    : paginateBlocks(blocks, quotation)

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
    fontSize: 13,
    lineHeight: 1.4,
    position: 'relative',
  },
  pageInner: {
    flexDirection: 'column',
    flex: 1,
  },

  headerWrap: {
    marginTop: 0,
    marginBottom: mm(6.8),
  },
  headerImage: {
    width: '100%',
    height: mm(52),
    objectFit: 'contain',
  },

  clientSectionWrap: {
    marginBottom: mm(7.4),
  },
  quotationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.red,
    marginTop: mm(3.2),
    marginBottom: mm(8.5),
  },
  clientMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mm(7.6),
    gap: mm(4),
  },
  clientMetaColLeft: {
    width: '62%',
  },
  clientMetaColRight: {
    width: '38%',
    alignItems: 'flex-end',
  },
  metaLine: {
    fontSize: 13.2,
    lineHeight: 1.46,
    marginBottom: mm(1.2),
  },
  metaDate: {
    fontSize: 13.6,
    lineHeight: 1.46,
  },
  metaSquareFeetBox: {
    backgroundColor: COLORS.red,
    borderRadius: mm(2.2),
    paddingVertical: mm(1.5),
    paddingHorizontal: mm(2.6),
    marginTop: mm(2.2),
  },
  metaSquareFeetText: {
    fontSize: 12.8,
    lineHeight: 1.35,
    color: COLORS.white,
    fontWeight: 'bold',
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
    fontSize: 12.6,
    lineHeight: 1.5,
    marginBottom: mm(7.4),
  },
  scopeOfWorkHeading: {
    fontSize: 13.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: mm(3.6),
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
    fontSize: 13,
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
    fontSize: 12.4,
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
    fontSize: 10.4,
    fontWeight: 'bold',
  },
  scopeTextWrap: {
    flex: 1,
  },
  scopeItemText: {
    fontSize: 12.5,
    lineHeight: 1.38,
  },

  materialHeading: {
    fontSize: 13.8,
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
    fontSize: 12.6,
    fontWeight: 'bold',
  },
  materialCellText: {
    fontSize: 11.6,
    lineHeight: 1.38,
  },

  notesHeading: {
    fontSize: 13.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: mm(1.5),
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: mm(1.2),
  },
  noteSectionHeading: {
    fontSize: 12.2,
    fontWeight: 'bold',
    marginTop: mm(1.4),
    marginBottom: mm(1.2),
  },
  noteBullet: {
    width: mm(4),
    fontSize: 10.6,
    marginTop: 1,
  },
  noteText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 1.4,
  },
  noteVisitLabel: {
    fontWeight: 'bold',
  },

  paymentHeading: {
    fontSize: 13.8,
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: COLORS.red,
    marginBottom: mm(1.5),
  },
  paymentIntro: {
    fontSize: 11.8,
    marginBottom: mm(1.4),
  },
  paymentItemText: {
    fontSize: 11.8,
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
    fontSize: 13.2,
    fontWeight: 'bold',
  },
  totalRightText: {
    color: COLORS.black,
    fontSize: 13.2,
    fontWeight: 'bold',
  },

  footerWrap: {
    marginTop: mm(2.2),
    marginBottom: mm(44),
  },
  footerCenterLine: {
    textAlign: 'center',
    fontSize: 11.5,
    marginBottom: 2,
  },
  bestRegards: {
    fontSize: 11.8,
    marginTop: mm(1.4),
    marginBottom: mm(1.5),
  },
  footerSignatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerBrand: {
    fontSize: 12.4,
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
    fontSize: 11,
  },
  linkSection: {
    marginTop: mm(4),
    gap: mm(2.2),
  },
  linkTitle: {
    fontSize: 11.4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: mm(1),
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
  },
  linkIcon: {
    width: mm(8.4),
    height: mm(8.4),
    borderRadius: mm(4.2),
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mm(2.8),
  },
  iconSvg: {
    width: mm(5.4),
    height: mm(5.4),
  },
  linkText: {
    fontSize: 10.8,
    color: COLORS.black,
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
    fontSize: 11.2,
    color: COLORS.mutedText,
  },
})

export default QuotationPDFDocument
