import Card from '../ui/Card'
import { getAllowedPackages } from '../../data/quotationFlow'

const packageDetails = {
  STANDARD: 'Balanced quality package for practical interiors.',
  PREMIUM: 'Enhanced finishes and richer material choices.',
  LUXURIOUS: 'Top-tier finish package with premium detailing.',
}

export default function Step3Package({ quotation, update }) {
  const allowedPackages = getAllowedPackages(quotation.bhkType)

  if (!allowedPackages.length) {
    return (
      <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 text-sm">
        Please select BHK type first to continue package selection.
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-bold">Choose Package</h3>
      {quotation.bhkType === '2BHK' ? (
        <p className="mb-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-3 text-sm">
          For 2BHK, only <strong>STANDARD</strong> package is available.
        </p>
      ) : null}
      <div className="grid gap-3 md:grid-cols-3">
        {allowedPackages.map((pkgName) => (
          <Card key={pkgName} selected={quotation.packageType === pkgName} onClick={() => update({ packageType: pkgName })}>
            <h4 className="font-bold text-[#C0392B]">{pkgName}</h4>
            <p className="mt-1 text-sm text-[#1A1A1A]/80">{packageDetails[pkgName]}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
