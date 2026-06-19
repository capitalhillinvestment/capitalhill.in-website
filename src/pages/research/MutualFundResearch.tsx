import { useState, useMemo } from 'react';
import {
  BarChart2, Search, Filter, X, Star, TrendingUp, ChevronDown,
  Check, FileText, Download, Printer, ShoppingCart, Info,
  RefreshCw, Layers, AlertCircle,
} from 'lucide-react';
import mutualFunds, { MutualFund, amcOptions, categoryOptions, riskColors, riskBarColors } from '../../data/mutualFunds';

declare global {
  interface Window {
    html2pdf: () => {
      set: (options: Record<string, unknown>) => { from: (el: HTMLElement) => { save: () => void } };
    };
  }
}

interface MutualFundResearchProps { onNavigate: (page: string) => void; }

function Riskometer({ level }: { level: string }) {
  const riskOrder = ['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High'];
  const idx = riskOrder.indexOf(level);
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {riskOrder.map((_, i) => (
          <div key={i} className={`w-1.5 h-3 rounded-sm ${i <= idx ? riskBarColors[level] : 'bg-slate-200'}`} />
        ))}
      </div>
      <span className="text-[10px] text-slate-500">{level}</span>
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

function FundCard({ fund, isComparing, onToggleCompare }: {
  fund: MutualFund;
  isComparing: boolean;
  onToggleCompare: () => void;
}) {
  return (
    <div className={`card p-5 relative transition-all duration-300 ${isComparing ? 'ring-2 ring-emerald-500 border-emerald-200' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 text-sm leading-tight mb-1 truncate">{fund.name}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">{fund.amc}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${riskColors[fund.riskLevel] || 'bg-slate-100 text-slate-600'}`}>
              {fund.category}
            </span>
          </div>
        </div>
        <StarRating rating={fund.rating} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-slate-400">NAV</p>
            <p className="text-lg font-bold text-slate-900">₹{fund.nav.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">{fund.navDate}</p>
            <p className="text-xs text-slate-500">AUM: ₹{(fund.aum / 1000).toFixed(1)}k Cr</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-2">
          {[
            { label: '1Y', val: fund.returns.oneYear },
            { label: '3Y', val: fund.returns.threeYear },
            { label: '5Y', val: fund.returns.fiveYear },
          ].map(r => (
            <div key={r.label} className="text-center">
              <p className="text-[10px] text-slate-400">{r.label}</p>
              <p className={`text-sm font-bold ${r.val >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {r.val > 0 ? '+' : ''}{r.val.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Riskometer level={fund.riskLevel} />
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Expense Ratio</p>
            <p className="text-sm font-semibold text-slate-700">{fund.expenseRatio}%</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <button
          onClick={onToggleCompare}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
            isComparing
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
          }`}
        >
          {isComparing ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
          {isComparing ? 'Added' : 'Compare'}
        </button>
        <p className="text-[10px] text-slate-400">Min SIP: ₹{fund.minInvestment}</p>
      </div>
    </div>
  );
}

function ComparisonDrawer({ count, onOpen, onClear }: { count: number; onOpen: () => void; onClear: () => void }) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-40 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">{count} fund{count > 1 ? 's' : ''} selected</p>
            <p className="text-xs text-slate-500">{count < 10 ? `${10 - count} more can be added` : 'Maximum reached'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onClear} className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1">
            <X className="w-4 h-4" /> Clear all
          </button>
          <button onClick={onOpen} className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
            Compare Funds <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonModal({ funds, onClose, onRemove }: {
  funds: MutualFund[];
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('comparison-table');
    if (element && window.html2pdf) {
      window.html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: 'mutual-fund-comparison.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: funds.length > 3 ? 'landscape' : 'portrait' },
        })
        .from(element)
        .save();
    }
    setIsExporting(false);
  };

  if (funds.length === 0) return null;

  const metrics: { label: string; key: string; format: (v: number | string) => React.ReactNode }[] = [
    { label: 'NAV', key: 'nav', format: (v) => `₹${Number(v).toFixed(2)}` },
    { label: 'NAV Date', key: 'navDate', format: (v) => String(v) },
    { label: 'AMC', key: 'amc', format: (v) => String(v) },
    { label: 'Category', key: 'category', format: (v) => String(v) },
    { label: '1Y Return', key: 'returns.oneYear', format: (v) => <span className={`font-bold ${Number(v) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{Number(v) > 0 ? '+' : ''}{Number(v).toFixed(2)}%</span> },
    { label: '3Y Return', key: 'returns.threeYear', format: (v) => <span className={`font-bold ${Number(v) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{Number(v) > 0 ? '+' : ''}{Number(v).toFixed(2)}%</span> },
    { label: '5Y Return', key: 'returns.fiveYear', format: (v) => <span className={`font-bold ${Number(v) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{Number(v) > 0 ? '+' : ''}{Number(v).toFixed(2)}%</span> },
    { label: 'AUM (₹ Cr)', key: 'aum', format: (v) => (Number(v) / 1000).toFixed(1) + 'k' },
    { label: 'Expense Ratio', key: 'expenseRatio', format: (v) => `${Number(v).toFixed(2)}%` },
    { label: 'Risk Level', key: 'riskLevel', format: (v) => <span className={`text-xs font-semibold px-2 py-0.5 rounded ${riskColors[String(v)] || ''}`}>{String(v)}</span> },
    { label: 'Benchmark', key: 'benchmark', format: (v) => String(v) },
    { label: 'Min SIP', key: 'minInvestment', format: (v) => `₹${Number(v).toLocaleString()}` },
    { label: 'Fund Manager', key: 'fundManager', format: (v) => String(v) },
    { label: 'Launch Date', key: 'launchDate', format: (v) => String(v) },
    { label: 'Rating', key: 'rating', format: (v) => <StarRating rating={Number(v)} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4 md:my-8" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-slate-100 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Fund Comparison</h2>
              <p className="text-xs text-slate-500">{funds.length} funds side-by-side</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors print:hidden">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleDownloadPDF} disabled={isExporting} className="flex items-center gap-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 print:hidden">
              <Download className="w-4 h-4" /> {isExporting ? 'Generating...' : 'Download PDF'}
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors print:hidden">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto" id="comparison-table">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-4 pr-4 sticky left-0 bg-white z-10">Metric</th>
                {funds.map(f => (
                  <th key={f.id} className="text-center pb-4 px-3 min-w-[150px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-slate-900 line-clamp-2">{f.name}</span>
                      <button onClick={() => onRemove(f.id)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 print:hidden">
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.map((metric, idx) => {
                const rowValues = funds.map(fund => {
                  const keys = metric.key.split('.');
                  let val: unknown = fund;
                  for (const k of keys) val = (val as Record<string, unknown>)?.[k];
                  return { fund, val: val as number | string };
                });

                const numValues = rowValues.map(rv => typeof rv.val === 'number' ? rv.val : parseFloat(String(rv.val)) || 0);
                let bestIdx = -1;
                if (metric.label.includes('Return') || metric.label === 'NAV' || metric.label === 'Rating') {
                  bestIdx = numValues.reduce((maxI, v, i) => v > numValues[maxI] ? i : maxI, 0);
                } else if (metric.label.includes('Expense') || metric.label === 'Min SIP') {
                  bestIdx = numValues.reduce((minI, v, i) => v < numValues[minI] ? i : minI, 0);
                }

                return (
                  <tr key={metric.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 pr-4 text-sm font-medium text-slate-700 sticky left-0 bg-inherit">{metric.label}</td>
                    {rowValues.map((rv, i) => (
                      <td key={rv.fund.id} className={`py-3 px-3 text-center ${i === bestIdx ? 'bg-emerald-50' : ''}`}>
                        <div className="text-sm text-slate-700">{metric.format(rv.val)}</div>
                        {i === bestIdx && bestIdx >= 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-1">
                            <TrendingUp className="w-3 h-3" /> Best
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4" />
              <span>NAV updated daily from AMFI. Past performance is not indicative of future results.</span>
            </div>
            <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-slate-900">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MutualFundResearch({ onNavigate }: MutualFundResearchProps) {
  const [search, setSearch] = useState('');
  const [selectedAMCs, setSelectedAMCs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFunds = useMemo(() => {
    return mutualFunds.filter(f => {
      const matchSearch = search === '' || f.name.toLowerCase().includes(search.toLowerCase()) || f.amc.toLowerCase().includes(search.toLowerCase());
      const matchAMC = selectedAMCs.length === 0 || selectedAMCs.includes(f.amc);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(f.category);
      return matchSearch && matchAMC && matchCategory;
    });
  }, [search, selectedAMCs, selectedCategories]);

  const toggleCompare = (fundId: string) => {
    if (compareList.includes(fundId)) {
      setCompareList(compareList.filter(id => id !== fundId));
    } else if (compareList.length < 10) {
      setCompareList([...compareList, fundId]);
    }
  };

  const clearComparison = () => setCompareList([]);
  const removeFund = (id: string) => setCompareList(compareList.filter(fid => fid !== id));

  const comparisonFunds = compareList.map(id => mutualFunds.find(f => f.id === id)).filter(Boolean) as MutualFund[];

  const toggleAMC = (amc: string) => setSelectedAMCs(prev => prev.includes(amc) ? prev.filter(a => a !== amc) : [...prev, amc]);
  const toggleCategory = (cat: string) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  return (
    <div className="pt-16 pb-20 print:pb-0">
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 mb-5">
            <BarChart2 className="w-3.5 h-3.5" /> Research Platform
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-5">Mutual Fund<br /><span className="text-blue-400">Research Explorer</span></h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Search across 50+ mutual funds. Filter by AMC and category. Compare up to 10 funds side-by-side and export as PDF.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-blue-400" /> Daily NAV Updates</div>
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" /> PDF Export</div>
            <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-blue-400" /> Compare up to 10</div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by fund name or AMC..." className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${showFilters || selectedAMCs.length > 0 || selectedCategories.length > 0 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              <Filter className="w-4 h-4" /> Filters {(selectedAMCs.length > 0 || selectedCategories.length > 0) && <span className="bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{selectedAMCs.length + selectedCategories.length}</span>}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-slide-down">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Asset Management Company (AMC)</h4>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">{amcOptions.map(amc => (<button key={amc} onClick={() => toggleAMC(amc)} className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${selectedAMCs.includes(amc) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}>{amc}</button>))}</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">{categoryOptions.map(cat => (<button key={cat} onClick={() => toggleCategory(cat)} className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${selectedCategories.includes(cat) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}>{cat}</button>))}</div>
                </div>
              </div>
              {(selectedAMCs.length > 0 || selectedCategories.length > 0) && <button onClick={() => { setSelectedAMCs([]); setSelectedCategories([]); }} className="mt-4 text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1"><X className="w-4 h-4" /> Clear all filters</button>}
            </div>
          )}

          <div className="mt-3 text-xs text-slate-500">
            Showing {filteredFunds.length} of {mutualFunds.length} funds
            {selectedAMCs.length > 0 && ` • AMC: ${selectedAMCs.join(', ')}`}
            {selectedCategories.length > 0 && ` • Category: ${selectedCategories.join(', ')}`}
          </div>
        </div>
      </section>

      <section className="py-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredFunds.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No funds found</h3>
              <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters.</p>
              <button onClick={() => { setSearch(''); setSelectedAMCs([]); setSelectedCategories([]); }} className="text-blue-600 font-medium text-sm hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{filteredFunds.map(fund => <FundCard key={fund.id} fund={fund} isComparing={compareList.includes(fund.id)} onToggleCompare={() => toggleCompare(fund.id)} />)}</div>
          )}
        </div>
      </section>

      <section className="py-16 bg-blue-600 print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ShoppingCart className="w-10 h-10 text-blue-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Found Your Perfect Fund?</h2>
          <p className="text-blue-100 mb-8">Our advisors will help you start your investment journey with the right mutual funds.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">Invest Now</button>
            <button onClick={() => nav('calculators')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">SIP Calculator</button>
          </div>
        </div>
      </section>

      <ComparisonDrawer count={compareList.length} onOpen={() => setShowComparison(true)} onClear={clearComparison} />
      {showComparison && <ComparisonModal funds={comparisonFunds} onClose={() => setShowComparison(false)} onRemove={(id) => { removeFund(id); if (compareList.length <= 1) setShowComparison(false); }} />}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" async />
    </div>
  );
}
