import Api from '../../../api';
import {SetIsLoading} from '../../Main/actions/setIsLoading';

const Signout = () =>
    async dispatch => {
        try {
            dispatch(SetIsLoading(true));
            
            const {data, errors} = await Api.Signout();
            
            if (data || errors.errorCode === 'auth/not-authorized') {
                localStorage.removeItem('@token');
                location.replace('/auth');
            } else {
                console.log(errors);
            }
            
            dispatch(SetIsLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(SetIsLoading(false));
        }
    };

export default Signout;