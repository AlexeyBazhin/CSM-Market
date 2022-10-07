import Api from '../../../api';
import {SetIsLoading} from './setIsLoading';
import {SetError} from './setError';
import {SetBuyList} from './setBuyList';
import {ClearTable} from './clearTable';

const Fetch = () =>
    async (dispatch, getState) => {
        try {
            dispatch(SetIsLoading(true));
            
            const {
                Buys: {
                    params,
                    lastDocument,
                    firstDocument,
                },
            } = getState();
            
            const {data, errors} = await Api.FetchBuys({
                ...params,
                lastDocument: params.page !== 0 ? lastDocument : null,
                firstDocument: params.page !== 0 ? firstDocument : null,
            });
            
            if (data) {
                dispatch(SetBuyList({
                    buyList: data.data,
                    countAll: data.countAll,
                    firstDocument: data.firstDocument,
                    lastDocument: data.lastDocument,
                }));
                dispatch(SetError(null));
            } else {
                dispatch(SetError(errors.errorMessage));
                dispatch(ClearTable());
            }
            
            dispatch(SetIsLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(SetError('Произошла непредвиденная ошибка'));
            dispatch(ClearTable());
            dispatch(SetIsLoading(false));
        }
    };

export default Fetch;