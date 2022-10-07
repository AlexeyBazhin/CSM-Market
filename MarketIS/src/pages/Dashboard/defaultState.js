const DefaultState = {
    isLoading: false,
    error: null,
    group: {
        lineSales: 'months',
        lineBuys: 'months',
        lineEarn: 'months',
    },
    data: {
        totalEarn: 0,
        todayEarn: 0,
        todayBought: {
            amount: 0,
            count: 0,
        },
        todaySold: {
            amount: 0,
            count: 0,
        },
        totalBought: {
            amount: 0,
            count: 0,
        },
        totalSold: {
            amount: 0,
            count: 0,
        },
        datasetBuys: {
            labels: [],
            count: [],
            amount: [],
        },
        datasetSales: {
            labels: [],
            count: [],
            amount: [],
        },
        datasetEarn: {
            labels: [],
            amount: [],
        },
    },
};

export default DefaultState;