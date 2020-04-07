import lazyLoad from '@/lazyLoad/lazyLoad';
const Home = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery',
        component: Home,
    },
];
