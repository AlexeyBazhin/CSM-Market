import Update from 'immutability-helper';

export const SET_SALE_LIST = Symbol('SET_SALE_LIST');

export const SetSaleList = data => ({
    type: SET_SALE_LIST,
    payload: data,
});

export const MutateSaleList = (state, {saleList, countAll, lastDocument, firstDocument}) => {
    return Update(state, {
        saleList: {$set: saleList},
        countAll: {$set: countAll},
        lastDocument: {$set: lastDocument},
        firstDocument: {$set: firstDocument},
    });
};
