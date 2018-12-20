import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from '@/utils/history';
import app from '@/views/app';
import { Provider } from 'react-redux';
import store from '@/store';
import ErrorBoundary from '@/components/ErrorBoundary';

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'nprogress/nprogress.css';
import '@/styles/app.scss';

// 监听state变化
// store.subscribe(() => {
//     console.log('store的变化', store.getState());
// });

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Router history={history}>
                <Route component={app} />
            </Router>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('app')
);
