import Update from 'immutability-helper';

export const SET_GROUP = Symbol('SET_GROUP');

export const SetGroup = data => ({
    type: SET_GROUP,
    payload: data,
});

export const MutateGroup = (state, {chart, groupBy}) => {
    return Update(state, {
        group: {
            [chart]: {$set: groupBy},
        },
    });
};
