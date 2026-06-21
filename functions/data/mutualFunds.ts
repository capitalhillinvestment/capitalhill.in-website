export interface MutualFund {
  id: string;
  name: string;
  amc: string;
  category: string;
  subCategory: string;
  nav: number;
  navDate: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  aum: number;
  expenseRatio: number;
  riskLevel: 'Low' | 'Low to Moderate' | 'Moderate' | 'Moderately High' | 'High';
  benchmark: string;
  minInvestment: number;
  fundManager: string;
  launchDate: string;
  rating: number;
}

const amcs = [
  'HDFC', 'ICICI Prudential', 'SBI', 'Kotak', 'Axis', 'Aditya Birla Sun Life',
  'Nippon India', 'Mirae Asset', 'DSP', 'UTI', 'Franklin Templeton', 'IDFC',
  'Canara Robeco', 'L&T', 'Invesco', 'PGIM India', 'Quant', 'Bank of India',
];

const categories = [
  'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'Large & Mid Cap',
  'ELSS', 'Dividend Yield', 'Value Fund', 'Contra Fund',
  'Gilt Fund', 'Corporate Bond', 'Banking & PSU', 'Money Market', 'Liquid',
  'Hybrid Equity', 'Hybrid Debt', 'Balanced Advantage', 'Arbitrage',
];


