import DefaultState from './defaultState';

const connector = ({
    Main: {
        isLoading: isLoadingMain = false,
    },
    Sales: {
        isLoading,
        error,
        saleList,
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
    saleList,
    countAll,
    params,
    pageSize,
    page,
    filters,
    sortBy,
    sortDir,
});

export default connector;