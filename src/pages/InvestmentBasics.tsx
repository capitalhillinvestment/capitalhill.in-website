import { useState } from 'react';
import { BookOpen, TrendingUp, Shield, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';

interface BasicsProps { onNavigate: (page: string) => void; }

const faqs = [
  { q: 'What is Net Asset Value (NAV)?', a: "NAV is the per-unit price of a mutual fund. It is calculated by dividing the total value of the fund's assets minus liabilities by the total number of units outstanding. NAV is declared daily after market close." },
  { q: 'What is the difference between SIP and Lumpsum?', a: 'SIP (Systematic Investment Plan) involves investing a fixed amount at regular intervals. Lumpsum is a one-time large investment. SIP reduces timing risk through rupee cost averaging; lumpsum works better when markets are at lows.' },
  { q: 'What is CAGR?', a: 'Compound Annual Growth Rate (CAGR) is the rate at which an investment grows over multiple years, expressed as an annual rate. It shows the smoothed return if the investment grew at a steady rate each year.' },
  { q: 'What is the difference between equity and debt funds?', a: 'Equity funds invest primarily in stocks and aim for high long-term growth but with higher short-term volatility. Debt funds invest in bonds and fixed-income securities offering stable, lower-risk returns.' },
  { q: 'What is Exit Load in mutual funds?', a: 'Exit load is a fee charged when you redeem your mutual fund units before a specified period (usually 1 year). It is typically 1% of the NAV at the time of redemption.' },
  { q: 'What is XIRR?', a: 'XIRR (Extended Internal Rate of Return) is the actual annualized return on investments with irregular cash flows (like SIPs). It is more accurate than simple returns for measuring SIP performance.' },
];

const concepts = [
  { icon: TrendingUp, title: 'Asset Classes', color: 'bg-emerald-50 text-emerald-600', items: [{ term: 'Equity', def: 'Ownership in companies (stocks). Highest long-term returns, higher volatility.' }, { term: 'Debt', def: 'Loans to governments/companies (bonds). Stable income, lower risk.' }, { term: 'Gold', def: 'Inflation hedge, safe haven asset. Best for portfolio diversification.' }, { term: 'Real Estate', def: 'Physical property or REITs. Steady income + appreciation over time.' }] },
  { icon: Shield, title: 'Risk & Return', color: 'bg-blue-50 text-blue-600', items: [{ term: 'Risk Appetite', def: 'Your ability and willingness to tolerate investment losses for higher returns.' }, { term: 'Volatility', def: 'Fluctuation in investment value. Higher volatility = more ups and downs.' }, { term: 'Diversification', def: 'Spreading investments across asset classes to reduce risk.' }, { term: 'Liquidity', def: 'How quickly you can convert an investment to cash without significant loss.' }] },
  { icon: BarChart2, title: 'Fund Types', color: 'bg-violet-50 text-violet-600', items: [{ term: 'Large Cap', def: 'Funds investing in top 100 companies by market cap. Relatively stable.' }, { term: 'Mid Cap', def: 'Funds in companies ranked 101-250. Higher growth potential, moderate risk.' }, { term: 'Small Cap', def: 'Funds in companies ranked 251+. Highest growth potential, highest risk.' }, { term: 'Flexi Cap', def: 'Funds with freedom to invest across market caps based on opportunities.' }] },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-slate-900 text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && <div className="px-6 pb-5 bg-slate-50 border-t border-slate-100"><p className="text-slate-600 text-sm leading-relaxed pt-4">{a}</p></div>}
    </div>
  );
}

export default function InvestmentBasics({ onNavigate }: BasicsProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">Investment Basics</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Learn Before<br /><span className="text-emerald-400">You Invest</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Master the fundamentals of investing — from understanding asset classes to decoding fund jargon — and become a confident investor.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Getting Started</div><h2 className="section-title mb-4">Your Investment Journey in 5 Steps</h2></div>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Define Your Goals', desc: "Identify what you're investing for — retirement at 60, child's education in 15 years, a home in 5 years. Each goal has a different time horizon and risk profile." },
              { step: 2, title: 'Know Your Risk Appetite', desc: 'Assess how comfortable you are with market fluctuations. Young investors can take more risk; those near retirement should prefer stability.' },
              { step: 3, title: 'Choose the Right Asset Allocation', desc: 'Divide your investments across equity, debt, and gold based on your goals and risk tolerance. Diversification is your best friend.' },
              { step: 4, title: 'Select Investment Products', desc: 'Match products to goals: SIP in equity funds for long-term growth, debt funds for short-term goals, ELSS for tax saving.' },
              { step: 5, title: 'Review & Rebalance', desc: 'Review your portfolio annually. Rebalance when asset allocation drifts from the plan. Stay disciplined and avoid emotional decisions.' },
            ].map(s => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg">{s.step}</div>
                <div className="card p-5 flex-1"><h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3><p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Key Concepts</div><h2 className="section-title mb-4">Investment Glossary</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {concepts.map(cat => (
              <div key={cat.title} className="card p-6">
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}><cat.icon className="w-6 h-6" /></div>
                <h3 className="font-bold text-slate-900 text-lg mb-4">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.items.map(item => (
                    <div key={item.term} className="border-l-2 border-emerald-200 pl-3">
                      <p className="text-sm font-semibold text-slate-900">{item.term}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.def}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Strategy</div><h2 className="section-title mb-4">The Investment Pyramid</h2></div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {[
              { level: 'Foundation', desc: 'Emergency Fund (6 months expenses) + Term Insurance + Health Insurance', color: 'bg-slate-100 border-slate-200', width: 'w-full' },
              { level: 'Security', desc: 'PPF, EPF, Fixed Deposits, Debt Mutual Funds', color: 'bg-blue-50 border-blue-100', width: 'w-[85%]' },
              { level: 'Growth', desc: 'Equity Mutual Funds, Index Funds, Large Cap Stocks', color: 'bg-emerald-50 border-emerald-100', width: 'w-[70%]' },
              { level: 'Speculation', desc: 'Small Cap, Sectoral Funds, Direct Equities, Crypto', color: 'bg-amber-50 border-amber-100', width: 'w-[50%]' },
            ].map(tier => (
              <div key={tier.level} className={`${tier.width} mx-auto border rounded-xl p-4 ${tier.color}`}>
                <p className="font-bold text-slate-900 text-sm mb-0.5">{tier.level}</p>
                <p className="text-slate-500 text-xs">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">FAQs</div><h2 className="section-title mb-4">Common Questions</h2></div>
          <div className="space-y-3">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <BookOpen className="w-10 h-10 text-emerald-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Put Theory into Practice?</h2>
          <p className="text-emerald-100 mb-8">Our advisors will guide you through your first investment, step by step.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">Talk to an Advisor</button>
            <button onClick={() => nav('calculators')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Use Calculators</button>
          </div>
        </div>
      </section>
    </div>
  );
}
