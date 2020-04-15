import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollect = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueHandle',
        pathName: '线索处置',
        component: ClueCollect,
    },
];
