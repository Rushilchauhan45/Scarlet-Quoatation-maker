import { threeBhkTurnkeyTemplates } from './threeBhkTurnkeyTemplates'
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
}) => ({
  title,
  introText,
  sections,
  materialSpec: materialSpec ?? getMaterialSpec(packageType),
  notes: defaultNotes,
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
    introText:
      'Thank you for your inquiry. With reference to our recent discussion, we are pleased to share our basic interior package quotation including furniture and essential decor work for 2 BHK residence.',
    sections: [
      ...commonTurnkeySections2Bhk,
      {
        name: 'MASTER BEDROOM',
        items: [
          'Bed in laminate finish with hydraulic storage : 5\'-6"x6\'-6"',
          'Decorative head board in tapestry finish : 5\'-6"x3\'-6"',
          'Punning, or texture on main wall',
          'Side table in laminate finish [Quantity - 1]',
          'Dressing mirror',
          'Wardrobe sliding/openable in laminate finish with full height loft',
          'Roman Curtains with standard hardware',
          'False ceiling in gypsum board with colour finish',
          'Wall colour',
          'Light fittings [Panel light and Rope light]',
        ],
      },
      {
        name: 'BEDROOM - 1',
        items: [
          'Bed in laminate finish with hydraulic storage : 5\'-0"x6\'-6"',
          'Decorative head board in tapestry finish : 5\'-0"x2\'-6"',
          'Side table in laminate finish [Quantity - 1]',
          'Wardrobe sliding/openable in laminate finish with full height loft',
          'Dressing mirror',
          'False ceiling in gypsum board with colour finish',
          'Roman Curtains with standard hardware',
          'Wall color',
          'Light fittings [Panel light and Rope light]',
        ],
      },
    ],
    materialSpec: [
      ...standardMaterialSpec,
      { material: 'Sofa', specification: '5 Seaters', clarity: 'Rs. 40,000/- Sofa Set' },
      { material: 'Centre table', specification: 'Imported', clarity: 'Rs. 8,000/- Maximum' },
      { material: 'Total light fixtures', specification: '20 Pieces', clarity: 'More than 20 fixtures will be charged extra.' },
    ],
    notes: defaultNotes,
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '8,21,000',
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
    packageType: 'standard',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.STANDARD.estimatedCost,
  }),
  '3BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: threeBhkTurnkeyTemplates.PREMIUM.introText,
    sections: threeBhkTurnkeyTemplates.PREMIUM.sections,
    packageType: 'premium',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.PREMIUM.estimatedCost,
  }),
  '3BHK-turnkey-luxurious': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: threeBhkTurnkeyTemplates.LUXURIOUS.introText,
    sections: threeBhkTurnkeyTemplates.LUXURIOUS.sections,
    packageType: 'luxurious',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: threeBhkTurnkeyTemplates.LUXURIOUS.estimatedCost,
  }),
  '4BHK-turnkey-standard': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: 'Standard turnkey interior quotation for 4 BHK residences.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 3', items: ['Bed with storage', 'Wardrobe', 'Curtains', 'Light fittings'] }],
    packageType: 'standard',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '23,99,000',
  }),
  '4BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: 'Premium turnkey interior package for 4 BHK with upgraded hardware and finishes.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 3', items: ['Premium bed', 'Premium wardrobe', 'False ceiling', 'Light fittings'] }],
    packageType: 'premium',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '27,99,000',
  }),
  '4BHK-turnkey-luxurious': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: 'Luxurious turnkey interior package for 4 BHK with high-end detailing and finishes.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 3', items: ['Luxury bed', 'Luxury wardrobe', 'Designer wall treatment', 'Premium light fittings'] }],
    packageType: 'luxurious',
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '31,99,000',
  }),
  '2BHK-designing-standard': {
    title: 'Quotation For Interior Designing',
    introText:
      'Thank you for your inquiry. With reference to our recent discussion, we are pleased to share our basic quote for 3D Rendering and visualization.',
    sections: [
      {
        name: 'Scope of Work',
        items: [
          'Presentable 2D furniture lay-out',
          'Electric details with loop drawing, switchboard details, light details and electric schedule.',
          'False ceiling details with section detail and 3D modelling',
          'Interior concept and theme presented in 3d modelling',
          'Render 3d images after finalizing 3d modelling [2 BHK - 8 views]',
          '2D presentable details with furniture working drawings',
          'Color Palate and Mood board',
          'Material selection with client',
          'Site Visit [10 Visits]',
        ],
      },
    ],
    materialSpec: [],
    notes: [
      '[1] Site Visit Policy (within 30 KM of Ahmedabad): Up to 10 site visits are included. Additional visits: ₹4,000/- per visit.',
      '[2] Site Visit Policy (beyond 30 KM): 3 included visits at defined stages. Additional visits: ₹8,000/- per visit.',
      '[3] Quotation Customization: This is a standard quotation and can be customized as per requirements.',
    ],
    paymentSchedule: 'designing-4stage',
    estimatedCost: '80,000',
  },
  '3BHK-designing-standard': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '3 BHK designing quotation for 3D visualization and interior planning services.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [12 views]', '2D working drawings', 'Mood board', 'Site visits'] }],
    materialSpec: [],
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,20,000',
  }),
  '3BHK-designing-premium': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '3 BHK premium designing quotation with detailed visualization and broader drawing coverage.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [16 views]', '2D working drawings with sections', 'Mood board + material guidance', 'Site visits'] }],
    materialSpec: [],
    packageType: 'premium',
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,45,000',
  }),
  '3BHK-designing-luxurious': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '3 BHK luxurious designing quotation with advanced 3D detailing and complete concept support.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [20 views]', '2D working drawings with advanced detailing', 'Mood board + curated finishes', 'Site visits'] }],
    materialSpec: [],
    packageType: 'luxurious',
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,75,000',
  }),
  '4BHK-designing-standard': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '4 BHK designing quotation for complete planning and visualization services.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [15 views]', '2D working drawings', 'Material coordination', 'Site visits'] }],
    materialSpec: [],
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,50,000',
  }),
  '4BHK-designing-premium': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '4 BHK premium designing quotation with richer concept coverage and additional drawing support.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [20 views]', '2D working drawings with sections', 'Material coordination', 'Site visits'] }],
    materialSpec: [],
    packageType: 'premium',
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,80,000',
  }),
  '4BHK-designing-luxurious': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '4 BHK luxurious designing quotation with complete visual detailing and premium concept development.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [24 views]', '2D detailed working drawings', 'Material coordination + premium palette', 'Site visits'] }],
    materialSpec: [],
    packageType: 'luxurious',
    paymentSchedule: 'designing-4stage',
    estimatedCost: '2,20,000',
  }),
}

export const getTemplateKey = ({ bhkType, quotationType, packageType }) => {
  const safeBhk = bhkType || '2BHK'
  const safeType = quotationType === 'Only Designing (3D Visualization)' ? 'designing' : 'turnkey'
  const safePackage = (packageType || 'STANDARD').toLowerCase()
  return `${safeBhk}-${safeType}-${safePackage}`
}
