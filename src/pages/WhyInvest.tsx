import { TrendingUp, Shield, BarChart2, Clock, Globe, ArrowRight } from 'lucide-react';

interface WhyInvestProps { onNavigate: (page: string) => void; }

const reasons = [
  { icon: TrendingUp, title: 'Beat Inflation', desc: 'Savings accounts earn 3-4% while inflation erodes ~6% annually. Investing in equities historically delivers 12-15% CAGR to protect and grow your purchasing power.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: BarChart2, title: 'Power of Compounding', desc: '₹10,000 invested monthly for 20 years at 12% CAGR grows to ₹99 lakhs. Starting early is the single most powerful financial decision you can make.', color: 'bg-blue-50 text-blue-600' },
  { icon: Shield, title: 'Financial Security', desc: "Build a corpus for emergencies, children's education, retirement, and life goals. A well-built investment portfolio is your ultimate financial safety net.", color: 'bg-violet-50 text-violet-600' },
  { icon: Clock, title: 'Time is Your Edge', desc: 'The longer you stay invested, the lower your risk and higher your returns. Start today — even small amounts invested consistently create substantial wealth.', color: 'bg-amber-50 text-amber-600' },
  { icon: Globe, title: 'Diversification', desc: 'Spread risk across asset classes — equity, debt, gold, real estate — so no single market downturn derails your financial goals.', color: 'bg-rose-50 text-rose-600' },
  { icon: ArrowRight, title: 'Tax Efficiency', desc: 'ELSS Mutual Funds offer ₹1.5 lakh tax deduction under 80C. Long-term capital gains up to ₹1 lakh are tax-free. Smart investing saves tax too.', color: 'bg-sky-50 text-sky-600' },
];

const myths = [
  { myth: 'Investing is only for the rich', fact: 'You can start SIP from just ₹500/month in mutual funds.' },
  { myth: 'You need market expertise', fact: 'Expert advisors and diversified funds remove the need for personal expertise.' },
  { myth: 'Investing is too risky', fact: 'Risk is manageable with diversification, time horizon, and expert guidance.' },
  { myth: "I'll start when I earn more", fact: 'Starting early with less is always better than starting late with more.' },
];

export default function WhyInvest({ onNavigate }: WhyInvestProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-900 to-emerald-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">Why Invest?</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Your Money Should<br /><span className="text-emerald-400">Work for You</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Discover why investing is not optional but essential for achieving financial freedom in today's world.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">The Silent Wealth Destroyer: Inflation</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { label: '₹1 Lakh in Bank Savings (10 yrs)', val: '₹98,000', color: 'text-red-500', note: 'After inflation adjustment' },
                { label: '₹1 Lakh in Debt Fund (10 yrs)', val: '₹1,48,000', color: 'text-amber-500', note: 'At ~7% annual return' },
                { label: '₹1 Lakh in Equity Fund (10 yrs)', val: '₹3,10,000', color: 'text-emerald-600', note: 'At ~12% annual return' },
              ].map(c => (
                <div key={c.label} className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">{c.label}</p>
                  <p className={`text-2xl font-bold ${c.color}`}>{c.val}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14"><div className="badge mx-auto mb-4">Key Reasons</div><h2 className="section-title mb-4">6 Compelling Reasons to Invest</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map(r => (
              <div key={r.title} className="card p-6">
                <div className={`w-12 h-12 rounded-xl ${r.color} flex items-center justify-center mb-4`}><r.icon className="w-6 h-6" /></div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">SIP Magic</div>
            <h2 className="section-title mb-5">How SIP Creates Millionaires</h2>
            <p className="text-slate-600 leading-relaxed mb-6">Systematic Investment Plan (SIP) is the most disciplined way to invest. By investing a fixed amount every month, you benefit from rupee cost averaging and the magic of compounding.</p>
            <div className="space-y-4">
              {[{ monthly: '₹5,000', years: '20 years', corpus: '₹49.9 Lakhs' }, { monthly: '₹10,000', years: '20 years', corpus: '₹99.9 Lakhs' }, { monthly: '₹20,000', years: '20 years', corpus: '₹1.99 Crore' }].map(row => (
                <div key={row.monthly} className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                  <div><span className="text-emerald-600 font-bold">{row.monthly}/month</span><span className="text-slate-400 text-sm ml-2">for {row.years}</span></div>
                  <div className="text-right"><p className="text-slate-900 font-bold">{row.corpus}</p><p className="text-slate-400 text-xs">at 12% CAGR</p></div>
                </div>
              ))}
            </div>
            <button onClick={() => nav('calculators')} className="btn-primary mt-6 inline-flex items-center gap-2">Calculate Your SIP <ArrowRight className="w-4 h-4" /></button>
          </div>
          <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Financial growth" className="rounded-2xl w-full object-cover shadow-xl" style={{ height: 420 }} />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Myth Busters</div><h2 className="section-title">Common Investing Myths — Busted</h2></div>
          <div className="space-y-4">
            {myths.map(m => (
              <div key={m.myth} className="bg-white rounded-xl border border-slate-100 p-5 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✗</span>
                  <div><p className="text-xs text-red-500 font-semibold uppercase tracking-wide mb-1">Myth</p><p className="text-slate-700 font-medium text-sm">{m.myth}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <div><p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">Fact</p><p className="text-slate-700 font-medium text-sm">{m.fact}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Investing Today</h2>
          <p className="text-emerald-100 mb-8">The best time to invest was yesterday. The second best time is now.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">Talk to an Advisor</button>
            <button onClick={() => nav('investment-basics')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Learn the Basics</button>
          </div>
        </div>
      </section>
    </div>
  );
}
