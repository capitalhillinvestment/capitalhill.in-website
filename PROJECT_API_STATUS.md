# CAPITAL HILL INVESTMENT - API STATUS

Last Updated: June 2026

## FUND APIs

| Endpoint               | Status        |
| ---------------------- | ------------- |
| /api/funds             | Working       |
| /api/funds/performance | Verify        |
| /api/funds/risk        | Verify        |
| /api/search-funds      | Verify        |
| /api/screener          | Verify        |
| /api/amfi-nav          | Not Connected |
| /api/funds-live        | Not Connected |

---

## GOAL APIs

| Endpoint            | Status  |
| ------------------- | ------- |
| /api/goal-plan      | Working |
| /api/goals/simulate | Verify  |

---

## PORTFOLIO APIs

| Endpoint                    | Status  |
| --------------------------- | ------- |
| /api/portfolio/calculate    | Verify  |
| /api/portfolio/health       | Verify  |
| /api/portfolio/intelligence | Verify  |
| /api/portfolio/model        | Working |
| /api/portfolio/recommend    | Verify  |
| /api/portfolio/risk-model   | Verify  |
| /api/portfolio/risk-score   | Verify  |
| /api/portfolio/sip          | Verify  |
| /api/portfolio/smart-calc   | Verify  |

---

## RECOMMENDATION APIs

| Endpoint             | Status |
| -------------------- | ------ |
| /api/recommend/smart | Verify |

---

## TAX APIs

| Endpoint      | Status |
| ------------- | ------ |
| /api/tax/elss | Verify |

---

## ADVISOR APIs

| Endpoint     | Status |
| ------------ | ------ |
| /api/advisor | Verify |

---

## DATA LAYER

Status: Working

Files:

* mutualFunds.ts
* fundMaster.ts
* fundPerformance.ts
* fundRisk.ts

---

## ENGINE LAYER

Status: Working

Files:

* fundScore.ts
* fundScreener.ts
* goalPlanner.ts

---

## NEXT PRIORITY

1. Verify every API endpoint
2. Complete API cleanup
3. Connect AMFI live feed
4. Build daily NAV updater
5. Expand to full AMFI universe
6. Build fund comparison page
7. Build advanced screener
8. Build portfolio analytics dashboard
9. Build advisor login system
10. Build financial planning engine






# Capital Hill Fintech Roadmap

## Research Engine
- [ ] Fund Search
- [ ] Fund Screener
- [ ] Fund Compare

## Portfolio Analytics
- [ ] Rolling Returns
- [ ] Drawdown
- [ ] Correlation

## Financial Planning
- [ ] Goal Planner
- [ ] Retirement Planner
- [ ] Insurance Planner

## Advisor Platform
- [ ] Advisor Login
- [ ] Client CRM

## Data Platform
- [ ] AMFI Sync
- [ ] Historical NAV Database
