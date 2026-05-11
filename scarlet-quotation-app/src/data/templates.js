import { threeBhkTurnkeyTemplates } from './threeBhkTurnkeyTemplates'
import { twoBhkTurnkeyTemplates } from './twoBhkTurnkeyTemplates'
import { fourBhkTurnkeyTemplates } from './fourBhkTurnkeyTemplates'
import { twoBhkDesigningTemplates } from './twoBhkDesigningTemplates'
import { threeBhkDesigningTemplates } from './threeBhkDesigningTemplates'
import { fourBhkDesigningTemplates } from './fourBhkDesigningTemplates'
import { standardMaterialSpec, premiumMaterialSpec, luxuryMaterialSpec } from './materialSpecData'

export const paymentSchedules = {
  'turnkey-6stage': [
    { stage: 'At the stage of project confirmation', percentage: '10%' },
    { stage: 'At the stage of POP & Electric work', percentage: '20%' },
    { stage: 'Before commencement of work / At Site Ply delivery time', percentage: '30%' },
    { stage: 'After 30 days of commencement of work / At Laminate selection time', percentage: '25%' },
    { stage: 'After 50 days of commencement of work / After color stage', percentage: '10%' },
    { stage: 'Before handover of project & delivery of all loose items', percentage: '5%' },
  ],
  'designing-4stage': [
    { stage: 'At the stage of project confirmation', percentage: '30%' },
    { stage: 'After providing 3D render', percentage: '50%' },
    { stage: 'After providing 2d details', percentage: '10%' },
    { stage: 'After providing Mood board and Color Palate', percentage: '10%' },
  ],
}

export const defaultNotes = [
  'In case of non-negotiable rates except above, that rate should be decided as per given with material item rate or decided on site',
  'Electric appliances such as fan, chimney, hob, geyser, AC, TV, refrigerator, microwave, oven etc. is not included',
  'Decorative light such as hanging, chandelier, picture light magnetic light is not included',
  'Furniture which is not mentioned above will be charged extra.',
  'If there is no provision of the labor lift whatever the labor charge for placing material after 3rd floor will be charge floor wise.',
  'Above rates are given before design.',
  'Mentioned furniture may vary after face to face discussion with client.',
  'Client shall provide enough water and electric supply at work area at free of cost.',
  'Rates for site development and elevation items shall be charged extra.',
  'Material selection and decision as per interior consultant and client.',
  'All matters are subject to Ahmedabad jurisdiction.',
  'All taxes are excluding from these rates.',
]


const makeTemplate = ({
  title,
  introText,
  sections,
  estimatedCost,
  paymentSchedule,
  packageType = 'standard',
  materialSpec,
  notes,
}) => ({
  title,
  introText,
  sections,
  materialSpec: materialSpec ?? getMaterialSpec(packageType),
  notes: notes ?? defaultNotes,
  paymentSchedule,
  estimatedCost,
  packageType,
})

const getMaterialSpec = (pkg) => {
  const safePackage = String(pkg || 'standard').toLowerCase()
  if (safePackage === 'premium') return premiumMaterialSpec
  if (safePackage === 'luxurious' || safePackage === 'luxury') return luxuryMaterialSpec
  return standardMaterialSpec
}

const commonTurnkeySections2Bhk = [
  {
    name: 'VESTIBULE',
    items: [
      'Shoe rack in laminate finish : 3\'-0" x 2\'-6"',
      'Door grill in laminate finish & CNC grill design',
      'Wall Color',
      'Light Fittings [Panel Light and Rope Light]',
    ],
  },
  {
    name: 'DRAWING ROOM',
    items: [
      'Designer Sofa - 5 Seaters [L Shape or 3 + 2]',
      'Centre Table [Quantity - 1]',
      'Designer T.V. unit in laminate finish with 4\'-0" x lintel height',
      'False ceiling in gypsum board with color finish',
      'Decorative main wall with punning, texture or wall paper',
      'Arabian Curtains with standard hardware',
      'Wall Colour',
      'Light Fittings [Panel Light and Rope Light]',
    ],
  },
  {
    name: 'KITCHEN & DINING',
    items: [
      'Under platform storage in laminate finish',
      '5 tandem baskets [Basic]',
      'Over-head storage: Lintel height with shutter in laminate finish',
      'False ceiling in gypsum board with colour finish',
      'Wall color',
      'Light fittings [Panel light and Rope light]',
    ],
  },
]

