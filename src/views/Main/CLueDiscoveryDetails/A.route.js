import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/byClue/clueDiscoveryDetail',
        component: ClueDiscoveryDetail,
        notFilterByMenu: true,
    },
];
