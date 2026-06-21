import { MutualFund } from "../data/mutualFunds";

export type GoalType =
  | "House"
  | "Education"
  | "Retirement"
  | "Wealth";

export type RiskProfile =
  | "Conservative"
  | "Moderate"
  | "Aggressive";

export interface GoalInput {
  goalType: GoalType;
  years: number;
  monthlySIP: number;
  riskProfile: RiskProfile;
}

function getBaseAllocation(years: number) {
  if (years <= 3) return { equity: 20, debt: 70, hybrid: 10 };
  if (years <= 7) return { equity: 45, debt: 35, hybrid: 20 };
  if (years <= 15) return { equity: 70, debt: 20, hybrid: 10 };
  return { equity: 85, debt: 10, hybrid: 5 };
}

function adjustRisk(allocation: any, risk: RiskProfile) {
  let equityAdj = 0;
  let debtAdj = 0;

  if (risk === "Conservative") {
    equityAdj = -10;
    debtAdj = +10;
  }

  if (risk === "Aggressive") {
    equityAdj = +10;
    debtAdj = -10;
  }

  const equity = Math.max(0, allocation.equity + equityAdj);
  const debt = Math.max(0, allocation.debt + debtAdj);
  const hybrid = Math.max(0, 100 - equity - debt);

  return { equity, debt, hybrid };
}

function futureValue(sip: number, years: number, rate: number) {
  const r = rate / 12 / 100;
  const n = years * 12;

  return (
    sip *
    ((Math.pow(1 + r, n) - 1) * (1 + r)) /
    r
  );
}

function buildProjection(sip: number, years: number) {
  return {
    conservative: Math.round(futureValue(sip, years, 8)),
    expected: Math.round(futureValue(sip, years, 10)),
    aggressive: Math.round(futureValue(sip, years, 12)),
  };
}

function pickFunds(funds: MutualFund[]) {
  const equity = funds.filter(f => f.category.toLowerCase().includes("equity"));
  const debt = funds.filter(f => f.category.toLowerCase().includes("debt"));
  const hybrid = funds.filter(f => f.category.toLowerCase().includes("hybrid"));

  return [
    ...equity.slice(0, 3),
    ...debt.slice(0, 2),
    ...hybrid.slice(0, 1),
  ];
}

export function buildGoalPlan(input: GoalInput, funds: MutualFund[]) {
  const base = getBaseAllocation(input.years);
  const allocation = adjustRisk(base, input.riskProfile);
  const projection = buildProjection(input.monthlySIP, input.years);
  const recommendedFunds = pickFunds(funds);

  return {
    goalType: input.goalType,
    years: input.years,
    monthlySIP: input.monthlySIP,
    riskProfile: input.riskProfile,
    allocation,
    projection,
    recommendedFunds,
  };
}
