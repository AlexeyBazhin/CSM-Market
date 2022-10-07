import Update from 'immutability-helper';
import DefaultState from '../defaultState';

export const CLEAR_TABLE = Symbol('CLEAR_TABLE');

export const ClearTable = () => ({
    type: CLEAR_TABLE,
});

export const MutateTable = state => {
    return Update(state, {
        $set: {
            ...DefaultState,
            buyList: state.buyList,
        },
    });
};
