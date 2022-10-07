import DefaultState from './defaultState';

const connector = ({
    Main: {
        isLoading: isLoadingMain = false,
    },
    Buys: {
        isLoading,
        error,
        buyList,
        countAll,
        params,
        params: {
            pageSize,
            page,
            filters,
            sortBy,
            sortDir,
        },
    } = DefaultState,
}) => ({
    isLoading: isLoading || isLoadingMain,
    error,
    buyList,
    countAll,
    params,
    pageSize,
    page,
    filters,
    sortBy,
    sortDir,
});

export default connector;