import Update from 'immutability-helper';

export const SET_SORT = Symbol('SET_SORT');

export const SetSort = data => ({
    type: SET_SORT,
    payload: data,
});

export const MutateSort = (state, {sortBy, sortDir}) => {
    return Update(state, {
        params: {
            sortBy: {$set: sortBy},
            sortDir: {$set: sortDir},
            page: {$set: 0},
        },
        lastDocument: {$set: null},
        firstDocument: {$set: null},
    });
};
