import React from 'react';
import Loadable from 'react-loadable';
import MyLoading from '@/components/MyLoading';

const AsyncDashboardMain = Loadable({
    loader: () => import('@/views/dashboard'),
    loading: () => <MyLoading />
});

export default [
    {
        path: '/dashboard',
        component: AsyncDashboardMain
    }
];
