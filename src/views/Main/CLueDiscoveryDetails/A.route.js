import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/byClue/clueDiscoveryDetail',
        pathName: '线索发现详情',
        component: ClueDiscoveryDetail,
        notFilterByMenu: true,
    },
];
