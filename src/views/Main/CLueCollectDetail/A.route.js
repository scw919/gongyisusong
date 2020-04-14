import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollectDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueCollect/clueCollectDetail',
        component: ClueCollectDetail,
        notFilterByMenu: true,
    },
];
