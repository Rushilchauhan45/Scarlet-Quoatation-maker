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
        pricedItem({ text: 'Shoe rack (laminate finish)', paramLabel: 'feet', paramValue: 7.5, rate: 1600 }),
        pricedItem({ text: 'Door grill (laminate + CNC)', paramLabel: 'feet', paramValue: 21, rate: 952 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa 6 Seater', paramLabel: 'quantity', paramValue: 1, rate: 45000 }),
        pricedItem({ text: 'Centre Table', paramLabel: 'quantity', paramValue: 1, rate: 10000 }),
        pricedItem({ text: 'T.V. unit (laminate)', paramLabel: 'feet', paramValue: 35, rate: 1000 }),
        pricedItem({ text: 'Decorative main wall (punning/texture/wallpaper)', paramLabel: 'feet', paramValue: 135, rate: 133 }),
        pricedItem({ text: 'AC pelmet (color finish)', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage (acrylic)', paramLabel: 'feet', paramValue: 23, rate: 2174 }),
        pricedItem({ text: 'Tandem baskets (5 basic)', paramLabel: 'quantity', paramValue: 5, rate: 2200 }),
        pricedItem({ text: 'Over-head storage (glass shutter)', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft (laminate)', paramLabel: 'feet', paramValue: 23, rate: 869 }),
        pricedItem({ text: 'Dining Table 4 Seater', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative headboard (tapestry)', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Main wall (punning/texture/molding)', paramLabel: 'feet', paramValue: 100, rate: 100 }),
        pricedItem({ text: 'Side table (laminate, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'Wardrobe (laminate, sliding/openable)', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Side table (laminate, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe (laminate)', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed (laminate + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 30000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 900 }),
        pricedItem({ text: 'Side table (laminate, qty 1)', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'Wardrobe (laminate)', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
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

        subTitle('Light Fittings [Rs. 35 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Vestibule, Drawing Room, Kitchen & Dining, Master Bedroom, Semi Master Bedroom, Children Bedroom',
          paramLabel: 'sqft',
          paramValue: 1200,
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
        pricedItem({ text: 'Shoe rack (PU/Veneer)', paramLabel: 'feet', paramValue: 7.5, rate: 2667 }),
        pricedItem({ text: 'Safety door + paneling (PU/Veneer + CNC)', paramLabel: 'feet', paramValue: 60, rate: 1000 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa 6 Seater', paramLabel: 'quantity', paramValue: 1, rate: 60000 }),
        pricedItem({ text: 'Centre Table', paramLabel: 'quantity', paramValue: 1, rate: 12000 }),
        pricedItem({ text: 'Corner Table', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'T.V. unit (PU/Veneer)', paramLabel: 'feet', paramValue: 35, rate: 1286 }),
        pricedItem({ text: 'Decorative main wall (PU/Veneer 9x6)', paramLabel: 'feet', paramValue: 54, rate: 741 }),
        pricedItem({ text: 'Temple (PU/Veneer)', paramLabel: 'feet', paramValue: 8, rate: 3750 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage (acrylic)', paramLabel: 'feet', paramValue: 23, rate: 2391 }),
        pricedItem({ text: 'Tandem baskets (5 basic + 1 SS)', paramLabel: 'quantity', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Over-head storage (glass)', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft (acrylic)', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Service Platform (acrylic)', paramLabel: 'feet', paramValue: 10, rate: 2000 }),
        pricedItem({ text: 'Dining Table 4 Seater', paramLabel: 'quantity', paramValue: 1, rate: 45000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Main wall (punning/texture/molding)', paramLabel: 'feet', paramValue: 100, rate: 120 }),
        pricedItem({ text: 'Side table (PU/Veneer, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2200 }),
        pricedItem({ text: 'Wardrobe (PU/Veneer)', paramLabel: 'feet', paramValue: 63, rate: 1429 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 33000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table (laminate, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2000 }),
        pricedItem({ text: 'Wardrobe (laminate)', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror', paramLabel: 'feet', paramValue: 10, rate: 2200 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic)', paramLabel: 'quantity', paramValue: 1, rate: 33000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table (laminate, qty 1)', paramLabel: 'quantity', paramValue: 1, rate: 6000 }),
        pricedItem({ text: 'Wardrobe (laminate)', paramLabel: 'feet', paramValue: 54, rate: 1296 }),
        pricedItem({ text: 'Dressing mirror', paramLabel: 'quantity', paramValue: 1, rate: 8000 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress', paramLabel: 'quantity', paramValue: 3, rate: 10000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 3, rate: 8000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian Curtains with standard hardware', paramLabel: 'feet', paramValue: 50, rate: 350 }),
        pricedItem({ text: 'Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 350 }),
        pricedItem({ text: 'Semi Master Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 350 }),
        pricedItem({ text: 'Children Bedroom - Roman Curtains with standard hardware', paramLabel: 'feet', paramValue: 30, rate: 350 }),

        subTitle('Light Fittings [Rs. 40 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Vestibule, Drawing Room, Kitchen & Dining, Master Bedroom, Semi Master Bedroom, Children Bedroom',
          paramLabel: 'sqft',
          paramValue: 1200,
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
        pricedItem({ text: 'Shoe rack (PU/Veneer)', paramLabel: 'feet', paramValue: 7.5, rate: 2667 }),
        pricedItem({ text: 'Safety door grill + paneling (PU/Veneer + CNC)', paramLabel: 'feet', paramValue: 60, rate: 1000 }),
      ]),
      section('DRAWING ROOM', [
        pricedItem({ text: 'Designer Sofa 6 Seater', paramLabel: 'quantity', paramValue: 1, rate: 75000 }),
        pricedItem({ text: 'Centre Table', paramLabel: 'quantity', paramValue: 1, rate: 15000 }),
        pricedItem({ text: 'Corner Table', paramLabel: 'quantity', paramValue: 1, rate: 10000 }),
        pricedItem({ text: 'T.V. unit (PU/Veneer)', paramLabel: 'feet', paramValue: 35, rate: 1429 }),
        pricedItem({ text: 'Decorative main wall (PU/Veneer 9x15)', paramLabel: 'feet', paramValue: 135, rate: 741 }),
        pricedItem({ text: 'Temple (PU/Veneer)', paramLabel: 'feet', paramValue: 8, rate: 3750 }),
        pricedItem({ text: 'Decorative partition (PU/Veneer)', paramLabel: 'feet', paramValue: 21, rate: 1190 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('KITCHEN & DINING', [
        pricedItem({ text: 'Under platform storage (acrylic)', paramLabel: 'feet', paramValue: 23, rate: 2391 }),
        pricedItem({ text: 'Tandem baskets (7 basic + 1 SS pull out)', paramLabel: 'quantity', paramValue: 8, rate: 3300 }),
        pricedItem({ text: 'Over-head storage (glass)', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Loft (acrylic)', paramLabel: 'feet', paramValue: 23, rate: 1739 }),
        pricedItem({ text: 'Service Platform + OTG + Crockery (acrylic/glass)', paramLabel: 'feet', paramValue: 27, rate: 1481 }),
        pricedItem({ text: 'Dining Table 4 Seater', paramLabel: 'quantity', paramValue: 1, rate: 60000 }),
      ]),
      section('MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic 6x6.5)', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Main wall paneling (PU/Veneer 9x10)', paramLabel: 'feet', paramValue: 90, rate: 778 }),
        pricedItem({ text: 'Side table (PU/Veneer, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'Wardrobe (glass finish)', paramLabel: 'feet', paramValue: 63, rate: 1587 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('SEMI MASTER BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic 5.5x6.5)', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table (PU/Veneer, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Wardrobe (PU/Veneer)', paramLabel: 'feet', paramValue: 54, rate: 1574 }),
        pricedItem({ text: 'Main wall (punning/texture/wallpaper)', paramLabel: 'feet', paramValue: 90, rate: 167 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('CHILDREN BEDROOM', [
        pricedItem({ text: 'Bed (tapestry + hydraulic 5x6.5)', paramLabel: 'quantity', paramValue: 1, rate: 35000 }),
        pricedItem({ text: 'Decorative headboard', paramLabel: 'feet', paramValue: 20, rate: 1000 }),
        pricedItem({ text: 'Side table (PU/Veneer, qty 2)', paramLabel: 'feet', paramValue: 6, rate: 2500 }),
        pricedItem({ text: 'Wardrobe (PU/Veneer)', paramLabel: 'feet', paramValue: 54, rate: 1574 }),
        pricedItem({ text: 'Main wall (punning/texture/wallpaper)', paramLabel: 'feet', paramValue: 90, rate: 167 }),
        pricedItem({ text: 'Dressing mirror with storage', paramLabel: 'feet', paramValue: 10, rate: 2500 }),
        pricedItem({ text: 'AC pelmet', paramLabel: 'feet', paramValue: 12, rate: 1000 }),
      ]),
      section('OTHER ITEMS', [
        pricedItem({ text: 'Bed Mattress', paramLabel: 'quantity', paramValue: 3, rate: 12000 }),
        pricedItem({ text: 'Basin Storage Box', paramLabel: 'quantity', paramValue: 3, rate: 10000 }),
      ]),
      section('WHOLE HOUSE', [
        subTitle('Curtains'),
        pricedItem({ text: 'Drawing Room - Arabian + Sheer Curtains with premium hardware', paramLabel: 'feet', paramValue: 80, rate: 600 }),
        pricedItem({ text: 'Master Bedroom - Premium Curtains with premium hardware', paramLabel: 'feet', paramValue: 54, rate: 600 }),
        pricedItem({ text: 'Semi Master Bedroom - Premium Curtains with premium hardware', paramLabel: 'feet', paramValue: 50, rate: 600 }),
        pricedItem({ text: 'Children Bedroom - Premium Curtains with premium hardware', paramLabel: 'feet', paramValue: 50, rate: 600 }),

        subTitle('Light Fittings [Rs. 50 Per Square Feet]'),
        pricedItem({
          text: 'Whole House - Vestibule, Drawing Room, Kitchen & Dining, Master Bedroom, Semi Master Bedroom, Children Bedroom',
          paramLabel: 'sqft',
          paramValue: 1200,
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
