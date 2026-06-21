# Capital Hill Investment - Project Status

Last Updated: June 2026

---

# Project Overview

Capital Hill Investment is being developed as a full-scale fintech research and advisory platform focused on:

* Mutual Fund Research
* Portfolio Analytics
* Goal Planning
* Financial Planning
* Advisor Tools
* AI-powered Recommendations

Technology Stack:

* React + Vite
* TypeScript
* Cloudflare Pages
* Cloudflare Functions
* GitHub
* AMFI Data Integration

---

# Current Development Stage

Phase: Research Platform Foundation

Status: In Progress

Estimated Completion: 45%

---

# Architecture

## Data Layer

Current Files:

data/

* mutualFunds.ts
* fundMaster.ts
* fundPerformance.ts
* fundRisk.ts

Status:

* mutualFunds.ts → Working
* fundMaster.ts → Partial
* fundPerformance.ts → Partial
* fundRisk.ts → Partial

Goal:

Create a normalized fund database where all APIs consume a single source of truth.

---

## Engine Layer

Current Files:

engine/

* fundScore.ts
* fundScreener.ts
* goalPlanner.ts

Status:

* fundScore.ts → Active
* fundScreener.ts → Version 1
* goalPlanner.ts → Version 1

Future:

* Portfolio Analytics Engine
* Financial Planning Engine
* AI Recommendation Engine

---

## Utilities

utils/

* apiResponse.ts
* mapNav.ts

Status:

Stable

---

# API Status Summary

Completed:

* /api/funds
* /api/search-funds
* /api/amfi-nav
* /api/screener
* /api/goal-plan
* /api/recommend/smart

Partially Completed:

* /api/funds-live
* /api/portfolio/intelligence
* /api/advisor

Needs Review:

* /api/portfolio/risk-model
* /api/portfolio/risk-score
* /api/portfolio/sip
* /api/portfolio/smart-calc

---

# Completed Features

## Fund Discovery

Status: Complete

Features:

* Fund Listing
* Fund Search
* Fund Categories

---

## NAV Integration

Status: Complete

Features:

* AMFI NAV Fetching
* NAV Mapping

---

## Basic Screener

Status: Complete

Features:

* Category Filtering
* Return Filtering
* Risk Filtering

---

## Goal Planning

Status: Complete

Features:

* Goal Amount Calculation
* SIP Projection

---

# Active Development

Priority 1

API Validation and Stabilization

Tasks:

* Verify all APIs
* Standardize responses
* Remove duplicate logic
* Improve error handling

---

Priority 2

Top Funds Engine

New API:

/api/top-funds

Purpose:

* Category Ranking
* Top Performing Funds
* Best Risk Adjusted Funds

Status:

Not Started

---

Priority 3

Fund Compare Engine

New API:

/api/compare-funds

Purpose:

* Compare Returns
* Compare Risk
* Compare Expense Ratio
* Compare AUM

Status:

Not Started

---

Priority 4

Screener V2

Features:

* AMC Filters
* AUM Filters
* Expense Ratio Filters
* Sharpe Ratio Filters
* Alpha Filters
* Beta Filters

Status:

Not Started

---

Priority 5

Portfolio Analytics Engine

Purpose:

Professional Portfolio Review

Features:

* Diversification Score
* Risk Score
* Asset Allocation Analysis
* Concentration Analysis
* Portfolio Health

Status:

Planned

---

Priority 6

Advisor Dashboard

Purpose:

Advisor-only workspace

Features:

* Login
* Client Profiles
* Goal Plans
* Portfolio Reviews
* Reports

Status:

Planned

---

Priority 7

Goal Planning Engine V2

Features:

* Inflation Engine
* Multiple Goals
* Goal Priority Ranking
* Step-up SIP

Status:

Planned

---

Priority 8

Live AMFI Sync

Purpose:

Automatic Data Updates

Features:

* Daily Sync
* NAV Cache
* Data Validation

Status:

Planned

---

Priority 9

AI Recommendation Engine

Purpose:

Smart Fund Recommendations

Features:

* Risk Profiling
* Goal Matching
* Fund Ranking
* Portfolio Suggestions

Status:

Planned

---

Priority 10

Financial Planning Engine

Purpose:

Complete Financial Planning

