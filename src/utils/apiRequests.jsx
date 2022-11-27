export const loadData = async (itemsPerPage, pageNumber) => {
  const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&amp;order=market_cap_desc&amp;per_page=${itemsPerPage}&amp;page=${pageNumber}&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`;
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
