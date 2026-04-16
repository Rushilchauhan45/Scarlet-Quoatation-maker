import Input from '../ui/Input'

const scarletInfo = {
  name: 'SCARLET INTERIOR DESIGN',
  tagline: 'Beauty in Simplicity',
  address: '915, Satyamev Eminence, Science City Road, Sola, Ahmedabad',
  contact: '9925179341',
  gst: '24CCBPP7499B1ZG',
}

export default function Step1ClientDetails({ quotation, update }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3 rounded-2xl border border-[#E8E8E8] bg-white p-5">
        <h3 className="text-lg font-bold text-[#1A1A1A]">Client Details</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Client Name" required value={quotation.clientName} onChange={(e) => update({ clientName: e.target.value })} />
          <Input label="Contact Number" required value={quotation.contactNumber} onChange={(e) => update({ contactNumber: e.target.value })} />
          <Input label="Address" required className="sm:col-span-2" value={quotation.address} onChange={(e) => update({ address: e.target.value })} />
          <Input label="GST Number" value={quotation.gstNumber} onChange={(e) => update({ gstNumber: e.target.value })} />
          <Input label="Quotation Date" type="date" value={quotation.date} onChange={(e) => update({ date: e.target.value })} />
          <Input label="Quotation Number" value={quotation.quotationNumber} readOnly />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
        <h3 className="text-lg font-bold text-[#1A1A1A]">Scarlet Details (Fixed)</h3>
        <div className="mt-3 space-y-1 text-sm text-[#1A1A1A]">
          <p className="font-semibold">{scarletInfo.name}</p>
          <p className="italic">{scarletInfo.tagline}</p>
          <p>{scarletInfo.address}</p>
          <p>Contact: {scarletInfo.contact}</p>
          <p>GST No.: {scarletInfo.gst}</p>
        </div>
      </div>
    </div>
  )
}
