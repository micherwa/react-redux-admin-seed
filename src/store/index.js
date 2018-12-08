import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as dashboard from './dashboard/reducer';

const store = createStore(
    combineReducers({
        ...dashboard
    }),
    applyMiddleware(thunk)
);

export default store;
