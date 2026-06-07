import { useState } from 'react';
import {
  Calculator, TrendingUp, BarChart2, RefreshCw, Home, GraduationCap, Heart,
  DollarSign, Receipt, ArrowUpRight, X, ChevronRight,
} from 'lucide-react';

interface CalculatorsProps { onNavigate: (page: string) => void; }

function fmt(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

function SliderField({ label, value, display, min, max, step, minLabel, maxLabel, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number;
  minLabel: string; maxLabel: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-emerald-600 font-bold text-sm">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600" />
      <div className="flex justify-between text-xs text-slate-400 mt-1"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  );
}

function ResultBar({ invested, gains }: { invested: number; gains: number }) {
  const total = invested + gains;
  const investPct = total > 0 ? Math.round((invested / total) * 100) : 50;
  const gainPct = 100 - investPct;
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center"><p className="text-xs text-slate-500 mb-1">Invested</p><p className="font-bold text-slate-900 text-lg">{fmt(invested)}</p></div>
        <div className="text-center"><p className="text-xs text-slate-500 mb-1">Est. Returns</p><p className="font-bold text-emerald-600 text-lg">{fmt(gains)}</p></div>
        <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Value</p><p className="font-bold text-slate-900 text-xl">{fmt(total)}</p></div>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden">
        <div className="bg-slate-300" style={{ width: `${investPct}%` }} />
        <div className="bg-emerald-500 flex-1" />
      </div>
      <div className="flex justify-between text-xs mt-1.5">
        <span className="text-slate-500">Invested ({investPct}%)</span>
        <span className="text-emerald-600">Returns ({gainPct}%)</span>
      </div>
    </div>
  );
}

