import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueHandleDetail',
        component: ClueDiscoveryDetail,
        notFilterByMenu: true,
    },
];
