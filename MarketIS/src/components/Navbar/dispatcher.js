import Signout from './actions/signout';

const dispatcher = dispatch => ({
    signout: () => dispatch(Signout()),
});

export default dispatcher;