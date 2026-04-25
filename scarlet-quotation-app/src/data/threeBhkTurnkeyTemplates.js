const pricedItem = ({ text, paramLabel, paramValue, rate, usesGlobalSqft = false, hideInPdf = false, isSubTitle = false }) => ({
  text,
  paramLabel,
  paramValue: String(paramValue),
  pricing: { rate: Number(rate) },
  usesGlobalSqft,
  hideInPdf,
  isSubTitle,
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

export const threeBhkTurnkeyTemplates = {
  STANDARD: {
    introText:
      'Standard 3 BHK turnkey quotation with practical finishes, complete room-wise furniture, and essential interior execution.',
    estimatedCost: '12,99,000',
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in laminate finish : (3\'-0" x 2\'-6")', paramLabel: 'feet', paramValue: 7.5, rate: 1600 }),
        pricedItem({ text: 'Door grill in laminate finish & CNC grill design', paramLabel: 'feet', paramValue: 21, rate: 952 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 6 Seaters [L Shape or 3 + 3]', paramLabel: 'quantity', paramValue: 1, rate: 45000 }),
        pricedItem({ text: 'Centre Table', paramLabel: 'quantity', paramValue: 1, rate: 10000 }),
        pricedItem({ text: 'Designer T.V. unit in laminate finish with 5\'-0" x 7\'-0" ', paramLabel: 'feet', paramValue: 35, rate: 1000 }),
        pricedItem({ text: 'Decorative main wall with punning, texture, wall paper or wall molding', paramLabel: 'feet', paramValue: 135, rate: 133 }),
        pricedItem({ text: 'AC pelmet (color finish)', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in Acrylic finish [Storage Length: 9\'-0"]', paramLabel: 'feet', paramValue: 23, rate: 2174 }),
        pricedItem({ text: '5 tandem baskets [Basic] ', paramLabel: 'quantity', paramValue: 5, rate: 2200 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in glass finish ', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft in laminate finish', paramLabel: 'feet', paramValue: 23, rate: 869 }),
        pricedItem({ text: 'Dining Table : 4 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6’-0”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Punning, texture or wall molding on main wall ', paramLabel: 'feet', paramValue: 100, rate: 100 }),
        pricedItem({ text: 'Side table in laminate finish', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'A.C. pelmet with color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5’-6”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Side table in laminate finish', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'A.C. Pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in laminate finish with hydraulic storage : 5’-0”x6’-6”', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Side table in laminate finish ', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'A.C. Pelmet in color finish', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress', paramLabel: 'quantity', paramValue: 3, rate: 8000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 3, rate: 6000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 50, rate: 300 }),
        pricedItem({ text: 'Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 250 }),
        pricedItem({ text: 'Semi Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 250 }),
        pricedItem({ text: 'Children Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 250 }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 35,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Designer Basic Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light, Profile Light or Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Designer Basic Hanging Light, Profile Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 35,
        }),

        subTitle('False Ceiling [Rs. 35 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 35,
        }),

        subTitle('Wall Color [Rs. 75 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 75,
        }),
      ]),
    ],
  },

  PREMIUM: {
    introText:
      'Premium 3 BHK turnkey quotation with upgraded materials, richer details, and expanded storage and decor scope.',
    estimatedCost: '15,99,000',
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in PU or Veneer finish : 3\'-0" x 2\'-6" ', paramLabel: 'feet', paramValue: 7.5, rate: 2667 }),
        pricedItem({ text: 'Safety door with Door panelling [40 Feet] in PU or Veneer finish & CNC grill design', paramLabel: 'feet', paramValue: 60, rate: 1000 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 6 Seaters [L Shape or 3 + 3] ', paramLabel: 'quantity', paramValue: 1, rate: 60000 }),
        pricedItem({ text: 'Centre Table ', paramLabel: 'quantity', paramValue: 1, rate: 12000 }),
        pricedItem({ text: 'Corner Table', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'Designer T.V. unit in PU or Veneer finish with 5\'-0" x lintel height ', paramLabel: 'feet', paramValue: 35, rate: 1286 }),
        pricedItem({ text: 'Decorative main wall with paneling in PU or Veneer finish : 9\'-0" x 6\'-0" ', paramLabel: 'feet', paramValue: 54, rate: 741 }),
        pricedItem({ text: 'Temple as per design in PU or Veneer finish : 4\'-0" x 2\'-0" ', paramLabel: 'feet', paramValue: 8, rate: 3750 }),
        pricedItem({ text: 'AC pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in Acrylic finish [Storage Length: 9\'-0"] ', paramLabel: 'feet', paramValue: 23, rate: 2391 }),
        pricedItem({ text: '5 tandem baskets [Basic] & 1 SS pull out', paramLabel: 'quantity', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in glass finish ', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft in acrylic finish ', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Dining Table : 4 Seaters', paramLabel: 'quantity', paramValue: 1, rate: 45000 }),
        pricedItem({ text: 'Service Platform in acrylic finish ', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6’-0”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Punning, texture or wall molding on main wall ', paramLabel: 'feet', paramValue: 100, rate: 120 }),
        pricedItem({ text: 'Side table in PU or Veneer finish ', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Dressing mirror with storage ', paramLabel: 'feet', paramValue: 10, rate: 2200 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU or Veneer finish with 7’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 63, rate: 1429 }),
        pricedItem({ text: 'A.C. pelmet with color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5’-6”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 33000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish [Quantity - 2] ', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror with storage ', paramLabel: 'feet', paramValue: 10, rate: 2200 }),
        pricedItem({ text: 'A.C. Pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5’-0”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 33000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table in laminate finish ', paramLabel: 'feet', paramValue: 3, rate: 2000 }),
        pricedItem({ text: 'Wardrobe sliding or openable in laminate finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror ', paramLabel: 'quantity', paramValue: 1, rate: 8000 }),
        pricedItem({ text: 'A.C. Pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress', paramLabel: 'quantity', paramValue: 3, rate: 10000 }),
        pricedItem({ text: 'Basin Storage Box ', paramLabel: 'quantity', paramValue: 3, rate: 8000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains '),
        pricedItem({ text: 'Drawing Room - Arabian Curtains with standard hardware ', paramLabel: 'feet', paramValue: 50, rate: 350 }),
        pricedItem({ text: 'Master Bedroom - Arabian Curtains with standard hardware ', paramLabel: 'feet', paramValue: 30, rate: 350 }),
        pricedItem({ text: 'Sami Master Bedroom - Arabian Curtains with standard hardware ', paramLabel: 'feet', paramValue: 30, rate: 350 }),
        pricedItem({ text: 'Children Bedroom - Arabian Curtains with standard hardware ', paramLabel: 'feet', paramValue: 30, rate: 350 }),

        subTitle('Light Fittings '),
        pricedItem({
          text: 'Vestibule - Panel Light',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 40,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Designer Basic Hanging Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 40,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light, Profile Light or Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 40,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Designer Basic Hanging Light, Profile Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 40,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 40,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 40,
        }),

        subTitle('False Ceiling [Rs. 35 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 35,
        }),

        subTitle('Wall Color [Rs. 80 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 80,
        }),
      ]),
    ],
  },

  LUXURIOUS: {
    introText:
      'Luxury 3 BHK turnkey quotation with premium execution, elevated detailing, and expanded decor and styling features.',
    estimatedCost: '23,99,000',
    sections: [
      section('VESTIBULE', [
        pricedItem({ text: 'Shoe rack in PU or Veneer finish : 3\'-0" x 2\'-6" ', paramLabel: 'feet', paramValue: 7.5, rate: 2667 }),
        pricedItem({ text: 'Safety Door grill with paneling in PU or Veneer finish & CNC grill design ', paramLabel: 'feet', paramValue: 60, rate: 1000 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa - 6 Seaters [L Shape or 3 + 3]', paramLabel: 'quantity', paramValue: 1, rate: 75000 }),
        pricedItem({ text: 'Centre Table ', paramLabel: 'quantity', paramValue: 1, rate: 15000 }),
        pricedItem({ text: 'Corner Table ', paramLabel: 'quantity', paramValue: 1, rate: 10000 }),
        pricedItem({ text: 'Designer T.V. unit in PU or Veneer finish with 5\'-0" x lintel height ', paramLabel: 'feet', paramValue: 35, rate: 1429 }),
        pricedItem({ text: 'Decorative main wall with paneling in PU or Veneer finish : 9\'0" x 15\'0" ', paramLabel: 'feet', paramValue: 135, rate: 741 }),
        pricedItem({ text: 'Temple as per design in PU or Veneer finish : 4\'0" x 2\'0" ', paramLabel: 'feet', paramValue: 8, rate: 3750 }),
        pricedItem({ text: 'Decorative partition between drawing & dining in PU or Veneer finish : 3\'0" x lintel height ', paramLabel: 'feet', paramValue: 21, rate: 1190 }),
        pricedItem({ text: 'AC pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage in Acrylic finish [Storage Length: 9\'-0"]', paramLabel: 'feet', paramValue: 23, rate: 2391 }),
        pricedItem({ text: '7 tandem baskets [Basic] & 1 SS pull out ', paramLabel: 'quantity', paramValue: 8, rate: 3300 }),
        pricedItem({ text: 'Over-head storage: Lintel height with shutter in glass finish ', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft in acrylic finish ', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Service Platform with OTG & Crockery unit in acrylic or glass finish ', paramLabel: 'feet', paramValue: 27, rate: 1481 }),
        pricedItem({ text: 'Dining Table : 4 Seaters ', paramLabel: 'quantity', paramValue: 1, rate: 60000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 6’-0”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Main wall with paneling in PU or Veneer finish 9 x10 ', paramLabel: 'feet', paramValue: 90, rate: 778 }),
        pricedItem({ text: 'Side table in PU or Veneer finish ', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Dressing mirror with storage ', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Wardrobe sliding or openable in glass finish with 7’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 63, rate: 1587 }),
        pricedItem({ text: 'A.C. pelmet with color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5’-6”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table in PU and Veneer finish [Quantity - 2] ', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU & Veneer finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 54, rate: 1574 }),
        pricedItem({ text: 'Punning, texture or wall paper on main wall ', paramLabel: 'feet', paramValue: 90, rate: 167 }),
        pricedItem({ text: 'Dressing mirror with storage ', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'A.C. Pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed in tapestry finish with hydraulic storage : 5’-0”x6’-6” ', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative head board in tapestry finish ', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table in PU & Veneer finish [Quantity - 2] ', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Wardrobe sliding or openable in PU & Veneer finish with 6’-0” length & inner shelves partition and 2 drawers with full height loft ', paramLabel: 'feet', paramValue: 54, rate: 1574 }),
        pricedItem({ text: 'Dressing mirror with storage ', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Punning, texture or wall paper on main wall ', paramLabel: 'feet', paramValue: 90, rate: 167 }),
        pricedItem({ text: 'A.C. Pelmet in color finish ', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress ', paramLabel: 'quantity', paramValue: 3, rate: 12000 }),
        pricedItem({ text: 'Basin Storage Box ', paramLabel: 'quantity', paramValue: 3, rate: 10000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains '),
        pricedItem({ text: 'Drawing Room - Arabian & Sheer Curtains with standard hardware ', paramLabel: 'feet', paramValue: 80, rate: 600 }),
        pricedItem({ text: 'Master Bedroom - Arabian & Sheer Curtains with standard hardware ', paramLabel: 'feet', paramValue: 54, rate: 600 }),
        pricedItem({ text: 'Sami Master Bedroom - Arabian & Sheer Curtains with standard hardware ', paramLabel: 'feet', paramValue: 50, rate: 600 }),
        pricedItem({ text: 'Children Bedroom - Arabian & Sheer Curtains with standard hardware ', paramLabel: 'feet', paramValue: 50, rate: 600 }),

        subTitle('Light Fittings'),
        pricedItem({
          text: 'Vestibule - Panel Light',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 50,
        }),
        pricedItem({
          text: 'Drawing Room - Panel Light, COB Light, Profile Light, Designer Basic Hanging Light, Magnetic Track Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 50,
        }),
        pricedItem({
          text: 'Kitchen & Dining - Panel light, Profile Light or Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 50,
        }),
        pricedItem({
          text: 'Master Bedroom - Panel Light, COB Light, Profile Light, Designer Basic Hanging Light, Magnetic Track Light or Rope Light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 50,
        }),
        pricedItem({
          text: 'Semi Master Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 50,
        }),
        pricedItem({
          text: 'Children Bedroom - Panel light and Rope light',
          paramLabel: 'sqft',
          paramValue: 0,
          rate: 50,
        }),

        subTitle('False Ceiling [Rs. 45 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - False ceiling in gypsum board with color finish as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 45,
        }),

        subTitle('Wall Color [Rs. 100 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Wall color as per design',
          paramLabel: 'sqft',
          paramValue: 1200,
          rate: 100,
        }),
      ]),
    ],
  },
}
