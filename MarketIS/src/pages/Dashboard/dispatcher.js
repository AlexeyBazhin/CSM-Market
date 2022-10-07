import Fetch from './actions/fetch';
import {SetGroup} from './actions/setGroup';

const dispatcher = dispatch => ({
    fetch: () => dispatch(Fetch()),
    setGroup: value => dispatch(SetGroup(value)),
});

export default dispatcher;