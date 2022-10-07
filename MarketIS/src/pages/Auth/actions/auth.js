import Api from '../../../api';
import {SetIsLoading} from '../../../components/Main/actions/setIsLoading';
import {SetError} from './setError';

const Auth = () =>
    async (dispatch, getState) => {
        try {
            dispatch(SetIsLoading(true));
            
            const {
                Auth: {
                    email,
                    password,
                },
            } = getState();
            
            const {data, errors} = await Api.Auth({email, password});
            
            if (data) {
                localStorage.setItem('@token', data.token);
                location.replace('/');
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

export default Auth;