import Update from 'immutability-helper';

export const SET_IS_LOADING = Symbol('SET_IS_LOADING');

export const SetIsLoading = data => ({
    type: SET_IS_LOADING,
    payload: data,
});

export const MutateIsLoading = (state, value) => {
    return Update(state, {
        isLoading: {$set: value},
    });
};
