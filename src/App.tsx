import WhatsAppButton from './components/WhatsAppButton';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import WhyInvest from './pages/WhyInvest';
import InvestmentBasics from './pages/InvestmentBasics';
import MutualFunds from './pages/MutualFunds';
import PMS from './pages/PMS';
import AIF from './pages/AIF';
import IPO from './pages/IPO';
import NFO from './pages/NFO';
import {
  MutualFundResearch,
  FundComparison,
  FundScreener,
  TopFunds,
  MarketInsights,
  LiveFundSearch,
} from './pages/research';
import Calculators from './pages/Calculators';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsOfUse from './pages/TermsOfUse';

type Page =
  | 'home'
  | 'about'
  | 'why-invest'
  | 'investment-basics'
  | 'mutual-funds'
  | 'pms'
  | 'aif'
  | 'ipo'
  | 'nfo'
  | 'research-mf'
  | 'research-compare'
  | 'research-screener'
  | 'research-top'
  | 'research-insights'
  | 'research-live'
  | 'calculators'
  | 'contact'
  | 'privacy-policy'
  | 'terms-of-use'
  | 'disclaimer';

const VALID_PAGES: Page[] = [
  'home', 'about', 'why-invest', 'investment-basics', 'mutual-funds',
  'pms', 'aif', 'ipo', 'nfo', 'research-mf', 'research-compare',
  'research-screener', 'research-top', 'research-insights', 'research-live',
  'calculators', 'contact', 'privacy-policy', 'terms-of-use', 'disclaimer',
];

function pageFromPath(pathname: string): Page {
  const slug = pathname.replace(/^\/+|\/+$/g, ''); // strip leading/trailing slashes
  if (!slug) return 'home';
  return VALID_PAGES.includes(slug as Page) ? (slug as Page) : 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    pageFromPath(window.location.pathname)
  );

  const navigate = (page: string) => {
    const target = VALID_PAGES.includes(page as Page) ? (page as Page) : 'home';
    const path = target === 'home' ? '/' : `/${target}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ page: target }, '', path);
    }
    setCurrentPage(target);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(pageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'why-invest': return <WhyInvest onNavigate={navigate} />;
      case 'investment-basics': return <InvestmentBasics onNavigate={navigate} />;
      case 'mutual-funds': return <MutualFunds onNavigate={navigate} />;
      case 'pms': return <PMS onNavigate={navigate} />;
      case 'aif': return <AIF onNavigate={navigate} />;
      case 'ipo': return <IPO onNavigate={navigate} />;
      case 'nfo': return <NFO onNavigate={navigate} />;
      case 'research-mf':
  return <MutualFundResearch onNavigate={navigate} />;
      case 'research-compare': return <FundComparison onNavigate={navigate} />;
      case 'research-screener': return <FundScreener onNavigate={navigate} />;
      case 'research-top': return <TopFunds onNavigate={navigate} />;
      case 'research-insights': return <MarketInsights onNavigate={navigate} />;
      case 'research-live': return <LiveFundSearch onNavigate={navigate} />;
      case 'calculators': return <Calculators onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} />;
        case 'privacy-policy':
  return <PrivacyPolicy />;

case 'terms-of-use':
  return <TermsOfUse />;

case 'disclaimer':
  return <Disclaimer />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <>
  <WhatsAppButton />
  <Footer onNavigate={navigate} />
</>
    </div>
  );
}

export default App;
