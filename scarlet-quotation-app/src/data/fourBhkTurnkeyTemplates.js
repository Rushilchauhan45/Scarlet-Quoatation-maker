const pricedItem = ({
  text,
  paramLabel,
  paramValue,
  rate,
  usesGlobalSqft = false,
  hideInPdf = false,
  isSubTitle = false,
  editableRate = false,
}) => ({
  text,
  paramLabel,
  paramValue: String(paramValue),
  pricing: { rate: Number(rate) },
  usesGlobalSqft,
  hideInPdf,
  isSubTitle,
  editableRate,
  amount: String(Math.round(Number(rate) * Number(paramValue))),
  manualAmount: false,
})

const displayItem = ({ text, isSubTitle = false }) => ({
  text,
  paramLabel: '',
  paramValue: '',
  pricing: null,
  usesGlobalSqft: false,
  hideInPdf: false,
  isSubTitle,
  amount: '',
  manualAmount: true,
})

const subTitle = (text) => displayItem({ text, isSubTitle: true })

const section = (name, items) => ({ name, items })

const fourBhkStandardMaterialSpec = [
  {
    material: 'False ceiling',
    specification: "Khushbu company's gypsum Sheet, Size - 12.5 mm with 8 kg capacity",
    clarity: '',
  },
  {
    material: 'Fabric for Curtain & Lining Work',
    specification: 'Sarrom / GM / F&F / Divine / Ddecor Etc Depending on Selection',
    clarity: 'Fabric price considered is approximately 600/- Rs. Per Meter',
  },
  {
    material: 'Light fitting',
    specification: 'Orient',
    clarity: 'Panel Lights & Rope Lights which provide minimum 02 Years of product warranty.',
  },
  {
    material: 'Inner Laminate',
    specification: '0.8 MM Fabric or Wooden Finish',
    clarity: 'Durian, Pheno-lam or Similar',
  },
  {
    material: 'Outer Laminate',
    specification: 'Levin/ The Laminate / Durian / Airolam / Armany and many other brands depend on Selection',
    clarity: 'Average price is between Rs. 1500/- to Rs. 1700/- Per Sheet for entire house.',
  },
  {
    material: 'Veneer Finish',
    specification: '',
    clarity: 'Rs. 100/- : Per Square Feet',
  },
  {
    material: 'Kitchen Tandem Channel',
    specification: 'Godrej',
    clarity: 'Average price: Rs.2200/- to Rs. 2500/- Per tandem channel',
  },
  {
    material: 'Ply Wood',
    specification: 'Alternate Ply IS303 MR Grade plywood',
    clarity: 'Approximately Rs. 65/- to Rs. 70/- : Per Square ft.',
  },
  {
    material: 'Electric Wire',
    specification: 'Orbit, Finolex , RR or Similar',
    clarity: '',
  },
  {
    material: 'Hardware Regular (Telescopic Channel / Auto Hinges / Mijagra / Gas Pumps / Bed Hydraulic / Wardrobe Sliding etc)',
    specification: 'Godrej',
    clarity:
      'All hardware and materials are standard level of specified brand, any upgrade or preference in particular mechanism or system will be billed additionally. Drawer Channel - Telescopic Channel are not-Soft close Hinges for shutters are Soft Close. Wardrobe Sliding Channels are Soft Close',
  },
  {
    material: 'Decorative Door Handles & Locks of door grill [Safety Door]',
    specification: 'Europa or Similar',
    clarity: 'Rs. 2000/- to Rs. 2200/- Per Piece',
  },
  {
    material: 'White Glue (Fevicol)',
    specification: 'Blue Coat Marine, Euro or Similar',
    clarity: '',
  },
  {
    material: 'Screws/Nuts/Bolts Etc.',
    specification: 'As per Market Availability',
    clarity: '',
  },
  {
    material: 'Color & PU',
    specification: 'Asian Royal Paint or Similar',
    clarity: '',
  },
  {
    material: 'Sofa',
    specification: '8 Seaters',
    clarity: 'Rs. 80,000/- Maximum',
  },
  {
    material: 'Dining Table',
    specification: '6 Seaters',
    clarity: 'Rs. 60,000/- Maximum',
  },
  {
    material: 'Corner Table',
    specification: 'Imported',
    clarity: 'Rs. 8,000/- Maximum',
  },
  {
    material: 'Centre table',
    specification: 'Imported',
    clarity: 'Rs. 15,000/- Maximum',
  },
  {
    material: 'New Electric Points',
    specification: 'Total 28 extra points',
    clarity: 'More than 28 points will be charged extra. [Rs. 1500/- : per extra point]',
  },
]

