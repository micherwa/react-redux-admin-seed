import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import MyLoading from '@/components/MyLoading';

const AsyncHome = Loadable({
    loader: () => import('@/views/home'),
    loading: () => <MyLoading />
});

const AsyncLogin = Loadable({
    loader: () => import('@/views/login'),
    loading: () => <MyLoading />
});

class App extends React.Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={AsyncLogin} />
                    <AsyncHome />
                </Switch>
            </div>
        );
    };
}

export default hot(module)(App);
