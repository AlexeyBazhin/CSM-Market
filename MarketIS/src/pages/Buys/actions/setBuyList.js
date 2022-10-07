import Update from 'immutability-helper';

export const SET_BUY_LIST = Symbol('SET_BUY_LIST');

export const SetBuyList = data => ({
    type: SET_BUY_LIST,
    payload: data,
});

export const MutateBuyList = (state, {buyList, countAll, lastDocument, firstDocument}) => {
    return Update(state, {
        buyList: {$set: buyList},
        countAll: {$set: countAll},
        lastDocument: {$set: lastDocument},
        firstDocument: {$set: firstDocument},
    });
};
