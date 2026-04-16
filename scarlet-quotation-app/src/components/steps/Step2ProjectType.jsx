import Card from '../ui/Card'

const bhkOptions = [
  { value: '2BHK', icon: '🏠' },
  { value: '3BHK', icon: '🏡' },
  { value: '4BHK', icon: '🏘️' },
  { value: '5BHK', icon: '🏰' },
  { value: 'Commercial', icon: '🏢' },
  { value: 'Other', icon: '✏️' },
]

const quotationTypes = ['Turnkey Interior', 'Only Designing (3D Visualization)']

export default function Step2ProjectType({ quotation, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-bold">Select BHK Type</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bhkOptions.map((option) => (
            <Card
              key={option.value}
              selected={quotation.bhkType === option.value}
              onClick={() => update({ bhkType: option.value })}
            >
              <p className="text-xl">{option.icon}</p>
              <p className="mt-1 font-semibold">{option.value}</p>
            </Card>
          ))}
        </div>
        {quotation.bhkType === 'Other' ? (
          <input
            className="mt-3 w-full rounded-xl border border-[#E8E8E8] px-3 py-2"
            placeholder="Enter custom type"
            value={quotation.otherBhk}
            onChange={(e) => update({ otherBhk: e.target.value })}
          />
        ) : null}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold">Quotation Category</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {quotationTypes.map((type) => (
            <Card key={type} selected={quotation.quotationType === type} onClick={() => update({ quotationType: type })}>
              <p className="font-semibold">{type}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
