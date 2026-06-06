import { ArrowRight, ShieldCheck, TrendingUp, Users, Award, BarChart2, Star, ChevronRight } from 'lucide-react';

interface HomeProps { onNavigate: (page: string) => void; }

const stats = [
  { value: '₹2,500 Cr+', label: 'Handled Assets Under Management' },
  { value: '1,000', label: 'Handeled Happy Investors' },
  { value: '7+', label: 'Years of Excellence' },
  { value: '4.9/5', label: 'Client Rating' },
];

const services = [
  { icon: BarChart2, title: 'Mutual Funds', desc: 'Diversified portfolios managed by expert fund managers for steady long-term growth.', page: 'mutual-funds', color: 'bg-blue-50 text-blue-600' },
  { icon: TrendingUp, title: 'Portfolio Management', desc: 'Personalized, actively managed equity portfolios designed for HNI investors.', page: 'pms', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Award, title: 'AIF', desc: 'Alternative Investment Funds offering unique strategies beyond traditional markets.', page: 'aif', color: 'bg-violet-50 text-violet-600' },
  { icon: Star, title: 'IPO', desc: 'Get early access to promising companies listing on Indian stock exchanges.', page: 'ipo', color: 'bg-amber-50 text-amber-600' },
  { icon: ShieldCheck, title: 'NFO', desc: 'New Fund Offers providing fresh investment opportunities at inception price.', page: 'nfo', color: 'bg-rose-50 text-rose-600' },
  { icon: Users, title: 'Financial Planning', desc: 'Comprehensive goal-based financial planning tailored to your life milestones.', page: 'about', color: 'bg-sky-50 text-sky-600' },
];

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Business Owner, Delhi', text: 'Capital Hill has transformed my investment approach. Their expert guidance helped me achieve 22% CAGR over 5 years.', img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'Priya Mehta', role: 'IT Professional, Bangalore', text: 'The SIP recommendations and portfolio review service is exceptional. My wealth has grown 3x in 7 years.', img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'Amit Verma', role: 'Doctor, Mumbai', text: 'Trusted advisors who genuinely care about client outcomes. Their transparency and research is commendable.', img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

export default function Home({ onNavigate }: HomeProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge mb-6"><ShieldCheck className="w-3.5 h-3.5" /> Investment Distribution & Financial Planning Services</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Grow Your Wealth<span className="block text-emerald-400 mt-1">The Right Way With Confidence</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">Expert-guided investment solutions in Mutual Funds, PMS, AIF, and more. Start your wealth creation journey with India's trusted investment advisor.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => nav('contact')} className="btn-primary flex items-center gap-2 text-base">Start Investing <ArrowRight className="w-4 h-4" /></button>
              <button onClick={() => nav('investment-basics')} className="border-2 border-slate-400 text-slate-200 hover:bg-slate-700 hover:border-slate-600 font-semibold px-6 py-3 rounded-lg transition-all text-base">Learn the Basics</button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white font-semibold">Portfolio Performance</p>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2.5 py-1 rounded-full">+18.4% YTD</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Large Cap Fund', alloc: '40%', ret: '+14.2%', w: '40%', color: 'bg-emerald-400' },
                  { name: 'Mid Cap Fund', alloc: '30%', ret: '+22.8%', w: '30%', color: 'bg-blue-400' },
                  { name: 'Small Cap Fund', alloc: '20%', ret: '+31.5%', w: '20%', color: 'bg-amber-400' },
                  { name: 'Debt Fund', alloc: '10%', ret: '+7.1%', w: '10%', color: 'bg-slate-400' },
                ].map(f => (
                  <div key={f.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/80 text-sm">{f.name}</span>
                      <div className="flex items-center gap-3"><span className="text-white/60 text-xs">{f.alloc}</span><span className="text-emerald-400 text-sm font-medium">{f.ret}</span></div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${f.color} rounded-full`} style={{ width: f.w }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div><p className="text-white/60 text-xs">Total Portfolio Value</p><p className="text-white font-bold text-xl">₹24,68,500</p></div>
                <div className="text-right"><p className="text-white/60 text-xs">Total Returns</p><p className="text-emerald-400 font-bold text-xl">+₹4,18,500</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{s.value}</p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="badge mx-auto mb-4">Our Services</div>
            <h2 className="section-title mb-4">Smart Investment Solutions</h2>
            <p className="section-subtitle max-w-xl mx-auto">From first-time investors to seasoned HNIs, we offer the right products to match your financial goals.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <button key={s.page} onClick={() => nav(s.page)} className="card p-6 text-left group hover:border-emerald-200">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ChevronRight className="w-4 h-4" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="badge mb-4">Why Capital Hill</div>
            <h2 className="section-title mb-5">Trusted Expertise,<br />Proven Results</h2>
            <p className="section-subtitle mb-8">We combine cutting-edge research with personalized guidance to deliver consistent investment outcomes.</p>
            <div className="space-y-5">
              {[
                { icon: ShieldCheck, title: 'SEBI Registered & Compliant', desc: 'Fully regulated advisor operating under SEBI guidelines for your safety.' },
                { icon: Users, title: 'Dedicated Relationship Manager', desc: 'Your personal advisor available anytime to guide investment decisions.' },
                { icon: BarChart2, title: 'Research-Driven Approach', desc: 'In-house research team with deep fundamental & quantitative analysis.' },
                { icon: TrendingUp, title: 'Goal-Based Financial Planning', desc: 'Investments aligned to your life goals — retirement, education, home.' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-emerald-600" /></div>
                  <div><h4 className="font-semibold text-slate-900 mb-0.5">{item.title}</h4><p className="text-slate-500 text-sm">{item.desc}</p></div>
                </div>
              ))}
            </div>
            <button onClick={() => nav('about')} className="btn-primary mt-8 inline-flex items-center gap-2">About Us <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="relative">
            <img src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Investment team" className="rounded-2xl w-full object-cover shadow-xl" style={{ height: 460 }} />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-emerald-600" /></div>
                <div><div>
  <p className="font-bold text-slate-900 text-sm">
    Capital Hill Investment
  </p>
  <p className="text-slate-500 text-xs">
    Your Partner in Financial Growth
  </p>
</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="badge mx-auto mb-4">Testimonials</div>
            <h2 className="section-title mb-4">What Our Investors Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex items-center gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><p className="font-semibold text-slate-900 text-sm">{t.name}</p><p className="text-slate-500 text-xs">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Wealth Journey?</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">Schedule a free consultation with our expert advisors and take the first step towards financial freedom.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm">Get Free Consultation</button>
            <button onClick={() => nav('calculators')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Try Calculators</button>
          </div>
        </div>
      </section>
    </div>
  );
}
