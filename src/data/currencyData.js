export const currencySymbolList = {
  AED: { symbol: "AED", name: "UAE Dinar", category: "fiat" },
  AUD: { symbol: "A$", name: "Australian dollar", category: "fiat" },
  BTD: { symbol: "৳", name: "Bangladeshi taka", category: "fiat" },
  CNY: { symbol: "¥", name: "Chinese Yuan", category: "fiat" },
  EUR: { symbol: "€", name: "Euro", category: "fiat" },
  GBP: { symbol: "£", name: "Pounds Sterling", category: "fiat" },
  KHD: { symbol: "HK$", name: "Hong Kong dollar", category: "fiat" },
  KZT: { symbol: "₸", name: "Kazakhstani tenge", category: "fiat" },
  INR: { symbol: "₹", name: "Indian Rupee", category: "fiat" },
  IDR: { symbol: "Rp", name: "Indonesian rupiah", category: "fiat" },
  JPY: { symbol: "¥", name: "Japanese Yen", category: "fiat" },
  KRW: { symbol: "₩", name: "South Korean won", category: "fiat" },
  KPW: { symbol: "₩", name: "North Korean won", category: "fiat" },
  NZD: { symbol: "$", name: "New Zealand dollar", category: "fiat" },
  PHP: { symbol: "₱", name: "Philippine peso", category: "fiat" },
  RUB: { symbol: "₽", name: "Russian Ruble", category: "fiat" },
  SGD: { symbol: "S$", name: "Singapore dollar", category: "fiat" },
  THB: { symbol: "฿", name: "Thai Baht", category: "fiat" },
  USD: { symbol: "$", name: "US Dollar", category: "fiat" },
  //   crypto
  ADA: { symbol: "₳", name: "Cardano" ,category:"cryptocurrency"},
  BAT: { symbol: "⟁", name: "Basic Attention Token" ,category:"cryptocurrency"},
  BCH: { symbol: "Ƀ", name: "Bitcoin Cash" ,category:"cryptocurrency"},
  BTC: { symbol: "₿", name: "Bitcoin" ,category:"cryptocurrency"},
  DOGE: { symbol: "Ð", name: "Doge" ,category:"cryptocurrency"},
  EOS: { symbol: "ε", name: "" ,category:"cryptocurrency"},
  ETC: { symbol: "ξ", name: "Ethereum Classic" ,category:"cryptocurrency"},
  ETH: { symbol: "Ξ", name: "Ethereum" ,category:"cryptocurrency"},
  FIL: { symbol: "⨎", name: "Filecoin" ,category:"cryptocurrency"},
  LTC: { symbol: "Ł", name: "Litecoin" ,category:"cryptocurrency"},
  XMR: { symbol: "ɱ", name: "Monero" ,category:"cryptocurrency"},
  USDT: { symbol: "₮", name: "Tether" ,category:"cryptocurrency"},
  XRP: { symbol: "✕", name: "Ripple" ,category:"cryptocurrency"},
};

// fn to return currency unicode symbol
export const getCurrencySymbol = (currency) => {
  const result = currencySymbolList[currency.toUpperCase()]
    ? currencySymbolList[currency.toUpperCase()].symbol
    : currency.toUpperCase();
  return result;
};
