import DefaultState from './defaultState';

import {SET_IS_LOADING, MutateIsLoading} from './actions/setIsLoading';
import {CLEAR_TABLE, MutateTable} from './actions/clearTable';
import {SET_BUY_LIST, MutateBuyList} from './actions/setBuyList';
import {SET_FILTERS, MutateFilters} from './actions/setFilters';
import {SET_PAGE, MutatePage} from './actions/setPage';
import {SET_PAGE_SIZE, MutatePageSize} from './actions/setPageSize';
import {SET_SORT, MutateSort} from './actions/setSort';
import {SET_ERROR, MutateError} from './actions/setError';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_IS_LOADING:
            return MutateIsLoading(state, payload);

        case CLEAR_TABLE:
            return MutateTable(state, payload);

        case SET_BUY_LIST:
            return MutateBuyList(state, payload);

        case SET_FILTERS:
            return MutateFilters(state, payload);

        case SET_PAGE:
            return MutatePage(state, payload);

        case SET_PAGE_SIZE:
            return MutatePageSize(state, payload);

        case SET_SORT:
            return MutateSort(state, payload);

        case SET_ERROR:
            return MutateError(state, payload);

        default:
            return state;
    }
};

export default reducer;