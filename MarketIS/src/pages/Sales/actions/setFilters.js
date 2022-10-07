import Update from 'immutability-helper';

export const SET_FILTERS = Symbol('SET_FILTERS');

export const SetFilters = data => ({
    type: SET_FILTERS,
    payload: data,
});

export const MutateFilters = (state, value) => {
    return Update(state, {
        params: {
            filters: {$set: value},
            page: {$set: 0},
        },
        lastDocument: {$set: null},
        firstDocument: {$set: null},
    });
};
