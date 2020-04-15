import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueHandle/clueHandleDetail',
        pathName: '线索处置详情',
        component: ClueDiscoveryDetail,
        notFilterByMenu: true,
    },
];
