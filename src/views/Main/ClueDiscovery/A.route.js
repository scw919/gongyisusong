import lazyLoad from '@/lazyLoad/lazyLoad';
const ClueDiscovery = lazyLoad(() => import('.'));

export default [
    {
        path: '/clueDiscovery/byClue',
        pathName: '线索发现',
        component: ClueDiscovery,
    },
];
