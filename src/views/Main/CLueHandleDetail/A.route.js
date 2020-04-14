import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscoveryDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueHandle/clueHandleDetail',
        component: ClueDiscoveryDetail,
        notFilterByMenu: true,
    },
];
