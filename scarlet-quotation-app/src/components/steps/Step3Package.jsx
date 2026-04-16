import Card from '../ui/Card'

const packages = [
  { name: 'STANDARD', description: 'Balanced quality package for practical interiors.' },
  { name: 'PREMIUM', description: 'Enhanced finishes and richer material choices.' },
  { name: 'LUXURIOUS', description: 'Top-tier finish package with premium detailing.' },
]

export default function Step3Package({ quotation, update }) {
  if (quotation.quotationType === 'Only Designing (3D Visualization)') {
    return (
      <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 text-sm">
        For designing quotations, package defaults to <strong>STANDARD</strong>.
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-bold">Choose Package</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.name} selected={quotation.packageType === pkg.name} onClick={() => update({ packageType: pkg.name })}>
            <h4 className="font-bold text-[#C0392B]">{pkg.name}</h4>
            <p className="mt-1 text-sm text-[#1A1A1A]/80">{pkg.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
