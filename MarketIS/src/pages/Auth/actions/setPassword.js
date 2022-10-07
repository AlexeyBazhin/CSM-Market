import Update from 'immutability-helper';

export const SET_PASSWORD = Symbol('SET_PASSWORD');

export const SetPassword = data => ({
    type: SET_PASSWORD,
    payload: data,
});

export const MutatePassword = (state, value) => {
    return Update(state, {
        password: {$set: value},
    });
};
