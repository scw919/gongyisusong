import lazyLoad from '@/lazyLoad/lazyLoad';
const Charts = lazyLoad(() => import('.'));

export default [
    {
        path: '/',
        component: Charts,
        notFilterByMenu: true,
    },
];
