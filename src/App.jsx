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
            isAuth: true,
        },
        {
            redirect: true,
            path: '/index',
            to: '/index/charts',
            isAuth: true
        },
        {
            path: '/main',
            component: Main,
            isAuth: true
        },
        {
            redirect: true,
            path: '/main',
            to: '/main/clueDiscovery',
            isAuth: true
        },
        {
            redirect: true,
            path: '/main/clueDiscovery',
            to: '/main/clueDiscovery/byClue',
            isAuth: true
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
