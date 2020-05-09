import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
const UserManage = lazyLoad(() => import('.'));

export default [
    redirectDeal({
        path: '/sys/user',
        pathName: '用户管理',
        component: UserManage,
    }),
];
