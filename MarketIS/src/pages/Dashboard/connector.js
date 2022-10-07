import DefaultState from './defaultState';

const connector = ({
    Main: {
        isLoading: isLoadingMain = false,
    },
    Dashboard: {
        isLoading,
        error,
        data,
        group,
    } = DefaultState,
}) => ({
    isLoading: isLoading || isLoadingMain,
    error,
    data,
    group,
});

export default connector;