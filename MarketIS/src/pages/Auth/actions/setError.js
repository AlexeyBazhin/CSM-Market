import Update from 'immutability-helper';

export const SET_ERROR = Symbol('SET_ERROR');

export const SetError = data => ({
    type: SET_ERROR,
    payload: data,
});

export const MutateError = (state, value) => {
    return Update(state, {
        error: {$set: value},
    });
};
