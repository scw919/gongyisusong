import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollectDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueCollectDetail',
        component: ClueCollectDetail,
        notFilterByMenu: true,
    },
];
