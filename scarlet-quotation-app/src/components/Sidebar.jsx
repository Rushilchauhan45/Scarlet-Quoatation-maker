import { Menu, Plus, Trash2, X } from 'lucide-react'
import Button from './ui/Button'

export default function Sidebar({ history, onNew, onLoad, onDelete, mobileOpen, setMobileOpen }) {
  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#1A1A1A] p-2 text-white md:hidden"
        onClick={() => setMobileOpen((p) => !p)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[300px] flex-col bg-[#1A1A1A] p-4 text-white transition-transform md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="mb-4 flex justify-center rounded-xl bg-white p-3">
            <img src="/logo.png" alt="Scarlet" className="h-20 object-contain" />
          </div>
          <Button className="w-full" onClick={onNew}><Plus size={14} className="mr-2 inline" /> New Quotation</Button>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <p className="mb-3 text-xs uppercase tracking-wider text-white/60">Recent Quotations</p>
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.id} className="group rounded-lg border border-white/10 p-2 hover:bg-white/5">
                <button type="button" className="w-full text-left" onClick={() => onLoad(item)}>
                  <p className="truncate text-sm font-semibold">{item.clientName || 'Untitled Client'}</p>
                  <p className="text-xs text-white/70">{item.bhkType} • {item.date}</p>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="mt-1 hidden rounded p-1 text-white/70 hover:bg-white/10 hover:text-white group-hover:inline-flex"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>

      </aside>
    </>
  )
}
