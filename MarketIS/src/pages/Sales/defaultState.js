const DefaultState = {
    isLoading: false,
    error: null,
    saleList: [],
    countAll: 0,
    lastDocument: null,
    firstDocument: null,
    params: {
        pageSize: 20,
        page: 0,
        sortBy: 'date',
        sortDir: 'desc',
        filters: {
            name: null,
            maxPriceSell: null,
            minPriceSell: null,
            maxPriceBuy: null,
            minPriceBuy: null,
            dateStart: null,
            dateEnd: null,
        },
    },
};

export default DefaultState;