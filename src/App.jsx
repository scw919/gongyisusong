// import React from "react";
import { ZappHOC } from 'zerod';

// 路由组件
import lazyLoad from '@/lazyLoad/lazyLoad';
const LoginMain = lazyLoad(() => import('@/views/Login/'));
const Index = lazyLoad(() => import('@/views/Index/'));
const Main = lazyLoad(() => import('@/views/Main/'));
// System
const System = lazyLoad(() => import('@/views/SysManage/'));
const pageConfig = {
    rootRoutes: [
        {
            path: '/index',
            component: Index,
            exact: false,
        },
        {
			redirect: true,
			path: "/",
			to: "/index/charts",
		},
        {
            redirect: true,
            path: '/index',
            to: '/index/charts',
        },
        {
            path: '/main',
            component: Main,
            exact: false,
        },
        {
            redirect: true,
            path: '/main',
            to: '/main/clueDiscovery/byClue',
        },
        {
            path: '/sys',
            component: System
        },
        {
            redirect: true,
            path: '/sys',
            to: '/sys/user',
        },
        {
            path: '/login',
            component: LoginMain,
        },
    ],
    footerLinks: null,
    footerCopyright: null,
};
export default ZappHOC(pageConfig);
