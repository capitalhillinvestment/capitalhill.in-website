export function mapNavToFunds(mutualFunds: any[], amfiNav: any[]) {
  return mutualFunds.map((fund) => {
    const match = amfiNav.find((n: any) =>
      n.schemeName?.toLowerCase().includes(fund.name.toLowerCase()) ||
      fund.name.toLowerCase().includes(n.schemeName?.toLowerCase() || "")
    );

    return {
      ...fund,
      nav: match ? match.nav : fund.nav,
      navDate: match ? match.date : fund.navDate,
    };
  });
}
