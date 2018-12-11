import React from 'react';
import { Route, Redirect } from 'react-router';
import Util from '@/utils';

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            exact={!!route.exact}
            render={props => (
                Util.getLocalItem('token') ?
                    // pass the sub-routes down to keep nesting
                    (<route.component {...props} routes={route.routes} />) :
                    (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
            )}
        />
    );
};

export default RouteWithSubRoutes;
