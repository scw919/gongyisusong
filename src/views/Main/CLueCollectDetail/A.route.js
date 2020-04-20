import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollectDetail = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueCollect/clueCollectDetail/:id',
        pathName: '线索收录详情',
        component: ClueCollectDetail,
        notFilterByMenu: true,
    },
];
