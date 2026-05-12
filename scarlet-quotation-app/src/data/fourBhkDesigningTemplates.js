const designingItem = (text) => ({
  text,
  paramLabel: '',
  paramValue: '',
  amount: '',
  pricing: null,
  usesGlobalSqft: false,
  hideInPdf: false,
  isSubTitle: false,
  manualAmount: true,
})

const fourBhkDesigningNotes = [
  '[1] Site Visit Policy (within 30 KM of Ahmedabad):',
  'Up to 10 site visits are included for locations within a 30-kilometer radius from Ahmedabad.',
  'Any additional visit beyond 10 will be chargeable at Rs. 4,000/- per visit.',
  '[2] Site Visit Policy (beyond 30 KM from Ahmedabad):',
  'For locations situated more than 30 kilometers away from Ahmedabad, a total of 3 site visits will be included as part of the service:',
  '1st Visit: At the raw site stage for measurements.',
  '2nd Visit: At the raw furniture structure stage.',
  '3rd Visit: At the final finishing stage.',
  'Any additional visit beyond the 3 included visits will be chargeable at Rs. 8,000/- per visit.',
  '[3] Quotation Customization:',
  'This is a standard quotation for your home. However, we are happy to customize the design and budget as per your specific requirements.',
]

export const fourBhkDesigningTemplates = {
  STANDARD: {
    title: 'Quotation For 3D Visualization',
    introText:
      `Respected Sir/Ma'am,

We are delighted to present our quotation for 4 BHK Interior Designing Services, designed to provide a sophisticated and thoughtfully planned interior experience. This package includes comprehensive design planning, customized furniture layouts, theme and concept development, material selection assistance, lighting and ceiling concepts, and premium 3D visualizations for complete design clarity before execution.

Our design philosophy focuses on creating luxurious, spacious, and elegant interiors that combine aesthetics, comfort, and functionality to match your lifestyle and vision.`,
    estimatedCost: '1,50,000',
    notes: fourBhkDesigningNotes,
    sections: [
      {
        name: 'DESCRIPTION',
        items: [
          designingItem('Presentable 2D furniture lay-out'),
          designingItem('Electric details with loop drawing, switchboard details, light details and electric schedule.'),
          designingItem('False ceiling details with section detail and 3D modelling'),
          designingItem('Interior concept and theme presented in 3d modelling'),
          designingItem('Render 3d images after finalizing 3d modelling [4 BHK - 15 views]'),
          designingItem('2D presentable details with furniture working drawings'),
          designingItem('Color Palate and Mood board'),
          designingItem('Material selection with client'),
          designingItem('Site Visit [10 Visits]'),
        ],
      },
    ],
  },
}
