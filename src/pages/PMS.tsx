import { TrendingUp, CheckCircle, ArrowRight, Users, BarChart2, Shield } from 'lucide-react';

interface PMSProps { onNavigate: (page: string) => void; }

export default function PMS({ onNavigate }: PMSProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-emerald-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30 mb-5"><TrendingUp className="w-3.5 h-3.5" /> Portfolio Management Services</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Premium Wealth Management<br /><span className="text-emerald-400">For Discerning Investors</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Personalized, discretionary portfolio management for HNI investors seeking superior alpha generation through expert stock selection.</p>
          <div className="mt-6 inline-block bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-sm text-white border border-white/20">Minimum Investment: <span className="font-bold text-emerald-400">₹50 Lakhs</span> (SEBI mandated)</div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">What is PMS?</div>
            <h2 className="section-title mb-5">Your Portfolio, Professionally Managed</h2>
            <p className="text-slate-600 leading-relaxed mb-5">Portfolio Management Services (PMS) is a specialized investment service where a SEBI-registered portfolio manager creates and manages a customized portfolio of stocks, bonds, and other securities on your behalf.</p>
            <p className="text-slate-600 leading-relaxed mb-5">Unlike mutual funds where all investors hold the same portfolio, PMS offers a personalized portfolio in your own demat account with full transparency on every transaction.</p>
            <div className="space-y-3">
              {['Individually customized equity portfolios', 'Direct securities in your own demat account', 'Complete transparency — see every buy/sell', 'Concentrated, high-conviction stock picks', 'Active risk management by expert PMs'].map(pt => (
                <div key={pt} className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-slate-600 text-sm">{pt}</span></div>
              ))}
            </div>
          </div>
          <img src="https://images.pexels.com/photos/7567560/pexels-photo-7567560.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Portfolio management" className="rounded-2xl w-full object-cover shadow-xl" style={{ height: 420 }} />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">PMS vs Mutual Funds</h2></div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="text-left px-5 py-3.5 text-slate-600 font-semibold">Parameter</th><th className="px-5 py-3.5 text-emerald-600 font-semibold text-center">PMS</th><th className="px-5 py-3.5 text-blue-600 font-semibold text-center">Mutual Funds</th></tr></thead>
              <tbody>
                {[['Minimum Investment', '₹50 Lakhs', '₹500'], ['Customization', 'High (personalized)', 'None (standardized)'], ['Transparency', 'Full (your demat)', 'Monthly disclosure'], ['Target Investor', 'HNI / UHNI', 'All investors'], ['Management Style', 'Discretionary', 'Fund-level pooled'], ['Fee Structure', 'Fixed + Performance', 'Expense Ratio only']].map(([param, pms, mf], i) => (
                  <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{param}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{pms}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{mf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Our Strategies</div><h2 className="section-title mb-4">PMS Investment Strategies</h2></div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[{ name: 'Growth Portfolio', focus: 'High-quality growth stocks', returns: '18-22% target CAGR', min: '₹50L', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' }, { name: 'Value Portfolio', focus: 'Undervalued deep-value picks', returns: '16-20% target CAGR', min: '₹75L', icon: BarChart2, color: 'bg-blue-50 text-blue-600' }, { name: 'Balanced Portfolio', focus: 'Large & mid cap blend', returns: '14-18% target CAGR', min: '₹50L', icon: Shield, color: 'bg-amber-50 text-amber-600' }].map(s => (
              <div key={s.name} className="card p-6">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}><s.icon className="w-6 h-6" /></div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{s.focus}</p>
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Target Returns</span><span className="font-semibold text-emerald-600">{s.returns}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Minimum</span><span className="font-semibold text-slate-900">{s.min}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-10 h-10 text-emerald-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Elevate Your Portfolio</h2>
          <p className="text-emerald-100 mb-8">Talk to our PMS specialists for a personalized investment strategy aligned to your wealth goals.</p>
          <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-10 py-3 rounded-lg transition-colors inline-flex items-center gap-2">Schedule a Consultation <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
    </div>
  );
}
