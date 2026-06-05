import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

interface ContactProps { onNavigate: (page: string) => void; }

export default function Contact({ onNavigate: _onNavigate }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://formspree.io/f/xqeoeebe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }),
      }
    );

    if (response.ok) {
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } else {
      alert("Unable to send message. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
};

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">Contact Us</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Let's Start Your<br /><span className="text-emerald-400">Wealth Journey</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">Our expert advisors are ready to answer your questions and help you make the right investment decisions.</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div><h2 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2><p className="text-slate-500 text-sm">Thank you for contacting Capital Hill Investment. Our team will review your enquiry and contact you shortly.</p></div>
            {[
              { icon: Phone, title: 'Phone', lines: ['+91 9136125220'], sub: 'Mon–Sat 9AM to 6PM' },
              { icon: Mail, title: 'Email', lines: ['support@capitalhill.in'], sub: 'Thank you for contacting Capital Hill Investment. Our team will review your enquiry and contact you shortly.' },
              { icon: MapPin, title: 'Head Office', lines: ['B-114, Hill Road, Elco Market, Bandra West, Mumbai-400050'], sub: '' },
              { icon: Clock, title: 'Business Hours', lines: ['Monday – Saturday: 11:30 AM – 6:00 PM'], sub: 'Sunday: Closed' },
            ].map(item => (
              <div key={item.title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                  {item.lines.map(l => <p key={l} className="text-slate-600 text-sm">{l}</p>)}
                  {item.sub && <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
            <div className="card p-5">
              <p className="font-semibold text-slate-900 text-sm mb-3">Branch Offices</p>
              <div className="grid grid-cols-2 gap-2">
                {['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'].map(city => (
                  <div key={city} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /><span className="text-sm text-slate-600">{city}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-600" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-500 mb-6">Thank you for contacting Capital Hill Investment. Our team will review your enquiry and contact you shortly.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }} className="btn-outline">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Request a Free Consultation</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1.5">Full Name *</label>
                        <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1.5">Email Address *</label>
                        <input type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1.5">Phone Number *</label>
                        <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1.5">I'm Interested In</label>
                        <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                          <option value="">Select a service</option>
                          <option value="mutual-funds">Mutual Funds / SIP</option>
                          <option value="pms">Portfolio Management (PMS)</option>
                          <option value="aif">Alternative Investment Fund (AIF)</option>
                          <option value="ipo">IPO</option>
                          <option value="nfo">New Fund Offer (NFO)</option>
                          <option value="financial-planning">Financial Planning</option>
                          <option value="tax-planning">Tax Planning</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1.5">Message</label>
                      <textarea rows={5} placeholder="Tell us about your investment goals..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none" />
                    </div>
                    <p className="text-xs text-slate-400">By submitting this form, you agree to be contacted by Capital Hill Investment for investment advisory purposes.</p>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"><Send className="w-4 h-4" />Request Free Consultation</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="h-72 relative overflow-hidden">
        <img src="https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Office" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><MapPin className="w-6 h-6 text-emerald-600" /></div>
            <div><p className="font-bold text-slate-900">Capital Hill Investment</p><p className="text-slate-500 text-sm">101, Capital Tower, Connaught Place, New Delhi</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Manage Your Portfolio on the Go</h2>
          <p className="text-slate-400 mb-8">Download the Capital Hill Investment app. Track portfolio, place transactions, and connect with your advisor.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[{ store: 'App Store', sub: 'Download on the' }, { store: 'Google Play', sub: 'Get it on' }].map(btn => (
              <div key={btn.store} className="bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors flex items-center gap-3 cursor-pointer">
                <div className="text-left"><div className="text-xs text-slate-400">{btn.sub}</div><div className="font-bold">{btn.store}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
