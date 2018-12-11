import React from 'react';
import Loadable from 'react-loadable';
import MyLoading from '@/components/MyLoading';

const AsyncSubnavOption1 = Loadable({
    loader: () => import('@/views/subnav/option1/main'),
    loading: () => <MyLoading />
});

const AsyncSubnavOption1Detail = Loadable({
    loader: () => import('@/views/subnav/option1/detail'),
    loading: () => <MyLoading />
});

const AsyncSubnavOption2 = Loadable({
    loader: () => import('@/views/subnav/option2'),
    loading: () => <MyLoading />
});

export default [
    {
        path: '/subnav/option1',
        component: AsyncSubnavOption1,
        routes: [
            {
                path: '/subnav/option1/detail',
                component: AsyncSubnavOption1Detail,
            }
        ]
    },
    {
        path: '/subnav/option2',
        component: AsyncSubnavOption2
    }
];
