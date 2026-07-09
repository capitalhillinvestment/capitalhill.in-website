import { useState, useEffect, useCallback } from 'react';
import { Search, X, RefreshCw, AlertCircle, TrendingUp, Database } from 'lucide-react';
import { getLiveFunds, LiveAmfiFund } from '../../services/fundApi';

interface LiveFundSearchProps {
  onNavigate: (page: string) => void;
}

const PAGE_SIZE = 50;

export default function LiveFundSearch({ onNavigate }: LiveFundSearchProps) {
  const [query, setQuery] = useState('');
  const [funds, setFunds] = useState<LiveAmfiFund[]>([]);
  const [totalMatching, setTotalMatching] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState(false);

  const load = useCallback(async (q: string, off: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLiveFunds(q, PAGE_SIZE, off);
      setFunds(result.data);
      setTotalMatching(result.totalMatchingQuery);
      setTotalRecords(result.totalAmfiRecords);
      setStale(Boolean(result.stale));
      if (result.stale && result.error) setError(result.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load live fund data');
      setFunds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0);
      load(query, 0);
    }, 350); // debounce typing
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPage = (newOffset: number) => {
    setOffset(newOffset);
    load(query, newOffset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(totalMatching / PAGE_SIZE));

  return (
    <div className="pt-16 pb-20">
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 mb-5">
            <Database className="w-3.5 h-3.5" /> Live AMFI Data
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Live Mutual Fund<br /><span className="text-blue-400">NAV Search</span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Search across {totalRecords ? totalRecords.toLocaleString('en-IN') : '14,000+'} real mutual
            fund schemes, sourced directly and daily from AMFI's official NAV feed.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-400" /> Updated Daily
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> Real Scheme Names
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scheme name (e.g. HDFC Large Cap, Axis Bluechip)..."
              className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {stale && (
            <p className="mt-2 text-xs text-amber-600">
              Showing the last successfully synced data — AMFI's live feed is temporarily
              unreachable, so this may be slightly delayed.
            </p>
          )}
          {!loading && (
            <p className="mt-2 text-xs text-slate-500">
              {query ? `${totalMatching.toLocaleString('en-IN')} matching schemes` : `${totalRecords.toLocaleString('en-IN')} total schemes`}
            </p>
          )}
        </div>
      </section>

      <section className="py-8 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600 text-sm">Loading live fund data...</p>
              </div>
            </div>
          ) : error && funds.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Couldn't load live data</h3>
              <p className="text-sm text-slate-500 mb-4">{error}</p>
              <button onClick={() => load(query, offset)} className="text-blue-600 font-medium text-sm hover:underline">
                Try again
              </button>
            </div>
          ) : funds.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No schemes found</h3>
              <p className="text-sm text-slate-500 mb-4">Try a different search term.</p>
            </div>
          ) : (
            <>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Scheme Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Category</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">NAV (₹)</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">Date</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">1Y Return</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">AUM</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">Expense Ratio</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Risk</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((fund) => (
                      <tr key={fund.schemeCode} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-900 whitespace-nowrap">{fund.schemeName}</td>
                        <td className="px-4 py-3 text-slate-500">{fund.category ?? '—'}</td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          {fund.nav.toFixed(4)}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500">{fund.date}</td>
                        <td className="px-4 py-3 text-right text-slate-500">
                          {fund.returns?.oneYear !== undefined ? `${fund.returns.oneYear.toFixed(1)}%` : '—'}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500">
                          {fund.aum !== undefined ? `₹${(fund.aum / 1000).toFixed(1)}k Cr` : '—'}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500">
                          {fund.expenseRatio !== undefined ? `${fund.expenseRatio}%` : '—'}
                        </td>
                        <td className="px-4 py-3 text-slate-500">{fund.riskLevel ?? '—'}</td>
                        <td className="px-4 py-3 text-slate-500">
                          {fund.rating !== undefined ? '★'.repeat(fund.rating) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                NAV, scheme name, and date are live from AMFI. Category, returns, AUM, expense ratio,
                risk, and rating will populate here once that data source is connected — shown as "—" until then.
              </p>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm">
                  <button
                    onClick={() => goToPage(Math.max(0, offset - PAGE_SIZE))}
                    disabled={offset === 0}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
                  >
                    Previous
                  </button>
                  <span className="text-slate-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(offset + PAGE_SIZE)}
                    disabled={offset + PAGE_SIZE >= totalMatching}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest?</h2>
          <p className="text-blue-100 mb-8">Talk to our advisors to find the right fund for your goals.</p>
          <button onClick={() => nav('contact')} className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors">
            Invest Now
          </button>
        </div>
      </section>
    </div>
  );
}
