import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
const ClueCollect = lazyLoad(() => import('.'));

export default [
    redirectDeal({
        path: '/myClue/clueHandle',
        pathName: '线索处置',
        component: ClueCollect,
    }),
];
