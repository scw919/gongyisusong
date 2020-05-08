import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
const UserManage = lazyLoad(() => import('.'));

export default [
    redirectDeal({
        path: '/transform',
        pathName: '穿梭框',
        component: UserManage,
    }),
];
