import { Users, Award, Target, Heart, TrendingUp, CheckCircle } from 'lucide-react';

interface AboutProps { onNavigate: (page: string) => void; }

const team = [
  { name: 'Vikram Kapoor', role: 'Founder & CEO', exp: '25 years in wealth management', img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Sunita Agarwal', role: 'Chief Investment Officer', exp: 'Ex-Goldman Sachs, 20 years exp.', img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Rohit Nair', role: 'Head of Research', exp: 'IIM Ahmedabad, CFA Charterholder', img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Anita Desai', role: 'Head of Client Relations', exp: '15 years, CFP Certified', img: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const values = [
  { icon: CheckCircle, title: 'Integrity First', desc: 'We put client interest above everything. No hidden charges, no conflicts of interest.' },
  { icon: Target, title: 'Goal-Oriented', desc: 'Every investment recommendation is tied to your specific life goals and timeline.' },
  { icon: TrendingUp, title: 'Research-Backed', desc: 'Decisions driven by rigorous in-house analysis, not market rumors or speculation.' },
  { icon: Heart, title: 'Client-Centric', desc: 'We build long-term relationships, not one-off transactions. Your success is ours.' },
];

export default function About({ onNavigate }: AboutProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">About Us</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
Your Partner in
<br />
<span className="text-emerald-400">Financial Growth</span>
</h1>

<p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
Capital Hill Investment helps individuals and families make informed financial decisions through financial planning, goal-based investing, mutual funds, insurance solutions, PMS, AIFs, and wealth management services.
</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="badge mb-4">Our Story</div>
            <h2 className="section-title mb-5">Helping Investors Build Wealth with Purpose</h2>
            <p className="text-slate-600 leading-relaxed mb-5">
Capital Hill Investment was established with a vision to make financial planning and wealth creation accessible to every investor. We believe that successful investing begins with understanding life goals, risk appetite, and financial priorities.
</p>

<p className="text-slate-600 leading-relaxed mb-8">
Our approach combines financial planning with suitable investment solutions including Mutual Funds, Insurance, PMS, AIFs, Fixed Income products, and goal-based strategies. We focus on helping clients create, grow, protect, and transfer wealth efficiently.
</p>
            <div className="grid grid-cols-2 gap-4">
              {.map(s => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-4"><p className="text-2xl font-bold text-emerald-600">{s.num}</p><p className="text-slate-500 text-sm">{s.label}</p></div>
              ))}
            </div>
          </div>
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Team working" className="rounded-2xl shadow-xl w-full object-cover" style={{ height: 480 }} />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="badge mx-auto mb-4">Our Values</div>
            <h2 className="section-title mb-4">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4"><v.icon className="w-6 h-6 text-emerald-600" /></div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="badge mx-auto mb-4">Leadership</div>
            <h2 className="section-title mb-4">Meet Our Expert Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="card p-6 text-center group">
                <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-emerald-100 group-hover:ring-emerald-300 transition-all" />
                <h3 className="font-bold text-slate-900 mb-0.5">{m.name}</h3>
                <p className="text-emerald-600 text-sm font-medium mb-2">{m.role}</p>
                <p className="text-slate-500 text-xs">{m.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="badge mx-auto mb-4">Awards & Recognition</div>
            <h2 className="section-title">Honored by the Best</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ award: 'Best Investment Advisor', org: 'Economic Times Awards', year: '2024' }, { award: 'Top Wealth Manager', org: 'CNBC TV18 India', year: '2023' }, { award: 'Client Excellence Award', org: 'AMFI India', year: '2023' }, { award: 'Best MF Distributor', org: 'Outlook Money', year: '2022' }].map(a => (
              <div key={a.award} className="card p-5 text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3"><Award className="w-5 h-5 text-amber-600" /></div>
                <p className="font-semibold text-slate-900 text-sm mb-1">{a.award}</p>
                <p className="text-slate-500 text-xs">{a.org}</p>
                <p className="text-emerald-600 text-xs font-semibold mt-1">{a.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Family</h2>
          <p className="text-emerald-100 mb-8">Over 50,000 investors trust Capital Hill with their wealth. Start your journey today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">Book a Consultation</button>
            <button onClick={() => nav('why-invest')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Why Invest?</button>
          </div>
        </div>
      </section>
    </div>
  );
}
