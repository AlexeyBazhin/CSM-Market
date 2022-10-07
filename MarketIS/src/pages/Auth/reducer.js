import DefaultState from './defaultState';

import {SET_ERROR, MutateError} from './actions/setError';
import {SET_EMAIL, MutateEmail} from './actions/setEmail';
import {SET_PASSWORD, MutatePassword} from './actions/setPassword';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_ERROR:
            return MutateError(state, payload);

        case SET_EMAIL:
            return MutateEmail(state, payload);

        case SET_PASSWORD:
            return MutatePassword(state, payload);

        default:
            return state;
    }
};

export default reducer;