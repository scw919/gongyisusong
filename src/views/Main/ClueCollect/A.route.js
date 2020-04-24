import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
const ClueCollect = lazyLoad(() => import('.'));

export default [
    // redirectDeal('/myClue/clueCollect', ClueCollect, pathName='线索收录')
    redirectDeal({
        path: '/myClue/clueCollect',
        pathName: '线索收录',
        component: ClueCollect,
    }),
];
