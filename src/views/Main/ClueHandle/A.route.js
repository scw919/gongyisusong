import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueCollect = lazyLoad(() => import('.'));

export default [
    {
        path: '/myClue/clueHandle',
        component: ClueCollect,
    },
];
