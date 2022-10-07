import Auth from './actions/auth';
import {SetEmail} from './actions/setEmail';
import {SetPassword} from './actions/setPassword';

const dispatcher = dispatch => ({
    auth: () => dispatch(Auth()),
    setEmail: value => dispatch(SetEmail(value)),
    setPassword: value => dispatch(SetPassword(value)),
});

export default dispatcher;