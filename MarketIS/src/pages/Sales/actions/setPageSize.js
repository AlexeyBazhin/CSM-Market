import Update from 'immutability-helper';

export const SET_PAGE_SIZE = Symbol('SET_PAGE_SIZE');

export const SetPageSize = data => ({
    type: SET_PAGE_SIZE,
    payload: data,
});

export const MutatePageSize = (state, value) => {
    return Update(state, {
        params: {
            pageSize: {$set: value},
            page: {$set: 0},
        },
        lastDocument: {$set: null},
        firstDocument: {$set: null},
    });
};