const fourBhkPremiumMaterialSpec = [
  {
    material: 'False ceiling',
    specification: 'Gyproc',
    clarity: '',
  },
  {
    material: 'Fabric for Curtain & Lining Work',
    specification: 'Sarrom / GM / F&F / Divine / Ddecor Etc Depending on Selection',
    clarity: 'Fabric price considered is approximately 700/- Rs. Per Meter',
  },
  {
    material: 'Light fitting',
    specification: 'Orient, Philips or Neptune',
    clarity: 'Panel Lights & Rope Lights which provide minimum 02 Years of product warranty.',
  },
  {
    material: 'Inner Laminate',
    specification: '0.8 MM Fabric or Wooden Finish',
    clarity: 'Durian, Pheno-lam or Similar',
  },
  {
    material: 'Outer Laminate',
    specification: 'Levin/ The Laminate / Durian / Airolam / Armany and many other brands depend on Selection',
    clarity: 'Average price is between Rs. 1800/- to Rs. 2000/- Per Sheet for entire house.',
  },
  {
    material: 'Veneer Finish',
    specification: '',
    clarity: 'Rs. 100/- : Per Square Feet',
  },
  {
    material: 'Kitchen Tandem Channel',
    specification: 'Hettich',
    clarity: 'Average price: Rs.2700/- to Rs. 3300/- Per tandem channel',
  },
  {
    material: 'Ply Wood',
    specification: 'Alternate Ply IS303 MR Grade plywood',
    clarity: 'Approximately Rs. 70/- to Rs. 75/- : Per Square ft.',
  },
  {
    material: 'Electric Wire',
    specification: 'Orbit, Finolex , RR or Similar',
    clarity: '',
  },
  {
    material: 'Hardware Regular (Telescopic Channel / Auto Hinges / Mijagra / Gas Pumps / Bed Hydraulic / Wardrobe Sliding etc)',
    specification: 'Godrej',
    clarity:
      'All hardware and materials are standard level of specified brand, any upgrade or preference in particular mechanism or system will be billed additionally. Drawer Channel - Telescopic Channel are not-Soft close Hinges for shutters are Soft Close. Wardrobe Sliding Channels are Soft Close',
  },
  {
    material: 'Decorative Door Handles & Locks of door grill [Safety Door]',
    specification: 'Europa or Similar',
    clarity: 'Rs. 2500/- to Rs. 3000/- Per Piece',
  },
  {
    material: 'White Glue (Fevicol)',
    specification: 'Blue Coat Marine, Euro, Fevicol Marine or Similar',
    clarity: '',
  },
  {
    material: 'Screws/Nuts/Bolts Etc.',
    specification: 'As per Market Availability',
    clarity: '',
  },
  {
    material: 'Color & PU',
    specification: 'Asian Royal Paint or Similar',
    clarity: '',
  },
  {
    material: 'Designer Sofa',
    specification: '8 Seaters',
    clarity: 'Rs. 95,000/- Maximum',
  },
  {
    material: 'Dining Table',
    specification: '6 Seaters',
    clarity: 'Rs. 70,000/- Maximum',
  },
  {
    material: 'Corner Table',
    specification: 'Imported',
    clarity: 'Rs. 10,000/- Maximum',
  },
  {
    material: 'Centre table',
    specification: 'Imported',
    clarity: 'Rs. 18,000/- Maximum',
  },
  {
    material: 'New Electric Points',
    specification: 'Total 28 extra points',
    clarity: 'More than 28 points will be charged extra. [Rs. 1500/- : per extra point]',
  },
]

