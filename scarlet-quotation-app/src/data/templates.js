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

const baseMaterialSpec = [
  { material: 'False ceiling', specification: "Khushbu company's gypsum Sheet, Size - 12.5mm with 8 kg capacity", clarity: '' },
  { material: 'Fabric for Curtain & Lining Work', specification: 'Sarrom / GM / F&F / Divine / Ddecor Etc Depending on Selection', clarity: 'Fabric price : approximately 400/- Rs. Per Meter' },
  { material: 'Light fitting', specification: 'G Jaks or Similar', clarity: 'Panel Lights & Rope Lights with minimum 02 Years warranty.' },
  { material: 'Inner Laminate', specification: '0.8 MM Fabric or Wooden Finish', clarity: 'Durian or Similar 400/- Rs. Per Sheet' },
  { material: 'Outer Laminate', specification: 'Levin/ Sunmica / Durian / Airolam / Armany and many other brands depend on selection', clarity: 'Average price is 1200/- Rs. Per Sheet for entire house.' },
  { material: 'Ply Wood', specification: 'Alternate Ply IS303 MR Grade plywood', clarity: 'Approximately Rs. 62/- to Rs. 65/- Per Square ft.' },
  { material: 'Hardware', specification: 'Vita Or Similar brand', clarity: 'Standard-grade hardware considered; premium upgrades charged additionally.' },
]

const makeTemplate = ({ title, introText, sections, estimatedCost, paymentSchedule }) => ({
  title,
  introText,
  sections,
  materialSpec: baseMaterialSpec,
  notes: defaultNotes,
  paymentSchedule,
  estimatedCost,
})

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
      ...baseMaterialSpec,
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
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '9,21,000',
  }),
  '3BHK-turnkey-standard': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: 'Basic 3 BHK turnkey interior quotation for practical and elegant execution.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 2', items: ['Bed with storage', 'Wardrobe', 'False ceiling', 'Light fittings'] }],
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '12,99,000',
  }),
  '3BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: 'Premium 3 BHK turnkey package with higher-grade finish materials.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 2', items: ['Bed with storage', 'Wardrobe with loft', 'Designer wall finish', 'Light fittings'] }],
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '15,99,000',
  }),
  '3BHK-turnkey-luxurious': makeTemplate({
    title: 'Quotation For 3 BHK Interior Design',
    introText: 'Luxurious 3 BHK package using premium finish standards including PU/Veneer-oriented elements.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 2', items: ['Premium bed with storage', 'Premium wardrobe', 'Designer details', 'Premium light fittings'] }],
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '17,51,000',
  }),
  '4BHK-turnkey-standard': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: 'Standard turnkey interior quotation for 4 BHK residences.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 3', items: ['Bed with storage', 'Wardrobe', 'Curtains', 'Light fittings'] }],
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '23,99,000',
  }),
  '4BHK-turnkey-premium': makeTemplate({
    title: 'Quotation For 4 BHK Interior Design',
    introText: 'Premium turnkey interior package for 4 BHK with upgraded hardware and finishes.',
    sections: [...commonTurnkeySections2Bhk, { name: 'BEDROOM - 3', items: ['Premium bed', 'Premium wardrobe', 'False ceiling', 'Light fittings'] }],
    paymentSchedule: 'turnkey-6stage',
    estimatedCost: '27,99,000',
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
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,20,000',
  }),
  '4BHK-designing-standard': makeTemplate({
    title: 'Quotation For Interior Designing',
    introText: '4 BHK designing quotation for complete planning and visualization services.',
    sections: [{ name: 'Scope of Work', items: ['3D renders [15 views]', '2D working drawings', 'Material coordination', 'Site visits'] }],
    paymentSchedule: 'designing-4stage',
    estimatedCost: '1,50,000',
  }),
}

export const getTemplateKey = ({ bhkType, quotationType, packageType }) => {
  const safeBhk = bhkType || '2BHK'
  const safeType = quotationType === 'Only Designing (3D Visualization)' ? 'designing' : 'turnkey'
  const safePackage = safeType === 'designing' ? 'standard' : (packageType || 'STANDARD').toLowerCase()
  return `${safeBhk}-${safeType}-${safePackage}`
}
