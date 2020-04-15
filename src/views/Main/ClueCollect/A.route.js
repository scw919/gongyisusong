import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollect = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueCollect',
        pathName: '线索收录',
        component: ClueCollect,
    },
];
