import { useState, useEffect, useRef } from 'react';
import { Menu, X, TrendingUp, ChevronDown } from 'lucide-react';
import logo from '../assets/log.png';

type Page = string;

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const products = [
  { label: 'Mutual Funds', page: 'mutual-funds' },
  { label: 'PMS', page: 'pms' },
  { label: 'AIF', page: 'aif' },
  { label: 'IPO', page: 'ipo' },
  { label: 'NFO', page: 'nfo' },
];

const research = [
  { label: 'Mutual Fund Research', page: 'research-mf' },
  { label: 'Fund Comparison', page: 'research-compare' },
  { label: 'Fund Screener', page: 'research-screener' },
  { label: 'Top Performing Funds', page: 'research-top' },
  { label: 'Market Insights', page: 'research-insights' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
    }, []);
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setProductsOpen(false);
      setResearchOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 const nav = (page: string) => {
  onNavigate(page);
  setMenuOpen(false);
  setProductsOpen(false);
  setResearchOpen(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => nav('home')} className="flex items-center gap-2.5 group">
          <img
  src={logo}
  alt="Capital Hill Investment"
  className="h-16 w-auto"
/>
        
            <div className="leading-none">
              <div className="text-slate-900 font-bold text-base tracking-tight">Capital Hill</div>
              <div className="text-emerald-600 text-[10px] font-semibold uppercase tracking-widest">Investment</div>
            </div>
          </button>

       <nav className="flex items-center gap-1">
         <div className="flex items-center gap-1">
  {[
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Why Invest?', page: 'why-invest' },
    { label: 'Investment Basics', page: 'investment-basics' },
   ,
  ].map(item => (
    <button
      key={item.page}
      onClick={() => nav(item.page)}
      className={`nav-link px-3 py-2 rounded-lg ${
        currentPage === item.page
          ? 'text-emerald-600 bg-emerald-50'
          : 'hover:bg-slate-50'
      }`}
    >
      {item.label}
    </button>
  ))}
</div>
  <div className="flex items-center gap-1" ref={dropdownRef}>
    
  {/* Products */}
  <div className="relative">
    <button onClick={() => {
  setProductsOpen(true);
  setResearchOpen(false);
}}
      className={`nav-link px-3 py-2 rounded-lg flex items-center gap-1 ${products.some(p => p.page === currentPage) ? 'text-emerald-600 bg-emerald-50' : 'hover:bg-slate-50'}`}>
      Products <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
    </button>

    {productsOpen && (
      <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
        {products.map(p => (
          <button key={p.page} onClick={() => nav(p.page)}
            className={`w-full text-left px-4 py-2.5 text-sm font-medium ${currentPage === p.page ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'}`}>
            {p.label}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* Research */}
  <div className="relative">
    <button
 onClick={() => {
  setResearchOpen(true);
  setProductsOpen(false);
}}
      className={`nav-link px-3 py-2 rounded-lg flex items-center gap-1 ${
        research.some(r => r.page === currentPage)
          ? 'text-blue-600 bg-blue-50'
          : 'hover:bg-slate-50'
      }`}
    >
      Research
      <ChevronDown className={`w-4 h-4 transition-transform ${researchOpen ? 'rotate-180' : ''}`} />
    </button>

    {researchOpen && (
      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
        {research.map(r => (
          <button key={r.page} onClick={() => nav(r.page)}
            className={`w-full text-left px-4 py-2.5 text-sm font-medium ${currentPage === r.page ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}>
            {r.label}
          </button>
        ))}
      </div>
    )}
  </div>

</div>

{/* Calculator OUTSIDE wrapper */}
<button
  onClick={() => nav('calculators')}
  className={`nav-link px-3 py-2 rounded-lg ${
    currentPage === 'calculators'
      ? 'text-emerald-600 bg-emerald-50'
      : 'hover:bg-slate-50'
  }`}
>
  Calculators
</button>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => nav('contact')} className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-2">Contact</button>
         <a
  href="https://clients.capitalhill.in"
  className="btn-primary w-full text-sm py-3 block text-center"
>
  Client Login
</a></div>

         <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
>
  {menuOpen ? <X /> : <Menu />}
</button>
        </div>
      </div>

 {menuOpen && (
  <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
    <div className="px-4 py-4 space-y-2">

      {/* Main Pages */}
      {[
        { label: 'Home', page: 'home' },
        { label: 'About Us', page: 'about' },
        { label: 'Why Invest?', page: 'why-invest' },
        { label: 'Investment Basics', page: 'investment-basics' },
        { label: 'Contact', page: 'contact' },
      ].map(item => (
        <button
          key={item.page}
          onClick={() => nav(item.page)}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-50"
        >
          {item.label}
        </button>
      ))}

      {/* Products */}
      <p className="px-4 pt-3 text-xs font-semibold text-slate-400 uppercase">
        Products
      </p>

      {products.map(p => (
        <button
          key={p.page}
          onClick={() => nav(p.page)}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-50"
        >
          {p.label}
        </button>
      ))}

      {/* Research */}
      <p className="px-4 pt-3 text-xs font-semibold text-blue-600 uppercase">
        Research
      </p>

      {research.map(r => (
        <button
          key={r.page}
          onClick={() => nav(r.page)}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-50"
        >
          {r.label}
        </button>
      ))}

      {/* Login */}
      <div className="pt-3">
        <button
          className="btn-primary w-full text-sm py-3"
          onClick={() => window.location.href = "https://clients.capitalhill.in"}
        >
          Client Login
        </button>
      </div>

    </div>
  </div>
)}
