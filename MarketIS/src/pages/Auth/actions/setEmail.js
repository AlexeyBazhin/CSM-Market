import Update from 'immutability-helper';

export const SET_EMAIL = Symbol('SET_EMAIL');

export const SetEmail = data => ({
    type: SET_EMAIL,
    payload: data,
});

export const MutateEmail = (state, value) => {
    return Update(state, {
        email: {$set: value},
    });
};