Modules:

* Retirement Planning
* Education Planning
* Marriage Planning
* Insurance Planning
* Tax Planning

Status:

Planned

---

# Future Architecture

Target Structure

api/

funds/

* list
* search
* top
* compare
* live

portfolio/

* calculate
* analytics
* health
* intelligence

planning/

* goal
* retirement
* education
* marriage

advisor/

* login
* dashboard
* clients

recommend/

* smart
* ai

tax/

* elss
* capital-gains

---

# Success Criteria

Research Platform: 100%

Advisor Platform: 100%

Financial Planning Platform: 100%

AI Recommendation Platform: 100%

Capital Hill Investment becomes a complete digital wealth and advisory ecosystem.




# CAPITAL HILL INVESTMENT - PROJECT STATUS

Last Updated: June 2026

## PROJECT OVERVIEW

Capital Hill Investment is being developed into a complete fintech platform consisting of:

* Mutual Fund Research
* Fund Comparison
* Fund Screener
* Goal Planning Engine
* Portfolio Analytics
* Risk Profiling
* Recommendation Engine
* Financial Planning Engine
* Advisor Dashboard
* Client Management System
* Live AMFI Integration
* Future Stock Research Engine

---

# CURRENT DEVELOPMENT STATUS

## PHASE 1 - FOUNDATION

### Website Infrastructure

Status: COMPLETED

* React Frontend
* Vite Build System
* TypeScript
* Cloudflare Pages Deployment
* Cloudflare Functions
* API Architecture

### Research Architecture

Status: COMPLETED

* Research Page
* API Driven Data
* Fund Data Separation
* Engine Layer
* Utility Layer

### Fund Database

Status: COMPLETED

Files:

* mutualFunds.ts
* fundMaster.ts
* fundPerformance.ts
* fundRisk.ts

Current Coverage:

* Sample Fund Database
* Test Research Data
* Category Mapping
* Risk Mapping

---

## PHASE 2 - RESEARCH ENGINE

Status: IN PROGRESS

Completed:

* Fund Score Engine
* Fund Screener Engine
* Goal Planner Engine

Pending:

* Fund Comparison Engine
* Ranking Engine
* Holdings Analytics
* Benchmark Analytics
* Category Analytics
* Rolling Return Engine
* Drawdown Engine
* Risk Analytics

---

## PHASE 3 - LIVE DATA

Status: NOT STARTED

Target:

* Live AMFI Sync
* Daily NAV Updates
* Automatic Data Refresh
* Historical NAV Database
* Scheme Master Database
* Holdings Import
* Benchmark Data Import

Goal:

5000+ Mutual Fund Schemes

---

## PHASE 4 - PORTFOLIO ANALYTICS

Status: PARTIALLY BUILT

Target Features:

* Portfolio XIRR
* Portfolio CAGR
* Portfolio Allocation
* Asset Allocation
* Sector Allocation
* Rolling Returns
* Drawdown Analysis
* Correlation Analysis
* Beta Analysis
* Scenario Analysis
* Stress Testing
* Rebalancing Suggestions

---

## PHASE 5 - ADVISOR PLATFORM

Status: NOT STARTED

Features:

* Advisor Login
* Client Database
* Client Goals
* Client Portfolios
* Client Risk Profiles
* Client Reports
* Advisor Dashboard
* CRM Integration

---

## PHASE 6 - FINANCIAL PLANNING ENGINE

Status: NOT STARTED

Features:

* Goal Planning
* Retirement Planning
* Child Education Planning
* Marriage Planning
* Wealth Creation Planning
* Insurance Planning
* Emergency Fund Planning
* Tax Planning
* Cashflow Planning

---

## PHASE 7 - AI LAYER

Status: NOT STARTED

Features:

* Smart Recommendations
* Portfolio Intelligence
* AI Goal Suggestions
* AI Risk Assessment
* AI Portfolio Review
* AI Financial Health Score

---

## LONG TERM VISION

Capital Hill Investment Fintech Ecosystem

Modules:

* Mutual Funds
* Stocks
* PMS
* AIF
* Bonds
* Insurance
* Goal Planning
* Portfolio Analytics
* Advisor CRM
* Financial Planning
* AI Wealth Assistant

Target:

Complete Wealth Management Platform