const fourBhkLuxuryMaterialSpec = [
  {
    material: 'False ceiling',
    specification: 'Gyproc',
    clarity: '',
  },
  {
    material: 'Fabric for Curtain & Lining Work',
    specification: 'Sarrom / GM / F&F / Divine / Ddecor Etc Depending on Selection',
    clarity: 'Fabric price considered is approximately 800/- Rs. Per Meter',
  },
  {
    material: 'Light fitting',
    specification: 'Orient, Philips or Neptune',
    clarity: 'Panel Lights & Rope Lights which provide minimum 02 Years of product warranty.',
  },
  {
    material: 'Inner Laminate',
    specification: '0.8 MM Fabric or Wooden Finish',
    clarity: 'Durian, Pheno-lam or Similar',
  },
  {
    material: 'Outer Laminate',
    specification: 'Levin/ The Laminate / Durian / Airolam / Armany and many other brands depend on Selection',
    clarity: 'Average price is between Rs. 2000/- to Rs. 2200/- Per Sheet for entire house.',
  },
  {
    material: 'Veneer Finish',
    specification: '',
    clarity: 'Rs. 100/- : Per Square Feet',
  },
  {
    material: 'Kitchen Tandem Channel',
    specification: 'Hettich',
    clarity: 'Average price: Rs.2700/- to Rs. 3300/- Per tandem channel',
  },
  {
    material: 'Ply Wood',
    specification: 'Alternate Ply IS303 MR Grade plywood',
    clarity: 'Approximately Rs. 75/- to Rs. 80/- : Per Square ft.',
  },
  {
    material: 'Electric Wire',
    specification: 'Orbit, Finolex , RR or Similar',
    clarity: '',
  },
  {
    material: 'Hardware Regular (Telescopic Channel / Auto Hinges / Mijagra / Gas Pumps / Bed Hydraulic / Wardrobe Sliding etc)',
    specification: 'Hettich',
    clarity:
      'All hardware and materials are standard level of specified brand, any upgrade or preference in particular mechanism or system will be billed additionally. Drawer Channel - Telescopic Channel are not-Soft close Hinges for shutters are Soft Close. Wardrobe Sliding Channels are Soft Close',
  },
  {
    material: 'Decorative Door Handles & Locks of door grill [Safety Door]',
    specification: 'Europa or Similar',
    clarity: 'Rs. 3000/- to Rs. 3500/- Per Piece',
  },
  {
    material: 'White Glue (Fevicol)',
    specification: 'Blue Coat Marine, Euro, Fevicol Marine or Similar',
    clarity: '',
  },
  {
    material: 'Screws/Nuts/Bolts Etc.',
    specification: 'As per Market Availability',
    clarity: '',
  },
  {
    material: 'Color & PU',
    specification: 'Asian Royal Paint or Similar',
    clarity: '',
  },
  {
    material: 'Designer Sofa',
    specification: '8 Seaters',
    clarity: 'Rs. 1,05,000/- Maximum',
  },
  {
    material: 'Designer Sofa[Master Bedroom]',
    specification: '2 Seaters',
    clarity: 'Rs. 28,000/- Maximum',
  },
  {
    material: 'Dining Table',
    specification: '6 Seaters',
    clarity: 'Rs. 90,000/- Maximum',
  },
  {
    material: 'Designer Chair',
    specification: 'Imported',
    clarity: 'Rs. 15,000/- Per Chair',
  },
  {
    material: 'Corner Table',
    specification: 'Imported',
    clarity: 'Rs. 12,000/- Maximum',
  },
  {
    material: 'Centre table',
    specification: 'Imported',
    clarity: 'Rs. 20,000/- Maximum',
  },
  {
    material: 'Centre table[Master Bedroom]',
    specification: 'Imported',
    clarity: 'Rs. 12,000/- Maximum',
  },
  {
    material: 'New Electric Points',
    specification: 'Total 28 extra points',
    clarity: 'More than 28 points will be charged extra. [Rs. 1500/- : per extra point]',
  },
]