// Simulate NAV date as today's date
const getNavDate = () => {
  const d = new Date();
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

let fundId = 1;
function createFund(
  name: string,
  amc: string,
  category: string,
  nav: number,
  oneYear: number,
  threeYear: number,
  fiveYear: number,
  aum: number,
  expenseRatio: number,
  risk: MutualFund['riskLevel'],
  benchmark: string,
  minSIP: number,
  fundManager: string,
  launchDate: string,
  rating: number
): MutualFund {
  return {
    id: `MF${String(fundId++).padStart(3, '0')}`,
    name,
    amc,
    category,
    subCategory: category.includes('Debt') || category.includes('Liquid') || category.includes('Money Market') ? 'Regular' : 'Growth',
    nav,
    navDate: getNavDate(),
    returns: { oneYear, threeYear, fiveYear },
    aum,
    expenseRatio,
    riskLevel: risk,
    benchmark,
    minInvestment: minSIP,
    fundManager,
    launchDate,
    rating,
  };
}

const mutualFunds: MutualFund[] = [
  // Large Cap Funds
  createFund('HDFC Top 100 Fund', 'HDFC', 'Large Cap', 845.23, 18.45, 13.21, 12.87, 35420, 1.02, 'Moderate', 'Nifty 100 TRI', 500, 'Rohit Singhania', '17-Oct-1996', 5),
  createFund('ICICI Prudential Bluechip Equity Fund', 'ICICI Prudential', 'Large Cap', 89.12, 16.82, 12.45, 11.98, 45250, 1.17, 'Moderate', 'Nifty 100 TRI', 500, 'Neelesh Surana', '23-May-2008', 5),
  createFund('SBI Large Cap Fund', 'SBI', 'Large Cap', 523.45, 15.34, 11.23, 10.87, 28340, 1.15, 'Moderate', 'Nifty 100 TRI', 500, 'A. Harsha', '03-Feb-1993', 4),
  createFund('Kotak Bluechip Fund', 'Kotak', 'Large Cap', 234.56, 17.23, 12.67, 12.12, 12450, 1.22, 'Moderate', 'Nifty 100 TRI', 500, 'R. Janakiraman', '01-Jan-2014', 5),
  createFund('Axis Bluechip Fund', 'Axis', 'Large Cap', 52.34, 14.56, 10.89, 11.45, 38760, 1.08, 'Moderate', 'Nifty 100 TRI', 500, 'Naren Sivasubramanian', '10-Jan-2010', 4),
  createFund('Aditya Birla Sun Life Frontline Equity Fund', 'Aditya Birla Sun Life', 'Large Cap', 245.67, 15.89, 11.45, 11.23, 21450, 1.12, 'Moderate', 'Nifty 100 TRI', 500, 'Gaurav Misra', '30-Aug-2002', 4),

  // Mid Cap Funds
  createFund('HDFC Mid-Cap Opportunities Fund', 'HDFC', 'Mid Cap', 123.45, 24.56, 18.34, 17.12, 52340, 1.28, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Vinit Sambre', '25-Jun-2007', 5),
  createFund('Kotak Emerging Equity Fund', 'Kotak', 'Mid Cap', 89.34, 22.67, 17.89, 16.45, 18760, 1.35, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Sahil Kapoor', '02-Mar-2004', 5),
  createFund('SBI Magnum Midcap Fund', 'SBI', 'Mid Cap', 156.78, 21.45, 16.78, 15.89, 23450, 1.42, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Anoop Bhaskar', '09-Mar-2005', 4),
  createFund('Axis Midcap Fund', 'Axis', 'Mid Cap', 78.23, 20.12, 15.67, 14.89, 31240, 1.18, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Manish Gunwani', '18-Feb-2011', 4),
  createFund('Nippon India Growth Fund', 'Nippon India', 'Mid Cap', 145.67, 23.45, 18.12, 16.67, 29870, 1.15, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Manish Gunwani', '08-Dec-1994', 5),
  createFund('DSP Midcap Fund', 'DSP', 'Mid Cap', 98.45, 19.89, 15.34, 14.56, 21340, 1.28, 'Moderately High', 'Nifty Midcap 150 TRI', 500, 'Vinit Sambre', '14-Apr-2002', 4),

  // Small Cap Funds
  createFund('HDFC Small Cap Fund', 'HDFC', 'Small Cap', 156.34, 32.45, 22.67, 19.89, 34780, 1.45, 'High', 'Nifty Smallcap 250 TRI', 500, 'Kashyap Amin', '15-Apr-2008', 5),
  createFund('SBI Small Cap Fund', 'SBI', 'Small Cap', 134.56, 28.67, 21.34, 18.45, 19870, 1.52, 'High', 'Nifty Smallcap 250 TRI', 500, 'Anoop Bhaskar', '18-May-2009', 5),
  createFund('Nippon India Small Cap Fund', 'Nippon India', 'Small Cap', 89.67, 35.12, 24.89, 21.34, 45230, 1.25, 'High', 'Nifty Smallcap 250 TRI', 500, 'Manish Gunwani', '16-Sep-2010', 5),
  createFund('Axis Small Cap Fund', 'Axis', 'Small Cap', 45.23, 26.78, 19.45, 17.23, 15240, 1.38, 'High', 'Nifty Smallcap 250 TRI', 500, 'Anand Sharma', '11-Nov-2013', 4),
  createFund('DSP Small Cap Fund', 'DSP', 'Small Cap', 112.34, 29.45, 20.67, 18.12, 12650, 1.48, 'High', 'Nifty Smallcap 250 TRI', 500, 'Vinit Sambre', '10-Jan-2014', 4),
  createFund('ICICI Prudential Smallcap Fund', 'ICICI Prudential', 'Small Cap', 67.89, 27.89, 19.78, 17.56, 17890, 1.55, 'High', 'Nifty Smallcap 250 TRI', 500, 'Neelesh Surana', '20-Jun-2007', 4),

  // Flexi Cap Funds
  createFund('HDFC Flexi Cap Fund', 'HDFC', 'Flexi Cap', 1789.34, 21.34, 14.89, 13.45, 58760, 0.95, 'Moderate', 'Nifty 500 TRI', 500, 'Rohit Singhania', '01-Jan-1995', 5),
  createFund('Kotak Flexicap Fund', 'Kotak', 'Flexi Cap', 345.67, 19.78, 13.56, 12.67, 42150, 1.12, 'Moderate', 'Nifty 500 TRI', 500, 'R. Janakiraman', '22-Aug-2009', 5),
  createFund('UTI Flexi Cap Fund', 'UTI', 'Flexi Cap', 567.89, 18.45, 12.34, 11.89, 28340, 1.05, 'Moderate', 'Nifty 500 TRI', 500, 'Ajay Tyagi', '30-Apr-1992', 4),
  createFund('Axis Flexi Cap Fund', 'Axis', 'Flexi Cap', 23.45, 16.89, 11.78, 11.34, 35670, 1.02, 'Moderate', 'Nifty 500 TRI', 500, 'Naren Sivasubramanian', '13-Sep-2018', 4),

  // ELSS Funds
  createFund('Axis Long Term Equity Fund', 'Axis', 'ELSS', 78.34, 15.67, 10.89, 10.45, 38450, 0.85, 'Moderately High', 'Nifty 500 TRI', 500, 'Naren Sivasubramanian', '05-Dec-2009', 5),
  createFund('ICICI Prudential Long Term Equity Fund', 'ICICI Prudential', 'ELSS', 278.45, 17.23, 12.45, 11.67, 12340, 1.12, 'Moderately High', 'Nifty 500 TRI', 500, 'Neelesh Surana', '01-Jan-1999', 4),
  createFund('HDFC Tax Saver Fund', 'HDFC', 'ELSS', 987.34, 18.56, 13.12, 12.34, 25430, 0.92, 'Moderately High', 'Nifty 500 TRI', 500, 'Rohit Singhania', '21-Mar-1996', 4),
  createFund('Mirae Asset Tax Saver Fund', 'Mirae Asset', 'ELSS', 34.56, 16.78, 11.45, 10.89, 15230, 0.68, 'Moderately High', 'Nifty 500 TRI', 500, 'Neelesh Surana', '28-Dec-2015', 5),

  // Debt Funds
  createFund('HDFC Corporate Bond Fund', 'HDFC', 'Corporate Bond', 23.45, 8.12, 7.89, 7.67, 21540, 0.35, 'Low', 'CRISIL Composite Bond Index', 5000, 'Shobhit Jain', '03-Mar-2015', 5),
  createFund('ICICI Prudential Corporate Bond Fund', 'ICICI Prudential', 'Corporate Bond', 28.67, 7.89, 7.56, 7.34, 18760, 0.38, 'Low', 'CRISIL Composite Bond Index', 5000, 'Dwijendra Singh', '21-May-2014', 5),
  createFund('SBI Magnum Gilt Fund', 'SBI', 'Gilt Fund', 56.78, 8.45, 8.12, 7.89, 12450, 0.42, 'Low', 'CRISIL Gilt Index', 5000, 'Rajeev Sharma', '02-Jan-1998', 4),
  createFund('Kotak Gilt Investment Fund', 'Kotak', 'Gilt Fund', 61.23, 8.23, 7.89, 7.67, 9870, 0.48, 'Low', 'CRISIL Gilt Index', 5000, 'Akhil Purohit', '21-Dec-2001', 4),
  createFund('IDFC Banking & PSU Debt Fund', 'IDFC', 'Banking & PSU', 123.45, 7.56, 7.34, 7.12, 15670, 0.32, 'Low', 'CRISIL Banking & PSU Index', 5000, 'Vikas Agarwal', '14-Feb-2008', 4),
  createFund('Franklin India Ultra Short Bond Fund', 'Franklin Templeton', 'Money Market', 345.67, 7.23, 6.98, 6.78, 11230, 0.28, 'Low', 'CRISIL Money Market Index', 10000, 'Anand Radhakrishnan', '05-Jul-2006', 4),

  // Hybrid Funds
  createFund('HDFC Balanced Advantage Fund', 'HDFC', 'Balanced Advantage', 345.23, 15.67, 11.34, 10.89, 68790, 0.95, 'Moderate', 'CRISIL Hybrid 50+50 Index', 500, 'Gopal Agrawal', '11-Jan-1994', 5),
  createFund('ICICI Prudential Equity & Debt Fund', 'ICICI Prudential', 'Hybrid Equity', 298.56, 14.89, 10.78, 10.45, 52340, 1.12, 'Moderate', 'CRISIL Hybrid 50+50 Index', 500, 'Manish Banthia', '03-Nov-1999', 5),
  createFund('Kotak Balanced Advantage Fund', 'Kotak', 'Balanced Advantage', 156.78, 13.45, 10.12, 9.89, 21450, 1.05, 'Moderate', 'CRISIL Hybrid 50+50 Index', 500, 'Deepak Agrawal', '17-Mar-2013', 4),
  createFund('SBI Equity Hybrid Fund', 'SBI', 'Hybrid Equity', 189.34, 14.23, 10.45, 10.12, 38970, 1.18, 'Moderate', 'CRISIL Hybrid 50+50 Index', 500, 'R. Srinivasan', '15-Dec-1995', 4),

  // Dividend Yield & Value Funds
  createFund('SBI Dividend Yield Fund', 'SBI', 'Dividend Yield', 67.89, 17.34, 12.56, 11.89, 12450, 1.15, 'Moderate', 'Nifty 100 TRI', 500, 'R. Srinivasan', '03-May-2019', 4),
  createFund('ICICI Prudential Dividend Yield Equity Fund', 'ICICI Prudential', 'Dividend Yield', 45.67, 16.45, 11.89, 11.23, 9870, 1.22, 'Moderate', 'Nifty 100 TRI', 500, 'Neelesh Surana', '16-May-2006', 4),
  createFund('Aditya Birla Sun Life Pure Value Fund', 'Aditya Birla Sun Life', 'Value Fund', 34.56, 19.89, 13.67, 12.89, 15670, 1.35, 'Moderately High', 'Nifty 500 TRI', 500, 'Mahesh Patil', '08-Aug-2014', 4),

  // Contra Funds
  createFund('SBI Contra Fund', 'SBI', 'Contra Fund', 312.45, 22.34, 16.78, 15.23, 21340, 1.28, 'Moderately High', 'Nifty 500 TRI', 500, 'Fund Manager', '14-Jul-1999', 5),
  createFund('Invesco India Contra Fund', 'Invesco', 'Contra Fund', 78.34, 20.67, 15.45, 14.67, 12450, 1.42, 'Moderately High', 'Nifty 500 TRI', 500, 'Taher Badshah', '10-Apr-2007', 4),

  // Liquid Funds
  createFund('HDFC Liquid Fund', 'HDFC', 'Liquid', 4567.89, 7.12, 6.78, 6.56, 45670, 0.18, 'Low', 'CRISIL Liquid Fund Index', 20000, 'Rahul Goswami', '01-Oct-2000', 5),
  createFund('ICICI Prudential Liquid Fund', 'ICICI Prudential', 'Liquid', 4234.56, 7.05, 6.72, 6.48, 38540, 0.22, 'Low', 'CRISIL Liquid Fund Index', 20000, 'Dwijendra Singh', '06-May-1999', 5),
];

export { mutualFunds };

export const amcOptions = amcs.sort();
export const categoryOptions = categories.sort();
export const riskColors: Record<string, string> = {
  'Low': 'bg-emerald-100 text-emerald-700',
  'Low to Moderate': 'bg-teal-100 text-teal-700',
  'Moderate': 'bg-amber-100 text-amber-700',
  'Moderately High': 'bg-orange-100 text-orange-700',
  'High': 'bg-red-100 text-red-700',
};

export const riskBarColors: Record<string, string> = {
  'Low': 'bg-emerald-500',
  'Low to Moderate': 'bg-teal-500',
  'Moderate': 'bg-amber-500',
  'Moderately High': 'bg-orange-500',
  'High': 'bg-red-500',
};
