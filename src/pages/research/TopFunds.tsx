import { useState, useMemo, useEffect } from 'react';
import { Trophy, Star, Medal, BarChart2, Filter } from 'lucide-react';
import {MutualFund, categoryOptions, riskColors} from '../../data/mutualFunds';

interface TopFundsProps { onNavigate: (page: string) => void; }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  );
}

type Timeframe = 'oneYear' | 'threeYear' | 'fiveYear';
type Grouping = 'all' | 'category';

export default function TopFunds({ onNavigate }: TopFundsProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('oneYear');
  const [grouping, setGrouping] = useState<Grouping>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [loading, setLoading] = useState(true);

   nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topFunds = useMemo(() => {
  let filteredFunds = [...funds];

  if (grouping === 'category' && selectedCategory) {
    filteredFunds = filteredFunds.filter(
      f => f.category === selectedCategory
    );
  }

  filteredFunds.sort(
    (a, b) =>
      b.returns[timeframe] -
      a.returns[timeframe]
  );

  if (grouping === 'all') {
    return filteredFunds.slice(0, 10);
  }

  const categoryMap = new Map<
    string,
    MutualFund[]
  >();

  for (const fund of filteredFunds) {
    const cat = fund.category;

    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }

    const catFunds =
      categoryMap.get(cat)!;

    if (catFunds.length < 3) {
      catFunds.push(fund);
    }
  }

  return Array.from(
    categoryMap.entries()
  ).flatMap(([_, funds]) => funds);

}, [
  funds,
  timeframe,
  grouping,
  selectedCategory
]);
    let funds = [...funds];

    // Filter by category if needed
    if (grouping === 'category' && selectedCategory) {
      funds = funds.filter(f => f.category === selectedCategory);
    }

    // Sort by return
    funds.sort((a, b) => b.returns[timeframe] - a.returns[timeframe]);

    // Take top funds
    if (grouping === 'all') {
      return funds.slice(0, 10);
    }

    // Group by category - return top 3 per category
    const categoryMap = new Map<string, MutualFund[]>();
    for (const fund of funds) {
      const cat = fund.category;
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      const catFunds = categoryMap.get(cat)!;
      if (catFunds.length < 3) catFunds.push(fund);
    }
    return Array.from(categoryMap.entries()).flatMap(([cat, funds]) => funds.map(f => ({ ...f, category: cat })));
  }, [timeframe, grouping, selectedCategory]);

  const timeframeLabels = {
    oneYear: '1 Year',
    threeYear: '3 Years',
    fiveYear: '5 Years',
  };

  const getReturnForTimeframe = (fund: MutualFund) => {
    return fund.returns[timeframe];
  };

if (loading) {
  return (
    <div className="pt-24 text-center">
      Loading Top Funds...
    </div>
  );
}
  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Research Platform</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Top Performing Funds</h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Discover the best-performing mutual funds ranked by returns. Filter by time period and category.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Timeframe */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Period:</span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {(['oneYear', 'threeYear', 'fiveYear'] as Timeframe[]).map(tf => (
                  <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeframe === tf ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    {timeframeLabels[tf]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grouping Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">View:</span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button onClick={() => setGrouping('all')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${grouping === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                  Overall Top 10
                </button>
                <button onClick={() => setGrouping('category')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${grouping === 'category' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                  By Category
                </button>
              </div>
            </div>

            {/* Category Filter */}
            {grouping === 'category' && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Categories</option>
                  {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Funds Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {grouping === 'all' ? (
            /* Overall Top 10 */
            <div className="space-y-3">
              {topFunds.map((fund, idx) => (
                <div key={fund.id} className={`bg-white rounded-xl border ${idx < 3 ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-white' : 'border-slate-200'} p-5 flex items-center gap-5`}>
                  {/* Rank */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-slate-300' : idx === 2 ? 'bg-amber-600' : 'bg-slate-100'}`}>
                    {idx < 3 ? (
                      <Medal className={`w-7 h-7 ${idx === 0 ? 'text-yellow-900' : 'text-slate-700'}`} />
                    ) : (
                      <span className="text-slate-700 font-bold text-lg">#{idx + 1}</span>
                    )}
                  </div>

                  {/* Fund Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-slate-900 truncate">{fund.name}</p>
                      <StarRating rating={fund.rating} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">{fund.amc}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${riskColors[fund.riskLevel]}`}>{fund.category}</span>
                    </div>
                  </div>

                  {/* Returns */}
                  <div className="text-center px-4">
                    <p className="text-sm text-slate-400">{timeframeLabels[timeframe]} Return</p>
                    <p className="text-2xl font-bold text-emerald-600">+{getReturnForTimeframe(fund).toFixed(2)}%</p>
                  </div>

                  {/* NAV & AUM */}
                  <div className="text-right px-4 border-l border-slate-100">
                    <p className="text-sm text-slate-400">NAV</p>
                    <p className="font-bold text-slate-900">₹{fund.nav.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">AUM</p>
                    <p className="font-bold text-slate-900">₹{(fund.aum/1000).toFixed(1)}k Cr</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* By Category - Top 3 per category */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryOptions.map(category => { const catFunds = funds
                .filter(f => f.category === category).sort((a, b) => b.returns[timeframe] - a.returns[timeframe]).slice(0, 3);
                if (selectedCategory && category !== selectedCategory) return null;
                if (catFunds.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">{category}</h3>
                      <span className="text-xs text-slate-500">{catFunds.length} top funds</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {catFunds.map((fund, idx) => (
                        <div key={fund.id} className={`p-4 ${idx === 0 ? 'bg-emerald-50' : ''}`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{idx + 1}</span>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm truncate">{fund.name}</p>
                                <p className="text-xs text-slate-500">{fund.amc}</p>
                              </div>
                            </div>
                            <StarRating rating={fund.rating} />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">{timeframeLabels[timeframe]}:</span>
                            <span className="font-bold text-emerald-600">+{getReturnForTimeframe(fund).toFixed(2)}%</span>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-slate-400">NAV</span>
                            <span className="text-slate-700">₹{fund.nav.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <BarChart2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
              <p className="text-xs text-amber-700 leading-relaxed">Past performance is not indicative of future results. Returns are based on historical NAV data. Please consult a financial advisor before making investment decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Trophy className="w-10 h-10 text-blue-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Invest in Top Performers?</h2>
          <p className="text-blue-100 mb-6">Our advisors can help you build a portfolio with the best funds.</p>
          <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">Contact Advisor</button>
        </div>
      </section>
    </div>
  );
}
