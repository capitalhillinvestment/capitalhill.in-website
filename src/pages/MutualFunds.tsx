import { BarChart2, CheckCircle, ArrowRight, TrendingUp, Shield, Star } from 'lucide-react';

interface MutualFundsProps { onNavigate: (page: string) => void; }

const categories = [
  { name: 'Large Cap Funds', risk: 'Low-Medium', returns: '10-12%', horizon: '3-5 years', desc: 'Invest in top 100 companies. Suitable for conservative equity investors.' },
  { name: 'Mid Cap Funds', risk: 'Medium-High', returns: '14-18%', horizon: '5-7 years', desc: 'Companies ranked 101-250. Balance of growth and stability.' },
  { name: 'Small Cap Funds', risk: 'High', returns: '16-22%', horizon: '7+ years', desc: 'High-growth potential with significant volatility. Long-term horizon required.' },
  { name: 'Flexi Cap Funds', risk: 'Medium', returns: '12-16%', horizon: '5+ years', desc: 'Freedom to invest across all market caps. Best for most investors.' },
  { name: 'ELSS (Tax Saving)', risk: 'Medium-High', returns: '12-16%', horizon: '3+ years', desc: 'Save ₹1.5L tax under Sec 80C. 3-year lock-in with equity returns.' },
  { name: 'Debt Funds', risk: 'Low', returns: '6-8%', horizon: '1-3 years', desc: 'Invest in bonds & fixed income. Stable returns for conservative investors.' },
];

const riskColors: Record<string, string> = {
  'Low': 'bg-emerald-100 text-emerald-700', 'Low-Medium': 'bg-teal-100 text-teal-700',
  'Medium': 'bg-amber-100 text-amber-700', 'Medium-High': 'bg-orange-100 text-orange-700', 'High': 'bg-red-100 text-red-700',
};

export default function MutualFunds({ onNavigate }: MutualFundsProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 mb-5"><BarChart2 className="w-3.5 h-3.5" /> Mutual Funds</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Smart Investing through<br /><span className="text-blue-400">Mutual Funds</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Professionally managed, diversified investment vehicles that pool money from thousands of investors to create a well-structured portfolio.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">What is a Mutual Fund?</div>
            <h2 className="section-title mb-5">Invest Like a Pro, Even as a Beginner</h2>
            <p className="text-slate-600 leading-relaxed mb-5">A mutual fund pools money from many investors and invests it in a diversified portfolio of stocks, bonds, or other securities. Expert fund managers handle all investment decisions.</p>
            <div className="space-y-3">
              {['Start with as little as ₹500/month via SIP', 'Professional fund managers do the hard work', 'Instant diversification across 50-100 securities', 'SEBI regulated for maximum investor safety', 'High liquidity — redeem anytime (except ELSS)'].map(pt => (
                <div key={pt} className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-slate-600 text-sm">{pt}</span></div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-5">SIP vs Lumpsum</h3>
            <div className="space-y-4">
              {[{ type: 'SIP', min: '₹500/month', best: 'Salaried professionals', pro: 'Rupee cost averaging, disciplined' }, { type: 'Lumpsum', min: '₹1,000 one-time', best: 'Market timing / bonus / windfall', pro: 'Full allocation from day one' }].map(row => (
                <div key={row.type} className="bg-white rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-2"><span className="font-bold text-slate-900">{row.type}</span><span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Min: {row.min}</span></div>
                  <p className="text-xs text-slate-500">Best for: {row.best}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">{row.pro}</p>
                </div>
              ))}
            </div>
            <button onClick={() => nav('calculators')} className="btn-primary w-full mt-4 text-sm py-2.5 flex items-center justify-center gap-2">Calculate Returns <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Fund Categories</div><h2 className="section-title mb-4">Find the Right Fund for You</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(c => (
              <div key={c.name} className="card p-5">
                <div className="flex items-center justify-between mb-3"><h3 className="font-bold text-slate-900 text-sm">{c.name}</h3><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskColors[c.risk] || 'bg-slate-100 text-slate-600'}`}>{c.risk}</span></div>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{c.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div><p className="text-xs text-slate-400">Expected Returns</p><p className="text-emerald-600 font-bold text-sm">{c.returns} CAGR</p></div>
                  <div className="text-right"><p className="text-xs text-slate-400">Ideal Horizon</p><p className="text-slate-700 font-semibold text-sm">{c.horizon}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">Why Choose Mutual Funds?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{ icon: Shield, title: 'SEBI Regulated', desc: 'Strict oversight ensures your money is safe and properly managed.' }, { icon: TrendingUp, title: 'Inflation-Beating Returns', desc: 'Historically delivers 12-15% CAGR over long periods.' }, { icon: Star, title: 'Tax Efficiency', desc: 'ELSS saves ₹1.5L tax. LTCG up to ₹1L tax-free annually.' }, { icon: BarChart2, title: 'Transparency', desc: 'Daily NAV, monthly portfolio disclosure, full traceability.' }].map(b => (
              <div key={b.title} className="card p-5 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3"><b.icon className="w-6 h-6 text-blue-600" /></div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your SIP Today</h2>
          <p className="text-blue-100 mb-8">As low as ₹500/month. No expertise needed. Let us guide you.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">Invest Now</button>
            <button onClick={() => nav('calculators')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">SIP Calculator</button>
          </div>
        </div>
      </section>
    </div>
  );
}
