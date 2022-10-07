import Update from 'immutability-helper';

export const SET_PAGE = Symbol('SET_PAGE');

export const SetPage = data => ({
    type: SET_PAGE,
    payload: data,
});

export const MutatePage = (state, value) => {
    return Update(state, {
        params: {
            page: {$set: value},
        },
        lastDocument: {$set: state.params.page < value ? state.lastDocument : null},
        firstDocument: {$set: state.params.page > value ? state.firstDocument : null},
    });
};
