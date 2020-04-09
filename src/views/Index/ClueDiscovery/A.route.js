import lazyLoad from '@/lazyLoad/lazyLoad';
const Charts = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/byClue',
        component: Charts,
    },
];
