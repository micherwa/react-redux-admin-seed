import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from '@/utils/history';
import app from '@/views/app';
import { Provider } from 'react-redux';
import store from '@/store';

import '@/styles/app.scss';

// 监听state变化
// store.subscribe(() => {
//     console.log('store的变化', store.getState());
// });

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={app} />
        </Router>
    </Provider>,
    document.getElementById('app')
);
