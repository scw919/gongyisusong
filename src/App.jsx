// import React from "react";
import { ZappHOC } from 'zerod';

// 路由组件
import lazyLoad from '@/lazyLoad/lazyLoad';
const LoginMain = lazyLoad(() => import('@/views/Login/'));
const Index = lazyLoad(() => import('@/views/Index/'));
const Main = lazyLoad(() => import('@/views/Main/'));
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
            path: '/login',
            component: LoginMain,
        },
    ],
    footerLinks: null,
    footerCopyright: null,
};
export default ZappHOC(pageConfig);
