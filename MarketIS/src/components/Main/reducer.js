import DefaultState from './defaultState';

import {SET_IS_LOADING, MutateIsLoading} from './actions/setIsLoading';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_IS_LOADING:
            return MutateIsLoading(state, payload);

        default:
            return state;
    }
};

export default reducer;