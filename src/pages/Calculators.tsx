import { useState } from 'react';
import { Calculator, TrendingUp, BarChart2, RefreshCw } from 'lucide-react';

interface CalculatorsProps { onNavigate: (page: string) => void; }

function fmt(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

function SIPCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const months = years * 12;
  const r = rate / 12 / 100;
  const fv = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const invested = monthly * months;
  const gains = fv - invested;

  return (
    <div>
      <div className="space-y-6 mb-8">
        {[
          { label: 'Monthly Investment', val: `₹${monthly.toLocaleString('en-IN')}`, min: 500, max: 200000, step: 500, set: setMonthly, minL: '₹500', maxL: '₹2,00,000' },
          { label: 'Investment Period', val: `${years} years`, min: 1, max: 40, step: 1, set: setYears, minL: '1 yr', maxL: '40 yrs' },
          { label: 'Expected Annual Return', val: `${rate}%`, min: 4, max: 30, step: 0.5, set: setRate, minL: '4%', maxL: '30%' },
        ].map(f => (
          <div key={f.label}>
            <div className="flex justify-between mb-2"><label className="text-sm font-medium text-slate-700">{f.label}</label><span className="text-emerald-600 font-bold">{f.val}</span></div>
            <input type="range" min={f.min} max={f.max} step={f.step} value={f.min === 500 ? monthly : f.min === 1 ? years : rate} onChange={e => f.set(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>{f.minL}</span><span>{f.maxL}</span></div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Invested</p><p className="font-bold text-slate-900 text-lg">{fmt(invested)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Est. Returns</p><p className="font-bold text-emerald-600 text-lg">{fmt(gains)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Value</p><p className="font-bold text-slate-900 text-xl">{fmt(fv)}</p></div>
        </div>
        <div>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div className="bg-slate-300" style={{ width: `${(invested / fv) * 100}%` }} />
            <div className="bg-emerald-500 flex-1" />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-slate-500">Invested ({Math.round((invested / fv) * 100)}%)</span>
            <span className="text-emerald-600">Returns ({Math.round((gains / fv) * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LumpsumCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const fv = principal * Math.pow(1 + rate / 100, years);
  const gains = fv - principal;

  return (
    <div>
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-medium text-slate-700">Investment Amount</label><span className="text-emerald-600 font-bold">₹{principal.toLocaleString('en-IN')}</span></div>
          <input type="range" min={10000} max={10000000} step={10000} value={principal} onChange={e => setPrincipal(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>₹10,000</span><span>₹1 Cr</span></div>
        </div>
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-medium text-slate-700">Investment Period</label><span className="text-emerald-600 font-bold">{years} years</span></div>
          <input type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1 yr</span><span>40 yrs</span></div>
        </div>
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-medium text-slate-700">Expected Annual Return</label><span className="text-emerald-600 font-bold">{rate}%</span></div>
          <input type="range" min={4} max={30} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>4%</span><span>30%</span></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Invested</p><p className="font-bold text-slate-900 text-lg">{fmt(principal)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Est. Returns</p><p className="font-bold text-emerald-600 text-lg">{fmt(gains)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Value</p><p className="font-bold text-slate-900 text-xl">{fmt(fv)}</p></div>
        </div>
        <div>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div className="bg-slate-300" style={{ width: `${(principal / fv) * 100}%` }} />
            <div className="bg-emerald-500 flex-1" />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-slate-500">Invested ({Math.round((principal / fv) * 100)}%)</span>
            <span className="text-emerald-600">Returns ({Math.round((gains / fv) * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CAGRCalc() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(250000);
  const [years, setYears] = useState(5);
  const cagr = ((Math.pow(final / initial, 1 / years) - 1) * 100);
  const absoluteReturn = ((final - initial) / initial) * 100;

  return (
    <div>
      <div className="space-y-5 mb-8">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Initial Investment (₹)</label>
          <input type="number" value={initial} onChange={e => setInitial(Math.max(1, +e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Final Value (₹)</label>
          <input type="number" value={final} onChange={e => setFinal(Math.max(1, +e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-medium text-slate-700">Investment Period</label><span className="text-emerald-600 font-bold">{years} years</span></div>
          <input type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1 yr</span><span>40 yrs</span></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">CAGR</p>
            <p className={`font-bold text-3xl ${cagr >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{isFinite(cagr) ? `${cagr.toFixed(2)}%` : 'N/A'}</p>
            <p className="text-xs text-slate-400 mt-1">Compounded Annual Growth</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Absolute Return</p>
            <p className={`font-bold text-3xl ${absoluteReturn >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{absoluteReturn.toFixed(2)}%</p>
            <p className="text-xs text-slate-400 mt-1">Total Gain/Loss</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-100 flex justify-between text-sm">
          <span className="text-slate-500">Profit/Loss</span>
          <span className={`font-bold ${final - initial >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{final - initial >= 0 ? '+' : ''}{fmt(final - initial)}</span>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'sip', label: 'SIP Calculator', icon: TrendingUp },
  { id: 'lumpsum', label: 'Lumpsum', icon: BarChart2 },
  { id: 'cagr', label: 'CAGR Calculator', icon: Calculator },
];

export default function Calculators({ onNavigate }: CalculatorsProps) {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum' | 'cagr'>('sip');
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">Calculators</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Plan Your Investments<br /><span className="text-emerald-400">with Precision</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Use our interactive calculators to estimate SIP returns, lumpsum growth, and calculate CAGR for any investment.</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 mb-8 shadow-sm">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">{activeTab === 'sip' ? 'SIP Returns Calculator' : activeTab === 'lumpsum' ? 'Lumpsum Calculator' : 'CAGR Calculator'}</h2>
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            {activeTab === 'sip' && <SIPCalc />}
            {activeTab === 'lumpsum' && <LumpsumCalc />}
            {activeTab === 'cagr' && <CAGRCalc />}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">* Calculations are estimates based on assumed constant returns. Actual returns may vary. Not financial advice.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Goal Planning</div><h2 className="section-title mb-4">How Much SIP Do You Need?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{ goal: "Child's Education", target: '₹50 Lakhs', horizon: '15 years', sip: '₹10,000/mo', rate: '12% CAGR' }, { goal: 'Home Down Payment', target: '₹25 Lakhs', horizon: '7 years', sip: '₹18,500/mo', rate: '12% CAGR' }, { goal: 'Retirement Corpus', target: '₹5 Crore', horizon: '25 years', sip: '₹25,000/mo', rate: '12% CAGR' }, { goal: 'Dream Vacation', target: '₹5 Lakhs', horizon: '3 years', sip: '₹13,000/mo', rate: '10% CAGR' }].map(g => (
              <div key={g.goal} className="card p-5 text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{g.goal}</p>
                <p className="text-2xl font-bold text-emerald-600 mb-1">{g.target}</p>
                <p className="text-slate-500 text-xs mb-4">in {g.horizon} at {g.rate}</p>
                <div className="bg-emerald-50 rounded-lg py-2.5 px-3"><p className="text-xs text-slate-500">Start SIP of</p><p className="text-lg font-bold text-slate-900">{g.sip}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <RefreshCw className="w-10 h-10 text-emerald-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Investing?</h2>
          <p className="text-emerald-100 mb-8">Our advisors will help you build a personalized investment plan based on your exact goals.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">Talk to an Advisor</button>
            <button onClick={() => nav('mutual-funds')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Explore Mutual Funds</button>
          </div>
        </div>
      </section>
    </div>
  );
}
