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

const twoBhkStandardMaterialSpec = [
  {
    material: 'False Ceiling',
    specification: "Khushbu company's gypsum Sheet, Size - 12.5mm with 8 kg capacity",
    clarity: '',
  },
  {
    material: 'Fabric for Curtain & Lining Work',
    specification: 'Sarrom / GM / F&F / Divine / Ddecor Etc Depending on Selection',
    clarity: 'Fabric price considered is approximately Rs. 400/- per meter',
  },
  {
    material: 'Light fitting',
    specification: 'G Jaks or Similar',
    clarity: 'Panel Lights & Rope Lights which provide minimum 02 Years of product warranty.',
  },
  {
    material: 'Inner Laminate',
    specification: '0.8 MM Fabric or Wooden Finish',
    clarity: 'Durian or Similar',
  },
  {
    material: 'Outer Laminate',
    specification: 'Levin/ Sunmica / Durian / Airolam / Armany and many other brands depend on Selection',
    clarity: 'Average price will be between Rs. 1200/- to Rs. 1400/- Per Sheet for entire house.',
  },
  {
    material: 'Kitchen Tandem Channel',
    specification: 'Steel Berry',
    clarity: 'Average price: Rs.1700/- to Rs. 2000/- Per tandem channel',
  },
  {
    material: 'Ply Wood',
    specification: 'Alternate Ply IS303 MR Grade plywood',
    clarity: 'Approximately Rs. 60/- to Rs. 62/- Per Square ft.',
  },
  {
    material: 'Electric Wire',
    specification: 'Johnsen Cables, Darshan Cables or similar',
    clarity: '',
  },
  {
    material: 'Hardware Regular (Telescopic Channel / Auto Hinges / Mijagra / Gas Pumps / Bed Hydraulic / Wardrobe Sliding etc)',
    specification: 'Steel Berry',
    clarity:
      'All hardware and materials are standard level of specified brand, any upgrade or preference in particular mechanism or system will be billed additionally. Drawer Channel - Telescopic Channel are not-Soft close Hinges for shutters are Soft Close. Wardrobe Sliding Channels are Soft Close',
  },
  {
    material: 'Decorative Door Handles & Locks of door grill [Safety Door]',
    specification: 'Europa or Similar',
    clarity: 'Rs. 1200/- to Rs. 1500/- Per Piece',
  },
  {
    material: 'White Glue (Fevicol)',
    specification: 'Blue Coat Marine, Euro or Similar',
    clarity: '',
  },
  {
    material: 'Color',
    specification: 'Asian Royal Paint or Similar',
    clarity: '',
  },
  {
    material: 'Sofa',
    specification: '5 Seaters',
    clarity: 'Rs. 40,000/- Sofa Set',
  },
  {
    material: 'Centre table ',
    specification: 'Imported',
    clarity: 'Rs. 8,000/- Maximum',
  },
  {
    material: 'Total light fixtures',
    specification: '15 Pieces',
    clarity: 'More than 15 fixtures will be charged extra. [Rs. 1200/- Per extra Fixtures]',
  },
]

export const twoBhkTurnkeyTemplates = {
  STANDARD: {
    introText:
      `Respected Sir/Ma'am,

We are pleased to present our standard 2 BHK interior quotation, designed to offer a perfect balance of functionality, aesthetics, and budget. This package includes practical finishes, essential furniture for all rooms, and basic interior enhancements to create a comfortable and well-organized living space. The design focuses on smart space utilization and modern appeal, ensuring a complete and efficient home interior solution.`,
    estimatedCost: '9,21,000',
    materialSpec: twoBhkStandardMaterialSpec,
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in laminate finish : (3\'-0" x 2\'-6")', paramLabel: 'feet', paramValue: 7.5, rate: 1600 }),
        pricedItem({ text: 'Door grill in laminate finish & CNC grill design', paramLabel: 'feet', paramValue: 21, rate: 952.38 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 5 Seaters [L Shape or 3 + 2]', paramLabel: 'quantity', paramValue: 1, rate: 40000 }),
        pricedItem({ text: 'Centre Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 8000 }),
        pricedItem({ text: 'Corner Table [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'Designer T.V. unit in laminate finish with 5\'-0" x lintel height', paramLabel: 'feet', paramValue: 35, rate: 1000 }),
        pricedItem({ text: 'Decorative main wall with punning, texture or wall paper', paramLabel: 'feet', paramValue: 108, rate: 138.89 }),
        pricedItem({ text: 'A.C. Pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 833.33 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in acrylic finish', paramLabel: 'feet', paramValue: 20, rate: 1950 }),
        pricedItem({ text: '5 tandem baskets [Basic]', paramLabel: 'quantity', paramValue: 5, rate: 2200 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter', paramLabel: 'feet', paramValue: 20, rate: 1700 }),
        pricedItem({ text: 'Loft in laminate finish', paramLabel: 'feet', paramValue: 16, rate: 1000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in laminate finish with hydraulic storage : 5\'-6"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 25000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 20, rate: 750 }),
        pricedItem({ text: 'Punning, or texture on main wall', paramLabel: 'feet', paramValue: 90, rate: 111.11 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2]', paramLabel: 'quantity', paramValue: 2, rate: 5000 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 1800 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 54, rate: 1296.3 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in laminate finish with hydraulic storage : 5\'-0"x6\'-6"', paramLabel: 'quantity', paramValue: 1, rate: 25000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish', paramLabel: 'feet', paramValue: 20, rate: 750 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 1]', paramLabel: 'quantity', paramValue: 1, rate: 5000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6\'-0" length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 54, rate: 1296.3 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 1800 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress [Quantity : 2]', paramLabel: 'quantity', paramValue: 2, rate: 8000 }),
        pricedItem({ text: 'Basin Storage [Quantity : 2]', paramLabel: 'quantity', paramValue: 2, rate: 5000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 50, rate: 300, editableRate: true }),
        pricedItem({ text: 'Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 250, editableRate: true }),
        pricedItem({ text: 'Semi Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 250, editableRate: true }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light',
          paramLabel: 'sqft',
          paramValue: 1350,
          rate: 35,
          editableRate: true,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light and Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
          editableRate: true,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
          editableRate: true,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
          editableRate: true,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
          editableRate: true,
        }),

        subTitle('False Ceiling'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1350,
          rate: 35,
          editableRate: true,
        }),

        subTitle('Wall Color'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1350,
          rate: 75,
          editableRate: true,
        }),
      ]),
    ],
  },
}
