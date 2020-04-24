import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
const ClueDiscovery = lazyLoad(() => import('.'));

export default [
    redirectDeal({
        path: '/clueDiscovery/byClue',
        pathName: '线索发现',
        component: ClueDiscovery,
    }),
];
