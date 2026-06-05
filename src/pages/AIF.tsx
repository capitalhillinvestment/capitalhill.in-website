import { Award, CheckCircle, ArrowRight, Shield, TrendingUp, Globe } from 'lucide-react';

interface AIFProps { onNavigate: (page: string) => void; }

export default function AIF({ onNavigate }: AIFProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-violet-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full border border-violet-400/30 mb-5"><Award className="w-3.5 h-3.5" /> Alternative Investment Funds</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Beyond Traditional<br /><span className="text-violet-400">Investment Avenues</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Exclusive investment opportunities in private equity, hedge funds, and real assets — designed for sophisticated investors seeking diversification.</p>
          <div className="mt-6 inline-block bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-sm text-white border border-white/20">Minimum Investment: <span className="font-bold text-violet-400">₹1 Crore</span> (SEBI mandated)</div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">AIF Categories</div><h2 className="section-title mb-4">Three Categories of AIFs</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { cat: 'Category I', color: 'from-emerald-500 to-teal-600', types: ['Infrastructure Funds', 'Venture Capital Funds', 'Social Venture Funds', 'Angel Funds'], desc: 'Invest in start-ups, SMEs, infrastructure, and socially beneficial projects. Government-encouraged with potential tax incentives.' },
              { cat: 'Category II', color: 'from-violet-500 to-purple-600', types: ['Private Equity Funds', 'Debt Funds', 'Real Estate Funds', 'Fund of Funds'], desc: 'No specific incentives or concessions. Includes PE funds, debt funds, and real estate funds with diversified strategies.' },
              { cat: 'Category III', color: 'from-blue-500 to-indigo-600', types: ['Hedge Funds', 'PIPE Funds', 'Long-Short Equity', 'Derivatives Strategies'], desc: 'Complex strategies including leveraged trading and derivatives. Aimed at generating absolute returns in all market conditions.' },
            ].map(c => (
              <div key={c.cat} className="card overflow-hidden">
                <div className={`bg-gradient-to-r ${c.color} p-5 text-white`}><h3 className="font-bold text-xl mb-1">{c.cat}</h3><p className="text-white/80 text-sm">{c.desc}</p></div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Includes</p>
                  <div className="space-y-2">
                    {c.types.map(t => <div key={t} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /><span className="text-sm text-slate-700">{t}</span></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">Who Should Invest?</div>
            <h2 className="section-title mb-5">Is AIF Right for You?</h2>
            <p className="text-slate-600 leading-relaxed mb-6">AIFs are designed for sophisticated investors — HNIs and family offices — who seek exposure to unique strategies beyond public markets. The higher minimum (₹1 crore) ensures investors have the financial capacity and risk appetite for illiquid, complex strategies.</p>
            <div className="space-y-4">
              {[{ icon: Shield, title: 'Net Worth > ₹5 Crore', desc: 'AIF is suited for investors with substantial net worth looking for portfolio diversification.' }, { icon: Globe, title: 'Long Investment Horizon', desc: '3-7 year lock-in periods common. Investors must be comfortable with illiquidity.' }, { icon: TrendingUp, title: 'Seeking Alpha', desc: 'AIF strategies aim to generate uncorrelated returns independent of public market moves.' }].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-violet-600" /></div>
                  <div><h4 className="font-semibold text-slate-900 mb-0.5">{item.title}</h4><p className="text-slate-500 text-sm">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Alternative investments" className="rounded-2xl shadow-xl w-full object-cover" style={{ height: 420 }} />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">Benefits of Investing in AIFs</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{ title: 'Portfolio Diversification', desc: 'Low correlation with traditional assets reduces overall portfolio volatility.' }, { title: 'Access to Private Markets', desc: 'Invest in unlisted companies, real estate, and private credit unavailable to retail investors.' }, { title: 'Professional Management', desc: 'Top-tier fund managers with specialized domain expertise manage your capital.' }, { title: 'Potential for Superior Returns', desc: 'Illiquidity premium and niche strategies can generate alpha over public markets.' }].map(b => (
              <div key={b.title} className="card p-5 text-center">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-3"><Award className="w-5 h-5 text-violet-600" /></div>
                <h3 className="font-semibold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore AIF Opportunities</h2>
          <p className="text-violet-100 mb-8">Our AIF specialists will guide you through curated opportunities aligned to your investment objectives.</p>
          <button onClick={() => nav('contact')} className="bg-white text-violet-700 hover:bg-violet-50 font-semibold px-10 py-3 rounded-lg transition-colors inline-flex items-center gap-2">Request a Consultation <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
    </div>
  );
}
