/* eslint-disable no-undef */
const calcProfit = (priceFrom, priceTo) => {
    const profit = Math.round((priceTo - priceFrom) / Math.max(priceFrom, priceTo) * 10000) / 100;
    return +profit.toFixed(2);
};

module.exports = {
    calcProfit,
};