import { MutualFund } from "../data/mutualFunds";

interface AmfiNav {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
}

export function mapNavToFunds(
  funds: MutualFund[],
  amfiNav: AmfiNav[]
) {
  return funds.map((fund) => {
    const navMatch = amfiNav.find(
      (nav) =>
        fund.amfiCode &&
        nav.schemeCode === fund.amfiCode
    );

    if (!navMatch) {
      return fund;
    }

    return {
      ...fund,
      nav: navMatch.nav,
      navDate: navMatch.date,
    };
  });
}