function ResultCard({ items }: { items: { label: string; value: string; sub?: string; color?: string }[] }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
      <div className="grid grid-cols-2 gap-5">
        {items.map(i => (
          <div key={i.label} className="text-center">
            <p className="text-xs text-slate-500 mb-1">{i.label}</p>
            <p className={`font-bold text-lg ${i.color || 'text-slate-900'}`}>{i.value}</p>
            {i.sub && <p className="text-xs text-slate-400 mt-0.5">{i.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Calculator Components ---

function SIPCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const months = years * 12;
  const r = rate / 12 / 100;
  const fv = r > 0 ? monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : monthly * months;
  const invested = monthly * months;
  return (
    <div className="space-y-6">
      <SliderField label="Monthly Investment" value={monthly} display={`₹${monthly.toLocaleString('en-IN')}`}
        min={500} max={200000} step={500} minLabel="₹500" maxLabel="₹2,00,000" onChange={setMonthly} />
      <SliderField label="Investment Period" value={years} display={`${years} years`}
        min={1} max={40} step={1} minLabel="1 yr" maxLabel="40 yrs" onChange={setYears} />
      <SliderField label="Expected Annual Return" value={rate} display={`${rate}%`}
        min={4} max={30} step={0.5} minLabel="4%" maxLabel="30%" onChange={setRate} />
      <ResultBar invested={invested} gains={fv - invested} />
    </div>
  );
}

function LumpsumCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const fv = principal * Math.pow(1 + rate / 100, years);
  return (
    <div className="space-y-6">
      <SliderField label="Investment Amount" value={principal} display={`₹${principal.toLocaleString('en-IN')}`}
        min={10000} max={10000000} step={10000} minLabel="₹10,000" maxLabel="₹1 Cr" onChange={setPrincipal} />
      <SliderField label="Investment Period" value={years} display={`${years} years`}
        min={1} max={40} step={1} minLabel="1 yr" maxLabel="40 yrs" onChange={setYears} />
      <SliderField label="Expected Annual Return" value={rate} display={`${rate}%`}
        min={4} max={30} step={0.5} minLabel="4%" maxLabel="30%" onChange={setRate} />
      <ResultBar invested={principal} gains={fv - principal} />
    </div>
  );
}

function StepUpSIPCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [stepUp, setStepUp] = useState(10);
  const months = years * 12;
  const r = rate / 12 / 100;
  let totalInvested = 0;
  let fv = 0;
  let currentMonthly = monthly;
  for (let yr = 0; yr < years; yr++) {
    const monthsLeft = months - yr * 12;
    const futureValueOfThisYear = currentMonthly * (r > 0 ? ((Math.pow(1 + r, 12) - 1) / r) * (1 + r) : 12) * Math.pow(1 + r, monthsLeft - 12);
    fv += futureValueOfThisYear;
    totalInvested += currentMonthly * 12;
    currentMonthly = currentMonthly * (1 + stepUp / 100);
  }
  // Regular SIP for comparison
  const regFv = r > 0 ? monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : monthly * months;
  const regInvested = monthly * months;
  return (
    <div className="space-y-6">
      <SliderField label="Initial Monthly SIP" value={monthly} display={`₹${monthly.toLocaleString('en-IN')}`}
        min={500} max={200000} step={500} minLabel="₹500" maxLabel="₹2,00,000" onChange={setMonthly} />
      <SliderField label="Investment Period" value={years} display={`${years} years`}
        min={1} max={40} step={1} minLabel="1 yr" maxLabel="40 yrs" onChange={setYears} />
      <SliderField label="Expected Annual Return" value={rate} display={`${rate}%`}
        min={4} max={30} step={0.5} minLabel="4%" maxLabel="30%" onChange={setRate} />
      <SliderField label="Annual Step-Up" value={stepUp} display={`${stepUp}%`}
        min={0} max={50} step={1} minLabel="0%" maxLabel="50%" onChange={setStepUp} />
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Step-Up SIP Value</p>
            <p className="font-bold text-slate-900 text-xl">{fmt(fv)}</p>
            <p className="text-xs text-slate-400">Invested: {fmt(totalInvested)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Regular SIP Value</p>
            <p className="font-bold text-slate-500 text-xl">{fmt(regFv)}</p>
            <p className="text-xs text-slate-400">Invested: {fmt(regInvested)}</p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-500">Extra wealth from step-up</p>
          <p className="font-bold text-emerald-600 text-lg">{fmt(fv - regFv)}</p>
        </div>
      </div>
    </div>
  );
}

function EMICalc() {
  const [principal, setPrincipal] = useState(500000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const r = rate / 12 / 100;
  const months = years * 12;
  const emi = r > 0 ? principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : principal / months;
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return (
    <div className="space-y-6">
      <SliderField label="Loan Amount" value={principal} display={`₹${principal.toLocaleString('en-IN')}`}
        min={50000} max={10000000} step={50000} minLabel="₹50,000" maxLabel="₹1 Cr" onChange={setPrincipal} />
      <SliderField label="Loan Tenure" value={years} display={`${years} years`}
        min={1} max={30} step={1} minLabel="1 yr" maxLabel="30 yrs" onChange={setYears} />
      <SliderField label="Interest Rate" value={rate} display={`${rate}%`}
        min={5} max={24} step={0.25} minLabel="5%" maxLabel="24%" onChange={setRate} />
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
        <div className="text-center mb-5">
          <p className="text-xs text-slate-500 mb-1">Monthly EMI</p>
          <p className="font-bold text-slate-900 text-3xl">₹{Math.round(emi).toLocaleString('en-IN')}</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Principal</p><p className="font-bold text-slate-900 text-lg">{fmt(principal)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Interest</p><p className="font-bold text-emerald-600 text-lg">{fmt(totalInterest)}</p></div>
        </div>
        <div className="mt-4">
          <div className="flex h-3 rounded-full overflow-hidden">
            <div className="bg-slate-400" style={{ width: `${(principal / totalPayment) * 100}%` }} />
            <div className="bg-emerald-500 flex-1" />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-slate-500">Principal ({Math.round((principal / totalPayment) * 100)}%)</span>
            <span className="text-emerald-600">Interest ({Math.round((totalInterest / totalPayment) * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeLoanCalc() {
  const [homeValue, setHomeValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8.5);
  const loan = homeValue - downPayment;
  const r = rate / 12 / 100;
  const months = years * 12;
  const emi = r > 0 && loan > 0 ? loan * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : 0;
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loan;
  return (
    <div className="space-y-6">
      <SliderField label="Home Value" value={homeValue} display={`₹${homeValue.toLocaleString('en-IN')}`}
        min={1000000} max={50000000} step={100000} minLabel="₹10 L" maxLabel="₹5 Cr" onChange={setHomeValue} />
      <SliderField label="Down Payment" value={downPayment} display={`₹${downPayment.toLocaleString('en-IN')}`}
        min={0} max={homeValue - 100000} step={100000} minLabel="₹0" maxLabel={`₹${((homeValue - 100000) / 100000).toFixed(0)} L`} onChange={setDownPayment} />
      <SliderField label="Loan Tenure" value={years} display={`${years} years`}
        min={5} max={30} step={1} minLabel="5 yrs" maxLabel="30 yrs" onChange={setYears} />
      <SliderField label="Interest Rate" value={rate} display={`${rate}%`}
        min={6} max={14} step={0.25} minLabel="6%" maxLabel="14%" onChange={setRate} />
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-5 border border-blue-100">
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Loan Amount</p><p className="font-bold text-slate-900 text-xl">{fmt(loan)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Monthly EMI</p><p className="font-bold text-blue-600 text-xl">₹{Math.round(emi).toLocaleString('en-IN')}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Interest</p><p className="font-bold text-blue-600 text-lg">{fmt(totalInterest)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Total Payment</p><p className="font-bold text-slate-900 text-lg">{fmt(totalPayment)}</p></div>
        </div>
      </div>
    </div>
  );
}

function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);
  const years = retireAge - currentAge;
  const futureMonthly = monthlyExp * Math.pow(1 + inflation / 100, years);
  const annualExpAtRetire = futureMonthly * 12;
  // Corpus needed: 25x annual expense (4% rule) adjusted for inflation during retirement
  const postRetireYears = 25;
  const postRetireRealReturn = (returnRate - inflation) / 100;
  const corpusNeeded = postRetireRealReturn > 0
    ? annualExpAtRetire * (1 - Math.pow(1 + postRetireRealReturn, -postRetireYears)) / postRetireRealReturn
    : annualExpAtRetire * postRetireYears;
  const r = returnRate / 12 / 100;
  const months = years * 12;
  const monthlySIP = r > 0 && months > 0
    ? corpusNeeded * r / (Math.pow(1 + r, months) - 1)
    : corpusNeeded / months;
  return (
    <div className="space-y-6">
      <SliderField label="Current Age" value={currentAge} display={`${currentAge} years`}
        min={20} max={55} step={1} minLabel="20" maxLabel="55" onChange={setCurrentAge} />
      <SliderField label="Retirement Age" value={retireAge} display={`${retireAge} years`}
        min={currentAge + 5} max={70} step={1} minLabel={`${currentAge + 5}`} maxLabel="70" onChange={setRetireAge} />
      <SliderField label="Current Monthly Expenses" value={monthlyExp} display={`₹${monthlyExp.toLocaleString('en-IN')}`}
        min={10000} max={300000} step={5000} minLabel="₹10,000" maxLabel="₹3,00,000" onChange={setMonthlyExp} />
      <SliderField label="Expected Inflation" value={inflation} display={`${inflation}%`}
        min={2} max={12} step={0.5} minLabel="2%" maxLabel="12%" onChange={setInflation} />
      <SliderField label="Expected Return" value={returnRate} display={`${returnRate}%`}
        min={6} max={18} step={0.5} minLabel="6%" maxLabel="18%" onChange={setReturnRate} />
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
        <div className="text-center mb-4">
          <p className="text-xs text-slate-500 mb-1">Monthly SIP Required</p>
          <p className="font-bold text-slate-900 text-3xl">₹{Math.round(monthlySIP).toLocaleString('en-IN')}</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Corpus Needed</p><p className="font-bold text-amber-700 text-lg">{fmt(corpusNeeded)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Future Monthly Expense</p><p className="font-bold text-slate-900 text-lg">₹{Math.round(futureMonthly).toLocaleString('en-IN')}</p></div>
        </div>
        <div className="mt-3 text-center"><p className="text-xs text-slate-400">Assumes {postRetireYears} years post-retirement at {(returnRate - inflation).toFixed(1)}% real return</p></div>
      </div>
    </div>
  );
}

function EducationGoalCalc() {
  const [currentCost, setCurrentCost] = useState(2000000);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(8);
  const [returnRate, setReturnRate] = useState(12);
  const futureCost = currentCost * Math.pow(1 + inflation / 100, years);
  const r = returnRate / 12 / 100;
  const months = years * 12;
  const monthlySIP = r > 0 && months > 0
    ? futureCost * r / (Math.pow(1 + r, months) - 1)
    : futureCost / months;
  const lumpsumNeeded = r > 0 ? futureCost / Math.pow(1 + returnRate / 100, years) : futureCost;
  return (
    <div className="space-y-6">
      <SliderField label="Current Education Cost" value={currentCost} display={`₹${currentCost.toLocaleString('en-IN')}`}
        min={100000} max={10000000} step={100000} minLabel="₹1 L" maxLabel="₹1 Cr" onChange={setCurrentCost} />
      <SliderField label="Years to Goal" value={years} display={`${years} years`}
        min={1} max={30} step={1} minLabel="1 yr" maxLabel="30 yrs" onChange={setYears} />
      <SliderField label="Education Inflation" value={inflation} display={`${inflation}%`}
        min={4} max={15} step={0.5} minLabel="4%" maxLabel="15%" onChange={setInflation} />
      <SliderField label="Expected Return" value={returnRate} display={`${returnRate}%`}
        min={6} max={18} step={0.5} minLabel="6%" maxLabel="18%" onChange={setReturnRate} />
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-100">
        <div className="text-center mb-4">
          <p className="text-xs text-slate-500 mb-1">Monthly SIP Required</p>
          <p className="font-bold text-slate-900 text-3xl">₹{Math.round(monthlySIP).toLocaleString('en-IN')}</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Future Cost</p><p className="font-bold text-sky-600 text-lg">{fmt(futureCost)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Lumpsum Today</p><p className="font-bold text-slate-900 text-lg">{fmt(lumpsumNeeded)}</p></div>
        </div>
      </div>
    </div>
  );
}

function MarriageGoalCalc() {
  const [currentCost, setCurrentCost] = useState(1000000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(7);
  const [returnRate, setReturnRate] = useState(12);
  const futureCost = currentCost * Math.pow(1 + inflation / 100, years);
  const r = returnRate / 12 / 100;
  const months = years * 12;
  const monthlySIP = r > 0 && months > 0
    ? futureCost * r / (Math.pow(1 + r, months) - 1)
    : futureCost / months;
  const lumpsumNeeded = r > 0 ? futureCost / Math.pow(1 + returnRate / 100, years) : futureCost;
  return (
    <div className="space-y-6">
      <SliderField label="Current Marriage Budget" value={currentCost} display={`₹${currentCost.toLocaleString('en-IN')}`}
        min={200000} max={5000000} step={50000} minLabel="₹2 L" maxLabel="₹50 L" onChange={setCurrentCost} />
      <SliderField label="Years to Goal" value={years} display={`${years} years`}
        min={1} max={25} step={1} minLabel="1 yr" maxLabel="25 yrs" onChange={setYears} />
      <SliderField label="Inflation Rate" value={inflation} display={`${inflation}%`}
        min={3} max={12} step={0.5} minLabel="3%" maxLabel="12%" onChange={setInflation} />
      <SliderField label="Expected Return" value={returnRate} display={`${returnRate}%`}
        min={6} max={18} step={0.5} minLabel="6%" maxLabel="18%" onChange={setReturnRate} />
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
        <div className="text-center mb-4">
          <p className="text-xs text-slate-500 mb-1">Monthly SIP Required</p>
          <p className="font-bold text-slate-900 text-3xl">₹{Math.round(monthlySIP).toLocaleString('en-IN')}</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Future Cost</p><p className="font-bold text-rose-600 text-lg">{fmt(futureCost)}</p></div>
          <div className="text-center"><p className="text-xs text-slate-500 mb-1">Lumpsum Today</p><p className="font-bold text-slate-900 text-lg">{fmt(lumpsumNeeded)}</p></div>
        </div>
      </div>
    </div>
  );
}

function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [compFreq, setCompFreq] = useState(12);
  const n = compFreq;
  const t = years;
  const r = rate / 100;
  const amount = principal * Math.pow(1 + r / n, n * t);
  const interest = amount - principal;
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
  return (
    <div className="space-y-6">
      <SliderField label="Principal Amount" value={principal} display={`₹${principal.toLocaleString('en-IN')}`}
        min={1000} max={10000000} step={1000} minLabel="₹1,000" maxLabel="₹1 Cr" onChange={setPrincipal} />
      <SliderField label="Annual Interest Rate" value={rate} display={`${rate}%`}
        min={1} max={30} step={0.5} minLabel="1%" maxLabel="30%" onChange={setRate} />
      <SliderField label="Time Period" value={years} display={`${years} years`}
        min={1} max={40} step={1} minLabel="1 yr" maxLabel="40 yrs" onChange={setYears} />
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Compounding Frequency</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Monthly', value: 12 },
            { label: 'Quarterly', value: 4 },
            { label: 'Half-Yearly', value: 2 },
            { label: 'Yearly', value: 1 },
          ].map(f => (
            <button key={f.value} onClick={() => setCompFreq(f.value)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all ${compFreq === f.value ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <ResultCard items={[
        { label: 'Total Amount', value: fmt(amount), color: 'text-slate-900' },
        { label: 'Interest Earned', value: fmt(interest), color: 'text-emerald-600' },
        { label: 'Effective Annual Rate', value: `${effectiveRate.toFixed(2)}%`, color: 'text-blue-600' },
        { label: 'Multiplication Factor', value: `${(amount / principal).toFixed(2)}x`, color: 'text-slate-900' },
      ]} />
    </div>
  );
}

function IncomeTaxCalc() {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [deductions, setDeductions] = useState(150000);

  // New Regime FY 2024-25 slabs
  function calcNewRegimeTax(taxable: number): number {
    let tax = 0;
    const slabs: [number, number][] = [
      [300000, 0], [600000, 0.05], [900000, 0.10], [1200000, 0.15],
      [1500000, 0.20], [Infinity, 0.30],
    ];
    let prev = 0;
    for (const [limit, rate] of slabs) {
      if (taxable <= prev) break;
      const slabIncome = Math.min(taxable, limit) - prev;
      tax += slabIncome * rate;
      prev = limit;
    }
    // Rebate u/s 87A: if taxable <= 7L, tax = 0
    if (taxable <= 700000) tax = 0;
    // Surcharge
    if (taxable > 50000000) tax *= 1.25;
    else if (taxable > 20000000) tax *= 1.25;
    else if (taxable > 10000000) tax *= 1.15;
    else if (taxable > 5000000) tax *= 1.10;
    // Cess 4%
    tax *= 1.04;
    return tax;
  }

  // Old Regime FY 2024-25 slabs
  function calcOldRegimeTax(taxable: number): number {
    let tax = 0;
    const slabs: [number, number][] = [
      [250000, 0], [500000, 0.05], [1000000, 0.20], [Infinity, 0.30],
    ];
    let prev = 0;
    for (const [limit, rate] of slabs) {
      if (taxable <= prev) break;
      const slabIncome = Math.min(taxable, limit) - prev;
      tax += slabIncome * rate;
      prev = limit;
    }
    // Rebate u/s 87A: if taxable <= 5L, tax = 0
    if (taxable <= 500000) tax = 0;
    // Surcharge
    if (taxable > 50000000) tax *= 1.37;
    else if (taxable > 20000000) tax *= 1.25;
    else if (taxable > 10000000) tax *= 1.15;
    else if (taxable > 5000000) tax *= 1.10;
    // Cess 4%
    tax *= 1.04;
    return tax;
  }

  const taxableOld = Math.max(0, income - Math.min(deductions, 200000) - 50000);
  const taxableNew = Math.max(0, income - 50000);
  const newTax = calcNewRegimeTax(taxableNew);
  const oldTax = calcOldRegimeTax(taxableOld);
  const effectiveRate = regime === 'new'
    ? (newTax / income * 100)
    : (oldTax / income * 100);
  const currentTax = regime === 'new' ? newTax : oldTax;
  const betterRegime = newTax <= oldTax ? 'new' : 'old';
  const savings = Math.abs(newTax - oldTax);

  return (
    <div className="space-y-6">
      <SliderField label="Annual Income (Gross)" value={income} display={`₹${income.toLocaleString('en-IN')}`}
        min={300000} max={10000000} step={50000} minLabel="₹3 L" maxLabel="₹1 Cr" onChange={setIncome} />
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Tax Regime</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setRegime('new')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${regime === 'new' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            New Regime
          </button>
          <button onClick={() => setRegime('old')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${regime === 'old' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            Old Regime
          </button>
        </div>
      </div>
      {regime === 'old' && (
        <SliderField label="Total Deductions (80C + HRA + etc.)" value={deductions} display={`₹${deductions.toLocaleString('en-IN')}`}
          min={0} max={500000} step={10000} minLabel="₹0" maxLabel="₹5 L" onChange={setDeductions} />
      )}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
        <div className="text-center mb-4">
          <p className="text-xs text-slate-500 mb-1">Tax Liability ({regime === 'new' ? 'New' : 'Old'} Regime)</p>
          <p className="font-bold text-slate-900 text-3xl">{fmt(currentTax)}</p>
          <p className="text-xs text-slate-400 mt-1">Effective rate: {effectiveRate.toFixed(1)}%</p>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div className="text-center bg-white rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-1">New Regime Tax</p>
            <p className="font-bold text-emerald-600 text-lg">{fmt(newTax)}</p>
          </div>
          <div className="text-center bg-white rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-1">Old Regime Tax</p>
            <p className="font-bold text-blue-600 text-lg">{fmt(oldTax)}</p>
          </div>
        </div>
        <div className={`text-center rounded-xl p-3 ${betterRegime === 'new' ? 'bg-emerald-50 border border-emerald-100' : 'bg-blue-50 border border-blue-100'}`}>
          <p className="text-xs text-slate-500">Better regime: <span className="font-bold">{betterRegime === 'new' ? 'New' : 'Old'} Regime</span></p>
          <p className="text-sm font-bold text-emerald-600">You save {fmt(savings)} more</p>
        </div>
      </div>
    </div>
  );
}

// --- Calculator Config ---

type CalcId = 'sip' | 'lumpsum' | 'stepup-sip' | 'emi' | 'home-loan' | 'retirement' | 'education' | 'marriage' | 'compound' | 'income-tax';

const calcCards: { id: CalcId; title: string; desc: string; icon: typeof Calculator; gradient: string; iconColor: string }[] = [
  { id: 'sip', title: 'SIP Calculator', desc: 'Calculate wealth from systematic monthly investments', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-600' },
  { id: 'lumpsum', title: 'Lumpsum Calculator', desc: 'Estimate growth from one-time investment', icon: BarChart2, gradient: 'from-blue-500 to-indigo-600', iconColor: 'text-blue-600' },
  { id: 'stepup-sip', title: 'Step-Up SIP', desc: 'Plan with annual SIP increment strategy', icon: ArrowUpRight, gradient: 'from-teal-500 to-cyan-600', iconColor: 'text-teal-600' },
  { id: 'emi', title: 'EMI Calculator', desc: 'Compute monthly installments for any loan', icon: Receipt, gradient: 'from-amber-500 to-orange-600', iconColor: 'text-amber-600' },
  { id: 'home-loan', title: 'Home Loan Calculator', desc: 'Plan EMI & down payment for your dream home', icon: Home, gradient: 'from-sky-500 to-blue-600', iconColor: 'text-sky-600' },
  { id: 'retirement', title: 'Retirement Calculator', desc: 'Find the corpus and SIP needed for retirement', icon: DollarSign, gradient: 'from-amber-600 to-yellow-600', iconColor: 'text-amber-600' },
  { id: 'education', title: 'Education Goal', desc: "Plan your child's education fund with SIP", icon: GraduationCap, gradient: 'from-sky-500 to-indigo-600', iconColor: 'text-sky-600' },
  { id: 'marriage', title: 'Marriage Goal', desc: 'Save for the big day with goal-based SIP', icon: Heart, gradient: 'from-rose-500 to-pink-600', iconColor: 'text-rose-600' },
  { id: 'compound', title: 'Compound Interest', desc: 'See the power of compounding over time', icon: RefreshCw, gradient: 'from-emerald-600 to-green-600', iconColor: 'text-emerald-600' },
  { id: 'income-tax', title: 'Income Tax Calculator', desc: 'Compare old vs new tax regime instantly', icon: Receipt, gradient: 'from-slate-600 to-slate-700', iconColor: 'text-slate-600' },
];

function getCalcComponent(id: CalcId) {
  switch (id) {
    case 'sip': return <SIPCalc />;
    case 'lumpsum': return <LumpsumCalc />;
    case 'stepup-sip': return <StepUpSIPCalc />;
    case 'emi': return <EMICalc />;
    case 'home-loan': return <HomeLoanCalc />;
    case 'retirement': return <RetirementCalc />;
    case 'education': return <EducationGoalCalc />;
    case 'marriage': return <MarriageGoalCalc />;
    case 'compound': return <CompoundInterestCalc />;
    case 'income-tax': return <IncomeTaxCalc />;
  }
}

// --- Modal ---

function CalcModal({ id, onClose }: { id: CalcId; onClose: () => void }) {
  const card = calcCards.find(c => c.id === id)!;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{card.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="p-5 md:p-6">
          {getCalcComponent(id)}
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function Calculators({ onNavigate }: CalculatorsProps) {
  const [activeCalc, setActiveCalc] = useState<CalcId | null>(null);
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="badge mx-auto mb-5">Calculators</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Plan Your Investments<br /><span className="text-emerald-400">with Precision</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">10 powerful calculators to estimate returns, plan goals, compare tax regimes, and make smarter financial decisions.</p>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {calcCards.map(card => (
              <button key={card.id} onClick={() => setActiveCalc(card.id)}
                className="card p-6 text-left group hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Calculate <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">Quick Start</div>
            <h2 className="section-title mb-4">Most Popular Calculators</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'sip' as CalcId, emoji: '📈', title: 'SIP Returns', desc: 'See how small monthly investments grow into significant wealth over time with compounding.' },
              { id: 'retirement' as CalcId, emoji: '🏖️', title: 'Retirement Planning', desc: 'Calculate exactly how much you need to save monthly for a comfortable retirement.' },
              { id: 'income-tax' as CalcId, emoji: '🧾', title: 'Tax Comparison', desc: 'Compare old vs new tax regime and find out which one saves you more money.' },
            ].map(p => (
              <button key={p.id} onClick={() => setActiveCalc(p.id)}
                className="card p-6 text-left group hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{p.emoji}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try Now <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <RefreshCw className="w-10 h-10 text-emerald-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Investing?</h2>
          <p className="text-emerald-100 mb-8">Our advisors will help you build a personalized investment plan based on your exact goals.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => nav('contact')} className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">Talk to an Advisor</button>
            <button onClick={() => nav('mutual-funds')} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">Explore Mutual Funds</button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeCalc && <CalcModal id={activeCalc} onClose={() => setActiveCalc(null)} />}
    </div>
  );
}
