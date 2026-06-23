import { useState } from 'react';
import { BarChart2, Plus, X, Star, TrendingUp, Download, Printer, Info, Layers } from 'lucide-react';
import {
  MutualFund,
  amcOptions,
  categoryOptions,
  riskColors
} from '../../data/mutualFunds';

interface FundComparisonProps { onNavigate: (page: string) => void; }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  );
}

export default function FundComparison({ onNavigate }: FundComparisonProps) {
  const [selectedFunds, setSelectedFunds] = useState<MutualFund[]>([]);
  const [showFundPicker, setShowFundPicker] = useState(false);
  const [searchFund, setSearchFund] = useState('');
  const [filterAMC, setFilterAMC] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/funds")
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        setFunds(result.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);
  const [funds, setFunds] =
  useState<MutualFund[]>([]);

  const [loading, setLoading] =
  useState(true);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const availableFunds = funds.filter(f => {
    const notSelected = !selectedFunds.find(sf => sf.id === f.id);
    const matchSearch = searchFund === '' || f.name.toLowerCase().includes(searchFund.toLowerCase());
    const matchAMC = filterAMC === '' || f.amc === filterAMC;
    const matchCategory = filterCategory === '' || f.category === filterCategory;
    return notSelected && matchSearch && matchAMC && matchCategory;
  });

  const addFund = (fund: MutualFund) => {
    if (selectedFunds.length < 10) {
      setSelectedFunds([...selectedFunds, fund]);
      setSearchFund('');
    }
  };

  const removeFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(f => f.id !== fundId));
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    const element = document.getElementById('comparison-content');
    if (element && window.html2pdf) {
      window.html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: 'fund-comparison.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: selectedFunds.length > 3 ? 'landscape' : 'portrait' },
        })
        .from(element)
        .save();
    }
  };

  const metrics = [
    { label: 'NAV', key: 'nav', unit: '₹', format: (v: number) => v.toFixed(2), higherBetter: true },
    { label: '1-Year Return', key: 'returns.oneYear', unit: '%', format: (v: number) => v.toFixed(2), higherBetter: true },
    { label: '3-Year Return', key: 'returns.threeYear', unit: '%', format: (v: number) => v.toFixed(2), higherBetter: true },
    { label: '5-Year Return', key: 'returns.fiveYear', unit: '%', format: (v: number) => v.toFixed(2), higherBetter: true },
    { label: 'AUM', key: 'aum', unit: 'Cr', format: (v: number) => `₹${(v/1000).toFixed(1)}k`, higherBetter: true },
    { label: 'Expense Ratio', key: 'expenseRatio', unit: '%', format: (v: number) => v.toFixed(2), higherBetter: false },
    { label: 'Min SIP', key: 'minInvestment', unit: '₹', format: (v: number) => v.toLocaleString(), higherBetter: false },
    { label: 'Rating', key: 'rating', unit: '', format: (v: number) => v, higherBetter: true },
  ];

  const getBestFundIndex = (metric: typeof metrics[0]) => {
    if (selectedFunds.length < 2) return -1;
    const values = selectedFunds.map(f => {
      const keys = metric.key.split('.');
      let val: unknown = f;
      for (const k of keys) val = (val as Record<string, unknown>)?.[k];
      return typeof val === 'number' ? val : 0;
    });
    return metric.higherBetter
      ? values.reduce((maxI, v, i, arr) => v > arr[maxI] ? i : maxI, 0)
      : values.reduce((minI, v, i, arr) => v < arr[minI] ? i : minI, 0);
  };

  if (loading) {
  return (
    <div className="pt-24 text-center">
      Loading Funds...
    </div>
  );
}
  return (
    <div className="pt-16 min-h-screen bg-slate-50 print:bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-12 print:py-6 print:bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Research Platform</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white print:text-slate-900">Fund Comparison Tool</h1>
            </div>
          </div>
          <p className="text-slate-300 print:text-slate-600 text-sm max-w-2xl">
            Compare up to 10 mutual funds side-by-side. Add funds using the picker below, then analyze metrics side-by-side.
          </p>
        </div>
      </section>

      {/* Fund Picker */}
      <section className="bg-white border-b border-slate-200 py-4 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">Selected Funds ({selectedFunds.length}/10)</span>
            </div>
            {selectedFunds.length >= 2 && (
              <div className="flex items-center gap-2">
                <button onClick={handlePrint} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button onClick={handleDownloadPDF} className="flex items-center gap-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            )}
          </div>

          {selectedFunds.length < 10 && (
            <button onClick={() => setShowFundPicker(!showFundPicker)} className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <Plus className="w-5 h-5" /> Add Fund to Compare
            </button>
          )}

          {showFundPicker && (
            <div className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div className="grid md:grid-cols-4 gap-3 mb-4">
                <input type="text" value={searchFund} onChange={e => setSearchFund(e.target.value)} placeholder="Search fund..." className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                <select value={filterAMC} onChange={e => setFilterAMC(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                  <option value="">All AMCs</option>
                  {amcOptions.map(amc => <option key={amc} value={amc}>{amc}</option>)}
                </select>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                  <option value="">All Categories</option>
                  {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <button onClick={() => setShowFundPicker(false)} className="text-slate-600 hover:text-slate-900 text-sm font-medium">Close Picker</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {availableFunds.slice(0, 20).map(fund => (
                  <button key={fund.id} onClick={() => { addFund(fund); }} className="w-full text-left flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{fund.name}</p>
                      <p className="text-xs text-slate-500">{fund.amc} • {fund.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">₹{fund.nav.toFixed(2)}</p>
                      <p className="text-xs text-emerald-600">+{fund.returns.oneYear.toFixed(1)}% 1Y</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Fund Pills */}
          {selectedFunds.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedFunds.map(fund => (
                <div key={fund.id} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span className="truncate max-w-[200px]">{fund.name}</span>
                  <button onClick={() => removeFund(fund.id)} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-8 print:py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {selectedFunds.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <BarChart2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Funds Selected</h3>
              <p className="text-slate-500 text-sm mb-4">Add at least 2 funds to start comparing.</p>
              <button onClick={() => setShowFundPicker(true)} className="btn-primary">Add Funds</button>
            </div>
          ) : selectedFunds.length === 1 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 mb-4">Add at least one more fund to compare.</p>
              <button onClick={() => setShowFundPicker(true)} className="btn-primary">Add Another Fund</button>
            </div>
          ) : (
            <div id="comparison-content" className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Fund Headers */}
              <div className="grid border-b border-slate-200" style={{ gridTemplateColumns: `180px repeat(${selectedFunds.length}, 1fr)` }}>
                <div className="p-4 bg-slate-50 font-semibold text-slate-700 text-sm">Fund Name</div>
                {selectedFunds.map((fund, i) => (
                  <div key={fund.id} className={`p-4 ${i === 0 ? '' : 'border-l border-slate-200'}`}>
                    <p className="font-bold text-slate-900 text-sm">{fund.name}</p>
                    <p className="text-xs text-slate-500">{fund.amc}</p>
                    <div className="mt-2"><StarRating rating={fund.rating} /></div>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              {metrics.map((metric, idx) => {
                const bestIdx = getBestFundIndex(metric);
                return (
                  <div key={metric.key} className={`grid ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`} style={{ gridTemplateColumns: `180px repeat(${selectedFunds.length}, 1fr)` }}>
                    <div className="p-4 font-medium text-slate-700 text-sm">{metric.label}</div>
                    {selectedFunds.map((fund, i) => {
                      const keys = metric.key.split('.');
                      let val: unknown = fund;
                      for (const k of keys) val = (val as Record<string, unknown>)?.[k];
                      const numVal = typeof val === 'number' ? val : 0;
                      return (
                        <div key={fund.id} className={`p-4 ${i === 0 ? '' : 'border-l border-slate-200'} ${i === bestIdx ? 'bg-emerald-50' : ''}`}>
                          <p className={`text-lg font-bold ${metric.key.includes('Return') ? (numVal >= 0 ? 'text-emerald-600' : 'text-red-500') : 'text-slate-900'}`}>
                            {metric.key === 'rating' ? <StarRating rating={numVal} /> : `${metric.unit === '₹' ? '₹' : ''}${metric.format(numVal)}${metric.unit && metric.unit !== '₹' ? ` ${metric.unit}` : ''}`}
                          </p>
                          {i === bestIdx && <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold"><TrendingUp className="w-3 h-3" /> Best</span>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Risk Level */}
              <div className="grid border-t border-slate-200" style={{ gridTemplateColumns: `180px repeat(${selectedFunds.length}, 1fr)` }}>
                <div className="p-4 font-medium text-slate-700 text-sm bg-slate-50">Risk Level</div>
                {selectedFunds.map((fund, i) => (
                  <div key={fund.id} className={`p-4 ${i === 0 ? '' : 'border-l border-slate-200'}`}>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskColors[fund.riskLevel]}`}>{fund.riskLevel}</span>
                  </div>
                ))}
              </div>

              {/* Category & Benchmark */}
              <div className="grid bg-slate-50" style={{ gridTemplateColumns: `180px repeat(${selectedFunds.length}, 1fr)` }}>
                <div className="p-4 font-medium text-slate-700 text-sm">Category</div>
                {selectedFunds.map((fund, i) => (
                  <div key={fund.id} className={`p-4 text-sm text-slate-600 ${i === 0 ? '' : 'border-l border-slate-200'}`}>{fund.category}</div>
                ))}
              </div>
              <div className="grid" style={{ gridTemplateColumns: `180px repeat(${selectedFunds.length}, 1fr)` }}>
                <div className="p-4 font-medium text-slate-700 text-sm bg-slate-50">Benchmark</div>
                {selectedFunds.map((fund, i) => (
                  <div key={fund.id} className={`p-4 text-sm text-slate-600 ${i === 0 ? '' : 'border-l border-slate-200'}`}>{fund.benchmark}</div>
                ))}
              </div>
            </div>
          )}

          {selectedFunds.length >= 2 && (
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4" />
              <span>Best values are highlighted. NAV updated daily from AMFI.</span>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600 print:hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help Choosing?</h2>
          <p className="text-blue-100 mb-6">Our advisors can help you pick the right funds for your goals.</p>
          <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">Contact Advisor</button>
        </div>
      </section>
    </div>
  );
}

declare global {
  interface Window {
    html2pdf: () => {
      set: (options: Record<string, unknown>) => { from: (el: HTMLElement) => { save: () => void } };
    };
  }
}
