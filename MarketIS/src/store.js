import {applyMiddleware, createStore} from 'redux';
import Thunk from 'redux-thunk';
//TODO: remove logger
import Logger from 'redux-logger';

import Reducers from './reducers';

const usedMiddleware = [Thunk, Logger];

/* eslint-enable no-undef */

export default createStore(
    Reducers,
    applyMiddleware(...usedMiddleware),
);