export const templates = {
  '2BHK-turnkey-standard': {
    title: 'Quotation For 2 BHK Interior Design',
    introText: twoBhkTurnkeyTemplates.STANDARD.introText,
    sections: twoBhkTurnkeyTemplates.STANDARD.sections,
    materialSpec: twoBhkTurnkeyTemplates.STANDARD.materialSpec,
    notes: defaultNotes,
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: twoBhkTurnkeyTemplates.STANDARD.estimatedCost,
  },
  '2BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 2 BHK Interior Design',
    introText: 'Premium turnkey quotation including upgraded finishes and enhanced modular solutions for 2 BHK residence.',
    sections: commonTurnkeySections2Bhk,
    packageType: 'premium',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '9,21,000',
  }),
  '3BHK-turnkey-standard': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: threeBhkTurnkeyTemplates.STANDARD.introText,
    sections: threeBhkTurnkeyTemplates.STANDARD.sections,
    materialSpec: threeBhkTurnkeyTemplates.STANDARD.materialSpec,
    packageType: 'standard',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.STANDARD.estimatedCost,
  }),
  '3BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: threeBhkTurnkeyTemplates.PREMIUM.introText,
    sections: threeBhkTurnkeyTemplates.PREMIUM.sections,
    materialSpec: threeBhkTurnkeyTemplates.PREMIUM.materialSpec,
    packageType: 'premium',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.PREMIUM.estimatedCost,
  }),
  '3BHK-turnkey-luxurious': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: threeBhkTurnkeyTemplates.LUXURIOUS.introText,
    sections: threeBhkTurnkeyTemplates.LUXURIOUS.sections,
    materialSpec: threeBhkTurnkeyTemplates.LUXURIOUS.materialSpec,
    packageType: 'luxurious',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.LUXURIOUS.estimatedCost,
  }),
  '4BHK-turnkey-standard': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: fourBhkTurnkeyTemplates.STANDARD.introText,
    sections: fourBhkTurnkeyTemplates.STANDARD.sections,
    materialSpec: fourBhkTurnkeyTemplates.STANDARD.materialSpec,
    packageType: 'standard',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: fourBhkTurnkeyTemplates.STANDARD.estimatedCost,
  }),
  '4BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: fourBhkTurnkeyTemplates.PREMIUM.introText,
    sections: fourBhkTurnkeyTemplates.PREMIUM.sections,
    materialSpec: fourBhkTurnkeyTemplates.PREMIUM.materialSpec,
    packageType: 'premium',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: fourBhkTurnkeyTemplates.PREMIUM.estimatedCost,
  }),
  '4BHK-turnkey-luxurious': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: fourBhkTurnkeyTemplates.LUXURIOUS.introText,
    sections: fourBhkTurnkeyTemplates.LUXURIOUS.sections,
    materialSpec: fourBhkTurnkeyTemplates.LUXURIOUS.materialSpec,
    packageType: 'luxurious',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: fourBhkTurnkeyTemplates.LUXURIOUS.estimatedCost,
  }),
  '2BHK-designing-standard': makeTemplate({
    title: twoBhkDesigningTemplates.STANDARD.title,
    introText: twoBhkDesigningTemplates.STANDARD.introText,
    sections: twoBhkDesigningTemplates.STANDARD.sections,
    materialSpec: [],
    notes: twoBhkDesigningTemplates.STANDARD.notes,
    paymentSchedule: 'designing-4stage',
    estimatedCost: twoBhkDesigningTemplates.STANDARD.estimatedCost,
  }),
  '3BHK-designing-standard': makeTemplate({
    title: threeBhkDesigningTemplates.STANDARD.title,
    introText: threeBhkDesigningTemplates.STANDARD.introText,
    sections: threeBhkDesigningTemplates.STANDARD.sections,
    materialSpec: [],
    notes: threeBhkDesigningTemplates.STANDARD.notes,
    paymentSchedule: 'designing-4stage',
    estimatedCost: threeBhkDesigningTemplates.STANDARD.estimatedCost,
  }),
  '4BHK-designing-standard': makeTemplate({
    title: fourBhkDesigningTemplates.STANDARD.title,
    introText: fourBhkDesigningTemplates.STANDARD.introText,
    sections: fourBhkDesigningTemplates.STANDARD.sections,
    materialSpec: [],
    notes: fourBhkDesigningTemplates.STANDARD.notes,
    paymentSchedule: 'designing-4stage',
    estimatedCost: fourBhkDesigningTemplates.STANDARD.estimatedCost,
  }),
}

export const getTemplateKey = ({ bhkType, quotationType, packageType }) => {
  const safeBhk = bhkType || '2BHK'
  const safeType = quotationType === 'Only Designing (3D Visualization)' ? 'designing' : 'turnkey'
  const safePackage = (packageType || 'STANDARD').toLowerCase()
  return `${safeBhk}-${safeType}-${safePackage}`
}
