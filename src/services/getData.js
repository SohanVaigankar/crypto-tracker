//  api base url
const baseURL = `https://api.coingecko.com/api/v3/`;

// fetch supported base currency list and store it in the state
export const fetchBaseCurrencyList = async (setBaseCurrencyList) => {
  try {
    const apiURL = `${baseURL}simple/supported_vs_currencies`;
    const res = await fetch(apiURL);
    const data = await res.json();
    if (data) {
      setBaseCurrencyList(
        data.map((currency) => currency.toUpperCase()).sort()
      );
    }
  } catch (error) {
    console.error(error);
  }
};

// fetching btc to currency data

export const fetchBTCExchangeRates = async (setExchangeRates) => {
  try {
    const res = await fetch(`${baseURL}exchange_rates`);
    const data = await res.json();
    data && setExchangeRates(data?.rates);
  } catch (error) {
    console.error(error);
  }
};

export const convertBtcToCurrency = (amount, exchangeRate) => {
  //   console.log(btcToCurrencyData);
  return amount * exchangeRate;
};
