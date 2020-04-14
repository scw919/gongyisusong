import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscovery = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/byClue',
        component: ClueDiscovery,
    },
];