export const fourBhkTurnkeyTemplates = {
  STANDARD: {
    introText:
      `Respected Sir/Ma'am,

We are pleased to present our standard 4 BHK interior quotation, offering a comprehensive turnkey solution with practical finishes, complete room-wise furniture, and essential interior execution. This package is designed to enhance spacious living with a focus on functionality, refined aesthetics, and long-lasting quality. Our approach ensures a well-balanced design that meets both comfort and modern lifestyle requirements.`,
    estimatedCost: '24,99,000',
    materialSpec: fourBhkStandardMaterialSpec,
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in PU or Veneer finish : 6\'-0" x 2\'-6"', paramLabel: 'feet', paramValue: 15, rate: 1333.33 }),
        pricedItem({ text: 'Safety Door grill in PU or Veneer finish & CNC grill design', paramLabel: 'feet', paramValue: 21, rate: 952.38 }),
        pricedItem({ text: 'Door paneling in PU or Veneer finish ', paramLabel: 'feet', paramValue: 50, rate: 900 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 8 Seaters [4 + 4]', paramLabel: 'quantity', paramValue: 1, rate: 85000 }),
        pricedItem({ text: 'Puffy Stools [Quantity - 2]', paramLabel: 'quantity', paramValue: 2, rate: 7500 }),
        pricedItem({ text: 'Centre Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 15000 }),
        pricedItem({ text: 'Corner Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 8000 }),
        pricedItem({ text: 'Designer T.V. unit in laminate finish with 6\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 42, rate: 1071.43 }),
        pricedItem({ text: 'Decorative partition b/w drawing & dining in laminate finish : 3\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 21, rate: 1190.48 }),
        pricedItem({ text: 'Decorative main wall with paneling in laminate finish : 9\'-0" x 15\'-0"', paramLabel: 'feet', paramValue: 135, rate: 740.74 }),
        pricedItem({ text: 'Temple as per design in laminate finish : 4\'-0" x 2\'-0"', paramLabel: 'feet', paramValue: 8, rate: 3125 }),
        pricedItem({ text: 'A.C. pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in acrylic finish [Storage Length: 11\'-0"]', paramLabel: 'feet', paramValue: 27, rate: 2222.22 }),
        pricedItem({ text: '7 tandem baskets & 1 SS pull out', paramLabel: 'quantity', paramValue: 8, rate: 2500 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in acrylic finish', paramLabel: 'feet', paramValue: 22, rate: 1818.18 }),
        pricedItem({ text: 'Loft in laminate finish', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Service Platform in acrylic finish : 5\'-0" x 2\'-6"', paramLabel: 'feet', paramValue: 12, rate: 2083.33 }),
        pricedItem({ text: 'Rolling shutter in PVC finish', paramLabel: 'feet', paramValue: 8, rate: 2500 }),
        pricedItem({ text: 'Dining Table : 6 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 60000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 150 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-6" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 68, rate: 1176.47 }),
        pricedItem({ text: 'Simple T.V unit in laminate finish as per design', paramLabel: 'feet', paramValue: 35, rate: 1114.29 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1190.48 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 150 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1190.48 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 150 }),
        pricedItem({ text: 'A.C. Pelmet in color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('GUEST BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 150 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1190.48 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'All Doors Laminate change [10 Doors]', paramLabel: 'quantity', paramValue: 10, rate: 8000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 4, rate: 6250 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 70, rate: 360, editableRate: true }),
        pricedItem({ text: 'Master Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 360, editableRate: true }),
        pricedItem({ text: 'Semi Master Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 360, editableRate: true }),
        pricedItem({ text: 'Children Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 360, editableRate: true }),
        pricedItem({ text: 'Guest Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 360, editableRate: true }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light, Profile Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light and Profile Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Profile Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel light, COB Light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),
        pricedItem({
          text: 'Guest Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 70,
          editableRate: true,
        }),

        subTitle('False Ceiling'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 35,
          editableRate: true,
        }),

        subTitle('Wall Color'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 80,
          editableRate: true,
        }),
      ]),
    ],
  },

  PREMIUM: {
    introText:
      `Respected Sir/Ma'am,

We are pleased to present our Premium 4 BHK interior quotation, designed to offer an elevated living experience with a perfect blend of style, comfort, and functionality. This package includes thoughtfully designed room-wise furniture, upgraded finishes, elegant lighting solutions, and refined detailing across all spaces.

Our approach focuses on enhancing spacious layouts with smart planning, premium materials, and modern aesthetics to create a well-balanced and sophisticated home. This package is ideal for clients looking for a noticeable upgrade in quality and design while maintaining practicality and comfort.`,
    estimatedCost: '31,99,000',
    materialSpec: fourBhkPremiumMaterialSpec,
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in PU or Veneer finish : 6\'-0" x 2\'-6"', paramLabel: 'feet', paramValue: 15, rate: 1333.33 }),
        pricedItem({ text: 'Safety Door grill in PU or Veneer finish & CNC grill design', paramLabel: 'feet', paramValue: 21, rate: 1190.48 }),
        pricedItem({ text: 'Door paneling in PU or Veneer finish [60 Feet]', paramLabel: 'feet', paramValue: 60, rate: 900 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 8 Seaters [4 + 4]', paramLabel: 'quantity', paramValue: 1, rate: 95000 }),
        pricedItem({ text: 'Puffy Stools [Quantity - 2]', paramLabel: 'quantity', paramValue: 2, rate: 10000 }),
        pricedItem({ text: 'Centre Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 18000 }),
        pricedItem({ text: 'Corner Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 10000 }),
        pricedItem({ text: 'Designer T.V. unit in PU or Veneer finish with 6\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 42, rate: 1190.48 }),
        pricedItem({ text: 'Decorative partition b/w drawing & dining in PU or Veneer finish : 3\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 21, rate: 1428.57 }),
        pricedItem({ text: 'Decorative main wall with paneling in PU or Veneer finish : 9\'-0" x 15\'-0"', paramLabel: 'feet', paramValue: 135, rate: 814.81 }),
        pricedItem({ text: 'Designer Temple in PU or Veneer finish : 3\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 21, rate: 1666.67 }),
        pricedItem({ text: 'A.C. pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in acrylic finish [Storage Length: 11\'-0"]', paramLabel: 'feet', paramValue: 27, rate: 2407.41 }),
        pricedItem({ text: '7 tandem baskets & 1 SS pull out', paramLabel: 'quantity', paramValue: 8, rate: 3375 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in acrylic or glass finish', paramLabel: 'feet', paramValue: 22, rate: 2045.45 }),
        pricedItem({ text: 'Loft in acrylic finish', paramLabel: 'feet', paramValue: 20, rate: 1250 }),
        pricedItem({ text: 'Service Platform with Appliances storage in acrylic & glass finish : 5\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 35, rate: 1285.71 }),
        pricedItem({ text: 'Rolling shutter in PVC finish', paramLabel: 'feet', paramValue: 8, rate: 2500 }),
        pricedItem({ text: 'Dining Table : 6 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 70000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 38000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1111.11 }),
        pricedItem({ text: 'Designer Sofa - 2 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 22000 }),
        pricedItem({ text: 'Centre table [for master bedroom]', paramLabel: 'quantity', paramValue: 1, rate: 8000 }),
        pricedItem({ text: 'Side table in PU or Veneer finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2833.33 }),
        pricedItem({ text: 'Dressing mirror with storage in PU or Veneer finish', paramLabel: 'feet', paramValue: 15, rate: 2333.33 }),
        pricedItem({ text: 'Designer main wall with paneling in PU or Veneer finish as per design', paramLabel: 'feet', paramValue: 100, rate: 1200 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU, Veneer or glass finish with 7\'-6" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 68, rate: 1911.76 }),
        pricedItem({ text: 'Designer T.V unit in PU or Veneer finish as per design', paramLabel: 'feet', paramValue: 35, rate: 1285.71 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 38000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1111.11 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1269.84 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2700 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 180 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 38000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1111.11 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1269.84 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2700 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 180 }),
        pricedItem({ text: 'A.C. Pelmet in color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('GUEST BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5\'-6"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 38000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1111.11 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 180 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1269.84 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2700 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'All Doors Laminate change [10 Doors]', paramLabel: 'quantity', paramValue: 10, rate: 9000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 4, rate: 7500 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 70, rate: 614, editableRate: true }),
        pricedItem({ text: 'Master Bedroom - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 614, editableRate: true }),
        pricedItem({ text: 'Semi Master Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 440, editableRate: true }),
        pricedItem({ text: 'Children Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 440, editableRate: true }),
        pricedItem({ text: 'Guest Bedroom - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 440, editableRate: true }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light, Profile Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Open Track Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light and Profile Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Profile Light, Open Track Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel Light, COB Light, Profile Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light, COB Light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),
        pricedItem({
          text: 'Guest Bedroom - Panel light, COB Light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 90,
          editableRate: true,
        }),

        subTitle('False Ceiling'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 45,
          editableRate: true,
        }),

        subTitle('Wall Color'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 100,
          editableRate: true,
        }),
      ]),
    ],
  },

  LUXURIOUS: {
    introText:
      `Respected Sir/Ma'am,

We are delighted to present our Luxury 4 BHK interior quotation, crafted to deliver a truly exclusive and high-end living environment. This package includes designer furniture, top-grade materials, customized design elements, statement lighting, and rich finishes that add elegance and grandeur to every space.
Our design philosophy emphasizes attention to detail, personalized concepts, and superior craftsmanship to ensure a luxurious and timeless appeal. This package is perfect for those who desire a premium lifestyle with a refined, spacious, and uniquely designed home that reflects sophistication at every level.`,
    estimatedCost: '39,99,000',
    materialSpec: fourBhkLuxuryMaterialSpec,
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in Veneer finish : 6\'-0" x 2\'-6"', paramLabel: 'feet', paramValue: 15, rate: 1333.33 }),
        pricedItem({ text: 'Safety Door grill in PU or Veneer finish & CNC grill design', paramLabel: 'feet', paramValue: 21, rate: 1428.57 }),
        pricedItem({ text: 'Door paneling in PU or Veneer finish [70 Feet]', paramLabel: 'feet', paramValue: 70, rate: 900 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 8 Seaters [4 + 4]', paramLabel: 'quantity', paramValue: 1, rate: 105000 }),
        pricedItem({ text: 'Designer Chairs [Quantity - 2]', paramLabel: 'quantity', paramValue: 2, rate: 15000 }),
        pricedItem({ text: 'Centre Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 20000 }),
        pricedItem({ text: 'Corner Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 12000 }),
        pricedItem({ text: 'Designer T.V. unit in PU or Veneer finish with 6\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 42, rate: 1309.52 }),
        pricedItem({ text: 'Decorative partition b/w drawing & dining in PU or Veneer finish : 3\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 21, rate: 1666.67 }),
        pricedItem({ text: 'Decorative main wall with paneling in PU or Veneer finish : 9\'-0" x 15\'-0"', paramLabel: 'feet', paramValue: 135, rate: 814.81 }),
        pricedItem({ text: 'Designer Temple in PU or Veneer finish : 3\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 21, rate: 2857.14 }),
        pricedItem({ text: 'A.C. pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in acrylic finish [Storage Length: 11\'-0"]', paramLabel: 'feet', paramValue: 27, rate: 2592.59 }),
        pricedItem({ text: '7 tandem baskets & 1 SS pull out', paramLabel: 'quantity', paramValue: 8, rate: 3375 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in acrylic or glass finish', paramLabel: 'feet', paramValue: 22, rate: 2272.73 }),
        pricedItem({ text: 'Loft in acrylic finish', paramLabel: 'feet', paramValue: 20, rate: 1500 }),
        pricedItem({ text: 'Service Platform with Appliances storage in acrylic & glass finish : 5\'-0" x 7\'-0"', paramLabel: 'feet', paramValue: 35, rate: 1428.57 }),
        pricedItem({ text: 'Rolling shutter in PVC finish', paramLabel: 'feet', paramValue: 8, rate: 3125 }),
        pricedItem({ text: 'Breakfast Table in acrylic or Veneer finish : 4\'-0" x 2\'-0"', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Dining Table : 6 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 90000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 42000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1277.78 }),
        pricedItem({ text: 'Main wall with paneling in PU or Veneer finish : 9\'-0" x 12\'-0"', paramLabel: 'feet', paramValue: 108, rate: 1203.7 }),
        pricedItem({ text: 'Side table in PU or Veneer finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 3333.33 }),
        pricedItem({ text: 'Designer Sofa : 2 Seaters ', paramLabel: 'Per Seat', paramValue: 2, rate: 14000 }),
        pricedItem({ text: 'Centre table [Quantity - 1]', paramLabel: 'Quantity', paramValue: 1, rate: 12000 }),
        pricedItem({ text: 'Dressing mirror with storage in PU or Veneer finish', paramLabel: 'feet', paramValue: 15, rate: 2666.67 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU, Veneer or glass finish with 7\'-6" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 68, rate: 1911.76 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 42000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1277.78 }),
        pricedItem({ text: 'Side table in PU or Veneer finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 3333.33 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU or Veneer finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1904.76 }),
        pricedItem({ text: 'Dressing mirror with storage in PU or Veneer finish', paramLabel: 'feet', paramValue: 15, rate: 2666.67 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 200 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 42000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1277.78 }),
        pricedItem({ text: 'Side table in PU or Veneer finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 3333.33 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU or Veneer finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1904.76 }),
        pricedItem({ text: 'Dressing mirror with storage in PU or Veneer finish', paramLabel: 'feet', paramValue: 15, rate: 2666.67 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 200 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('GUEST BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 42000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 18, rate: 1277.78 }),
        pricedItem({ text: 'Side table in PU or Veneer finish [Quantity - 2]', paramLabel: 'feet', paramValue: 6, rate: 3333.33 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU or Veneer finish with 7\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 63, rate: 1904.76 }),
        pricedItem({ text: 'Dressing mirror with storage in PU or Veneer finish', paramLabel: 'feet', paramValue: 15, rate: 2666.67 }),
        pricedItem({ text: 'Main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 100, rate: 200 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 15, rate: 800 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'All Doors in PU or Veneer finish [10 Doors]', paramLabel: 'quantity', paramValue: 10, rate: 12000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 4, rate: 8000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 70, rate: 696, editableRate: true }),
        pricedItem({ text: 'Master Bedroom - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 696, editableRate: true }),
        pricedItem({ text: 'Semi Master Bedroom - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 696, editableRate: true }),
        pricedItem({ text: 'Children Bedroom - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 696, editableRate: true }),
        pricedItem({ text: 'Guest Bedroom - Arabian & Sheer Curtains with standard hardware', paramLabel: 'feet', paramValue: 45, rate: 696, editableRate: true }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light, COB Light, Profile Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Magnetic Track Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light and Profile Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Profile Light, Magnetic Track Light, Decorative Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel Light, COB Light, Profile Light, Decorative Hanging Light and Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light, COB Light, Profile Light and Decorative Hanging Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),
        pricedItem({
          text: 'Guest Bedroom - Panel light, COB Light, Profile Light and Decorative Hanging Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 110,
          editableRate: true,
        }),

        subTitle('False Ceiling'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 45,
          editableRate: true,
        }),

        subTitle('Wall Color'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1800,
          rate: 130,
          editableRate: true,
        }),
      ]),
    ],
  },
}
