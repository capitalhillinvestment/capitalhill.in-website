import { Star, CheckCircle, ArrowRight, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface IPOProps { onNavigate: (page: string) => void; }

const upcomingIPOs = [
  { company: 'TechNova Solutions Ltd', industry: 'IT Services', price: '₹340-360', gmp: '+₹45', date: 'Jun 15-17', lot: '41 shares', status: 'Upcoming' },
  { company: 'GreenPower Energy Corp', industry: 'Renewable Energy', price: '₹180-190', gmp: '+₹28', date: 'Jun 20-24', lot: '78 shares', status: 'Upcoming' },
  { company: 'HealthFirst Pharma', industry: 'Pharmaceuticals', price: '₹425-450', gmp: '+₹62', date: 'Jun 28-30', lot: '33 shares', status: 'Opening Soon' },
];

export default function IPO({ onNavigate }: IPOProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-amber-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30 mb-5"><Star className="w-3.5 h-3.5" /> Initial Public Offerings</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Get In Early with<br /><span className="text-amber-400">India's Best IPOs</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Apply for carefully selected IPOs with expert GMP analysis, subscription data, and recommendation — all in one place.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-4">What is an IPO?</div>
            <h2 className="section-title mb-5">Own a Piece of India's Growth Companies</h2>
            <p className="text-slate-600 leading-relaxed mb-5">An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time on a stock exchange. IPOs give you the opportunity to invest in companies before they become established public entities.</p>
            <div className="space-y-3">
              {['Opportunity to invest at listing price', 'ASBA-based application — no fund deduction until allotment', 'Apply through UPI (₹5 lakh limit) or bank ASBA', 'Listing gains often seen on popular IPOs', 'Long-term wealth if fundamentals are strong'].map(pt => (
                <div key={pt} className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-slate-600 text-sm">{pt}</span></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">IPO Application Process</h3>
            {[{ step: 1, title: 'Check IPO Details', desc: 'Review prospectus, GMP, subscription data, and analyst recommendation.' }, { step: 2, title: 'Apply via UPI / ASBA', desc: 'Submit application through your broker or net banking before close date.' }, { step: 3, title: 'Fund Block', desc: 'Your funds are blocked in your account — no deduction until allotment.' }, { step: 4, title: 'Allotment & Listing', desc: 'Shares allotted via lottery (retail). Listing usually 6 working days after close.' }].map(s => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{s.step}</div>
                <div><p className="font-semibold text-slate-900 text-sm">{s.title}</p><p className="text-slate-500 text-xs">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="badge mx-auto mb-4">Upcoming IPOs</div><h2 className="section-title mb-4">Current & Upcoming IPOs</h2><p className="text-slate-500 text-sm">All data is illustrative. Connect with us for live IPO calendar and expert recommendations.</p></div>
          <div className="grid md:grid-cols-3 gap-5">
            {upcomingIPOs.map(ipo => (
              <div key={ipo.company} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ipo.status === 'Opening Soon' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{ipo.status}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">GMP {ipo.gmp}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{ipo.company}</h3>
                <p className="text-slate-500 text-xs mb-4">{ipo.industry}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Price Band</span><span className="font-semibold text-slate-900">{ipo.price}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Issue Date</span><span className="font-semibold text-slate-900">{ipo.date}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Lot Size</span><span className="font-semibold text-slate-900">{ipo.lot}</span></div>
                </div>
                <button onClick={() => nav('contact')} className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">Apply Now</button>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">IPO data shown is for illustrative purposes only. GMP does not guarantee listing gains.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="section-title mb-4">How Capital Hill Helps You Invest in IPOs</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{ icon: TrendingUp, title: 'Expert Analysis', desc: 'In-depth IPO review: valuation, business quality, promoter background, and risk factors.' }, { icon: Star, title: 'Buy/Avoid Rating', desc: 'Clear recommendation — Subscribe, Neutral, or Avoid — based on our research.' }, { icon: Clock, title: 'Timely Alerts', desc: 'SMS and email alerts on IPO openings, GMP updates, and allotment status.' }, { icon: CheckCircle, title: 'Application Support', desc: 'Dedicated relationship manager to guide your IPO application process end-to-end.' }].map(b => (
              <div key={b.title} className="card p-5 text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3"><b.icon className="w-6 h-6 text-amber-600" /></div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss an IPO Opportunity</h2>
          <p className="text-amber-100 mb-8">Get expert IPO recommendations and alerts delivered to you.</p>
          <button onClick={() => nav('contact')} className="bg-white text-amber-700 hover:bg-amber-50 font-semibold px-10 py-3 rounded-lg transition-colors inline-flex items-center gap-2">Sign Up for IPO Alerts <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
    </div>
  );
}
