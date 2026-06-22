
import { Filter, RotateCcw, Search, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

import {
  MutualFund,
  amcOptions,
  categoryOptions,
  riskColors,
  riskBarColors,
} from '../../data/mutualFunds';

interface FundScreenerProps { onNavigate: (page: string) => void; }

function Riskometer({ level }: { level: string }) {
  const riskOrder = ['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High'];
  const idx = riskOrder.indexOf(level);
  return (
    <div className="flex items-center gap-1">
      {riskOrder.map((_, i) => (
        <div key={i} className={`w-1.5 h-3 rounded-sm ${i <= idx ? riskBarColors[level] : 'bg-slate-200'}`} />
      ))}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  );
}

export default function FundScreener({ onNavigate }: FundScreenerProps) {
  const [showFilters, setShowFilters] = useState(true);
const [funds, setFunds] = useState<MutualFund[]>([]);
const [loading, setLoading] = useState(true);
  // Search
  const [search, setSearch] = useState('');

  // AMC Filter
  const [selectedAMCs, setSelectedAMCs] = useState<string[]>([]);

  // Category Filter
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Risk Filter
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  // Rating Filter
  const [minRating, setMinRating] = useState(0);

  // AUM Filter (in Cr)
  const [minAUM, setMinAUM] = useState(0);
  const [maxAUM, setMaxAUM] = useState(100000);

  // Returns Filter
  const [minReturn1Y, setMinReturn1Y] = useState<number | ''>('');
  const [minReturn3Y, setMinReturn3Y] = useState<number | ''>('');
  const [minReturn5Y, setMinReturn5Y] = useState<number | ''>('');

  // Expense Ratio
  const [maxExpense, setMaxExpense] = useState<number | ''>('');

  // Min SIP
  const [maxMinSIP, setMaxMinSIP] = useState<number | ''>('');

  // Sort
  const [sortBy, setSortBy] = useState<'returns.oneYear' | 'returns.threeYear' | 'returns.fiveYear' | 'aum' | 'nav' | 'expenseRatio' | 'rating'>('returns.oneYear');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

useEffect(() => {
  async function loadFunds() {
    try {
      const res = await fetch('/api/funds');
      const data = await res.json();

      if (data.success) {
        setFunds(data.data);
      }
    } catch (err) {
      console.error('Failed to load funds', err);
    } finally {
      setLoading(false);
    }
  }

  loadFunds();
}, []);
  
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
console.log("Funds loaded:", funds.length);
console.log(funds);
  
  const filteredFunds = useMemo(() => {
    let result = funds.filter(f => {
      // Search
      if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.amc.toLowerCase().includes(search.toLowerCase())) return false;

      // AMC
      if (selectedAMCs.length > 0 && !selectedAMCs.includes(f.amc)) return false;

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(f.category)) return false;

      // Risk
      if (selectedRisks.length > 0 && !selectedRisks.includes(f.riskLevel)) return false;

      // Rating
      if (f.rating < minRating) return false;

      // AUM
      if (f.aum < minAUM || f.aum > maxAUM) return false;

      // Returns
      if (minReturn1Y !== '' && f.returns.oneYear < minReturn1Y) return false;
      if (minReturn3Y !== '' && f.returns.threeYear < minReturn3Y) return false;
      if (minReturn5Y !== '' && f.returns.fiveYear < minReturn5Y) return false;

      // Expense Ratio
      if (maxExpense !== '' && f.expenseRatio > maxExpense) return false;

      // Min SIP
      if (maxMinSIP !== '' && f.minInvestment > maxMinSIP) return false;

      return true;
    });

    // Sort
    result.sort((a, b) => {
      const keys = sortBy.split('.');
      let valA: unknown = a;
      let valB: unknown = b;
      for (const k of keys) {
        valA = (valA as Record<string, unknown>)?.[k];
        valB = (valB as Record<string, unknown>)?.[k];
      }
      const numA = typeof valA === 'number' ? valA : 0;
      const numB = typeof valB === 'number' ? valB : 0;
      return sortOrder === 'desc' ? numB - numA : numA - numB;
    });

    return result;
  }, [search, selectedAMCs, selectedCategories, selectedRisks, minRating, minAUM, maxAUM, minReturn1Y, minReturn3Y, minReturn5Y, maxExpense, maxMinSIP, sortBy, sortOrder]);

  const resetFilters = () => {
    setSearch('');
    setSelectedAMCs([]);
    setSelectedCategories([]);
    setSelectedRisks([]);
    setMinRating(0);
    setMinAUM(0);
    setMaxAUM(100000);
    setMinReturn1Y('');
    setMinReturn3Y('');
    setMinReturn5Y('');
    setMaxExpense('');
    setMaxMinSIP('');
  };

  const totalFilters = selectedAMCs.length + selectedCategories.length + selectedRisks.length +
    (minRating > 0 ? 1 : 0) + (minAUM > 0 || maxAUM < 100000 ? 1 : 0) +
    (minReturn1Y !== '' ? 1 : 0) + (minReturn3Y !== '' ? 1 : 0) + (minReturn5Y !== '' ? 1 : 0) +
    (maxExpense !== '' ? 1 : 0) + (maxMinSIP !== '' ? 1 : 0);

  const toggleArrayItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };
