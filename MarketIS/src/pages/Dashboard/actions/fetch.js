import Api from '../../../api';
import {SetIsLoading} from './setIsLoading';
import {SetError} from './setError';
import {SetData} from './setData';

const Fetch = () =>
    async (dispatch, getState) => {
        try {
            const {
                Dashboard: {
                    group,
                }
            } = getState();
            
            dispatch(SetIsLoading(true));
            
            const {data, errors} = await Api.FetchDashboard({group});
            
            if (data) {
                dispatch(SetData(data));
                dispatch(SetError(null));
            } else {
                dispatch(SetError(errors.errorMessage));
            }
            
            dispatch(SetIsLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(SetError('Произошла непредвиденная ошибка'));
            dispatch(SetIsLoading(false));
        }
    };

export default Fetch;