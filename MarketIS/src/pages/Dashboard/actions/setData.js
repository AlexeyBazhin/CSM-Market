import Update from 'immutability-helper';

export const SET_DATA = Symbol('SET_DATA');

export const SetData = data => ({
    type: SET_DATA,
    payload: data,
});

export const MutateData = (state, value) => {
    return Update(state, {
        data: {$set: value},
    });
};