if (loading) {
  return (
    <div className="pt-24 text-center">
      Loading Fund Screener...
    </div>
  );
}
  
  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Research Platform</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Fund Screener</h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Use advanced filters to find mutual funds that match your investment criteria. Filter by performance, AUM, risk, and more.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'w-80' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden print:hidden`}>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Filters</h3>
                {totalFilters > 0 && (
                  <button onClick={resetFilters} className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Fund name..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>

              {/* AMC */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">AMC ({selectedAMCs.length})</label>
                <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                  {amcOptions.slice(0, 10).map(amc => (
                    <label key={amc} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:text-slate-900">
                      <input type="checkbox" checked={selectedAMCs.includes(amc)} onChange={() => toggleArrayItem(selectedAMCs, setSelectedAMCs, amc)} className="rounded text-blue-600" />
                      <span className="truncate">{amc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Category ({selectedCategories.length})</label>
                <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                  {categoryOptions.map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:text-slate-900">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat)} className="rounded text-blue-600" />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Risk */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Risk Level</label>
                <div className="flex flex-wrap gap-1">
                  {['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High'].map(risk => (
                    <button key={risk} onClick={() => toggleArrayItem(selectedRisks, setSelectedRisks, risk)} className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${selectedRisks.includes(risk) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {risk.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Min Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${minRating >= r ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                      <Star className={`w-4 h-4 ${minRating >= r ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* AUM Range */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">AUM Range (₹ Cr)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" value={minAUM || ''} onChange={e => setMinAUM(Number(e.target.value) || 0)} placeholder="Min" className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" value={maxAUM === 100000 ? '' : maxAUM} onChange={e => setMaxAUM(Number(e.target.value) || 100000)} placeholder="Max" className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Returns */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Min Returns (%)</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input type="number" value={minReturn1Y} onChange={e => setMinReturn1Y(e.target.value ? Number(e.target.value) : '')} placeholder="1Y" className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <input type="number" value={minReturn3Y} onChange={e => setMinReturn3Y(e.target.value ? Number(e.target.value) : '')} placeholder="3Y" className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <input type="number" value={minReturn5Y} onChange={e => setMinReturn5Y(e.target.value ? Number(e.target.value) : '')} placeholder="5Y" className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Expense Ratio & Min SIP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Max Expense</label>
                  <input type="number" step="0.01" value={maxExpense} onChange={e => setMaxExpense(e.target.value ? Number(e.target.value) : '')} placeholder="%" className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Max Min SIP</label>
                  <input type="number" value={maxMinSIP} onChange={e => setMaxMinSIP(e.target.value ? Number(e.target.value) : '')} placeholder="₹" className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Toggle Filters Button (Mobile) */}
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg">
              <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Results Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">{filteredFunds.length} funds found</span>
                {totalFilters > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{totalFilters} filter{totalFilters > 1 ? 's' : ''} active</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none">
                  <option value="returns.oneYear">1Y Return</option>
                  <option value="returns.threeYear">3Y Return</option>
                  <option value="returns.fiveYear">5Y Return</option>
                  <option value="aum">AUM</option>
                  <option value="nav">NAV</option>
                  <option value="expenseRatio">Expense Ratio</option>
                  <option value="rating">Rating</option>
                </select>
                <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 flex items-center gap-1">
                  <TrendingUp className={`w-4 h-4 ${sortOrder === 'desc' ? '' : 'rotate-180'}`} />
                  {sortOrder === 'desc' ? 'High-Low' : 'Low-High'}
                </button>
              </div>
            </div>

            {/* Fund List */}
            {filteredFunds.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No funds match your criteria</h3>
                <p className="text-slate-500 text-sm mb-4">Try adjusting your filters.</p>
                <button onClick={resetFilters} className="text-blue-600 font-medium text-sm hover:underline">Reset all filters</button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFunds.map((fund, idx) => (
                  <div key={fund.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-400 font-mono">#{idx + 1}</span>
                          <p className="font-bold text-slate-900 truncate">{fund.name}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-slate-500">{fund.amc}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${riskColors[fund.riskLevel]}`}>{fund.category}</span>
                          <StarRating rating={fund.rating} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-slate-900">₹{fund.nav.toFixed(2)}</p>
                        <p className="text-xs text-slate-400">NAV</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                      <div>
                        <p className="text-[10px] text-slate-400">1Y Return</p>
                        <p className={`text-sm font-bold ${fund.returns.oneYear >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>+{fund.returns.oneYear.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">3Y Return</p>
                        <p className={`text-sm font-bold ${fund.returns.threeYear >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>+{fund.returns.threeYear.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">5Y Return</p>
                        <p className={`text-sm font-bold ${fund.returns.fiveYear >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>+{fund.returns.fiveYear.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">AUM</p>
                        <p className="text-sm font-semibold text-slate-700">₹{(fund.aum/1000).toFixed(1)}k Cr</p>
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] text-slate-400">Expense</p>
                        <p className="text-sm font-semibold text-slate-700">{fund.expenseRatio}%</p>
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] text-slate-400">Risk</p>
                        <div className="flex justify-center"><Riskometer level={fund.riskLevel} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Investment Advice?</h2>
          <p className="text-blue-100 mb-6">Our advisors can help you build a portfolio.</p>
          <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">Contact Advisor</button>
        </div>
      </section>
    </div>
  );
}
