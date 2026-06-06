import { TrendingUp, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import logo from '../assets/log.png';

interface FooterProps { onNavigate: (page: string) => void; }

export default function Footer({ onNavigate }: FooterProps) {
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <button onClick={() => nav('home')} className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
                <img
  src={log}
  alt="Capital Hill Investment"
  className="h-10 w-auto"
/>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-base">Capital Hill</div>
                <div className="text-emerald-400 text-[10px] font-semibold uppercase tracking-widest">Investment</div>
              </div>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">Your trusted partner for wealth creation. Investment Distribution & Financial Planning Services.</p>
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ label: 'Home', page: 'home' }, { label: 'About Us', page: 'about' }, { label: 'Why Invest?', page: 'why-invest' }, { label: 'Investment Basics', page: 'investment-basics' }, { label: 'Calculators', page: 'calculators' }, { label: 'Contact Us', page: 'contact' }].map(item => (
                <li key={item.page}><button onClick={() => nav(item.page)} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{item.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {[{ label: 'Mutual Funds', page: 'mutual-funds' }, { label: 'Portfolio Management (PMS)', page: 'pms' }, { label: 'Alternative Investments (AIF)', page: 'aif' }, { label: 'IPO', page: 'ipo' }, { label: 'New Fund Offers (NFO)', page: 'nfo' }].map(item => (
                <li key={item.page}><button onClick={() => nav(item.page)} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{item.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span className="text-sm text-slate-400">B-114, Elco Market, Hill Road, Bandra West, Mumbai-400050.</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /><a href="tel:+91 91361 25220" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">+91 91361 25220</a></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-400 shrink-0" /><a href="mailto:support@capitalhill.in" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">support@capitalhill.in</a></li>
            </ul>
            <a
  href="https://play.google.com/store/apps/details?id=com.capitalhillinvestmentapp.app&pcampaignid=web_share"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary text-sm py-2.5 px-4 w-full mt-5 inline-block text-center"
>
  Download App
</a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">&copy; {new Date().getFullYear()} Capital Hill Investment. All rights reserved. | ARN. No. 302794</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <button
  onClick={() => nav('privacy-policy')}
  className="hover:text-slate-300 transition-colors"
>
  Privacy Policy
</button>
              <span>|</span>
            <button
  onClick={() => nav('terms-of-use')}
  className="hover:text-slate-300 transition-colors"
>
  Terms of Use
</button>
              <span>|</span>
             <button
  onClick={() => nav('disclaimer')}
  className="hover:text-slate-300 transition-colors"
>
  Disclaimer
</button>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4 text-center">Investments in securities market are subject to market risk. Please read all related documents carefully before investing. Past performance is not indicative of future returns.</p>
        </div>
      </div>
    </footer>
  );
}
