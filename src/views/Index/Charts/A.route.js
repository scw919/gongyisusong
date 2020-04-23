import lazyLoad from '@/lazyLoad/lazyLoad';
const Charts = lazyLoad(() => import('.'));

export default [
    {
        path: '/charts',
        component: Charts,
        isAuth: true,
        notFilterByMenu: true,
    },
];
