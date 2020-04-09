import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/clueDiscoveryDetail',
        component: ClueDiscoveryDetail,
    },
];
