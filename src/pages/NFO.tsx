import { Shield, CheckCircle, ArrowRight, BarChart2, Star } from 'lucide-react';

interface NFOProps { onNavigate: (page: string) => void; }

const currentNFOs = [
  { name: 'Mirae Asset Nifty India Manufacturing ETF FoF', category: 'Sectoral / Thematic', amc: 'Mirae Asset', closeDate: 'Jun 20, 2026', type: 'Open Ended' },
  { name: 'HDFC Defence Fund', category: 'Thematic', amc: 'HDFC Mutual Fund', closeDate: 'Jun 25, 2026', type: 'Open Ended' },
  { name: 'Axis Long Duration Fund', category: 'Debt - Long Duration', amc: 'Axis Mutual Fund', closeDate: 'Jun 30, 2026', type: 'Open Ended' },
];

export default function NFO({ onNavigate }: NFOProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-rose-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 text-xs font-semibold px-3 py-1 rounded-full border border-rose-400/30 mb-5"><Shield className="w-3.5 h-3.5" /> New Fund Offers</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Invest at Inception with<br /><span className="text-rose-400">New Fund Offers</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">New Fund Offers let you invest in a fresh mutual fund at its ₹10 NAV launch price — a unique early-entry opportunity.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">What is an NFO?</div>
            <h2 className="section-title mb-5">Ground Floor Entry into New Funds</h2>
            <p className="text-slate-600 leading-relaxed mb-5">A New Fund Offer (NFO) is the first-ever subscription offering for a new mutual fund launched by an AMC. Similar to an IPO in the equity world, NFOs let investors enter at the ground floor NAV of ₹10 per unit.</p>
            <div className="space-y-3">
              {['Start at base NAV of ₹10 per unit', 'Access unique investment themes and strategies', 'Typically open for 15-30 days for subscription', 'SEBI regulated — same safety as regular mutual funds', 'Can continue as regular fund after NFO closes'].map(pt => (
                <div key={pt} className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-slate-600 text-sm">{pt}</span></div>
              ))}
            </div>
          </div>
          <img src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600" alt="New fund offer" className="rounded-2xl shadow-xl w-full object-cover" style={{ height: 400 }} />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">NFO vs IPO — Key Differences</h2></div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="text-left px-5 py-3.5 text-slate-600 font-semibold">Parameter</th><th className="px-5 py-3.5 text-rose-600 font-semibold text-center">NFO</th><th className="px-5 py-3.5 text-amber-600 font-semibold text-center">IPO</th></tr></thead>
              <tbody>
                {[["What is it?", "New Mutual Fund launch", "Company going public"], ["Entry Price", "Fixed ₹10 per unit", "Price band set by company"], ["Risk", "Diversified portfolio risk", "Single company risk"], ["Returns", "Based on portfolio performance", "Dependent on listing & growth"], ["Listing Gains", "No immediate listing gains", "Potential listing premium"], ["Regulation", "SEBI (MF Regulations)", "SEBI (ICDR Regulations)"]].map(([param, nfo, ipo], i) => (
                  <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{param}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{nfo}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{ipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Current NFOs</div><h2 className="section-title mb-4">Open NFOs This Month</h2><p className="text-slate-500 text-sm">Data is illustrative. Contact us for live NFO list and expert analysis.</p></div>
          <div className="grid md:grid-cols-3 gap-5">
            {currentNFOs.map(nfo => (
              <div key={nfo.name} className="card p-5">
                <div className="flex items-center justify-between mb-3"><span className="text-xs font-medium bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">{nfo.category}</span><span className="text-xs text-slate-500">{nfo.type}</span></div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 leading-tight">{nfo.name}</h3>
                <p className="text-slate-500 text-xs mb-4">by {nfo.amc}</p>
                <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
                  <div className="flex justify-between"><span className="text-slate-500">NFO Price</span><span className="font-bold text-slate-900">₹10 per unit</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Close Date</span><span className="font-semibold text-slate-900">{nfo.closeDate}</span></div>
                </div>
                <button onClick={() => nav('contact')} className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">Invest in NFO</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">When Should You Invest in an NFO?</h2></div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Star, title: 'Unique Strategy', desc: 'The NFO introduces a unique theme or strategy not available in existing funds — e.g., defence, new-age tech, ESG.', positive: true },
              { icon: BarChart2, title: 'Reputed AMC', desc: 'The fund house has a strong track record of managing similar category funds with consistent performance.', positive: true },
              { icon: Shield, title: "Only for 'New NAV' — Wrong Reason", desc: "Investing in an NFO just because NAV is ₹10 is a myth. Lower NAV doesn't mean cheaper — it's about portfolio value.", positive: false },
              { icon: CheckCircle, title: 'No Track Record', desc: "New funds have no historical performance data. Prefer existing funds with proven records unless the strategy is truly unique.", positive: false },
            ].map(item => (
              <div key={item.title} className={`card p-5 border-l-4 ${item.positive ? 'border-emerald-500' : 'border-red-400'}`}>
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-3 ${item.positive ? 'text-emerald-600' : 'text-red-500'}`}>{item.positive ? '✓ Good Reason to Invest' : '✗ Bad Reason to Invest'}</div>
                <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-rose-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get NFO Recommendations</h2>
          <p className="text-rose-100 mb-8">Our research team analyzes every NFO so you only invest in ones truly worth your capital.</p>
          <button onClick={() => nav('contact')} className="bg-white text-rose-700 hover:bg-rose-50 font-semibold px-10 py-3 rounded-lg transition-colors inline-flex items-center gap-2">Get Expert Guidance <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
    </div>
  );
}
