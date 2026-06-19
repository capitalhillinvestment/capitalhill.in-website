import { Newspaper, TrendingUp, BarChart3, Clock, ArrowRight, Sparkles, Bell } from 'lucide-react';

interface MarketInsightsProps { onNavigate: (page: string) => void; }

export default function MarketInsights({ onNavigate }: MarketInsightsProps) {
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Research Platform</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Market Insights</h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Coming soon: Market analysis, NAV movements, sector trends, and expert commentary on mutual fund performance.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-12">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
              We're building a comprehensive market insights platform with real-time analysis, expert opinions, and trend tracking.
            </p>

            {/* Planned Features */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: TrendingUp, title: 'NAV Analysis', desc: 'Daily movement tracking' },
                { icon: BarChart3, title: 'Sector Trends', desc: 'Industry-wise performance' },
                { icon: Clock, title: 'Historical Data', desc: '5-year performance charts' },
                { icon: Newspaper, title: 'News Feed', desc: 'Market news & updates' },
                { icon: Sparkles, title: 'Expert Views', desc: 'Fund manager insights' },
                { icon: Bell, title: 'Alerts', desc: 'Custom notifications' },
              ].map((feature, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100">
                  <feature.icon className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Get Notified */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => nav('contact')} className="btn-primary flex items-center gap-2">
                Get Notified <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => nav('research-mf')} className="text-blue-600 font-semibold hover:underline">
                Explore Mutual Fund Research
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Explore Other Research Tools</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Fund Explorer', page: 'research-mf', desc: 'Search 50+ mutual funds' },
              { title: 'Fund Comparison', page: 'research-compare', desc: 'Compare up to 10 funds' },
              { title: 'Fund Screener', page: 'research-screener', desc: 'Advanced filtering' },
              { title: 'Top Performers', page: 'research-top', desc: 'Best returns by category' },
            ].map(item => (
              <button key={item.page} onClick={() => nav(item.page)} className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 text-left transition-colors">
                <ArrowRight className="w-4 h-4 text-slate-400 mb-2" />
                <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
