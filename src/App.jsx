// import React from "react";
import { ZappHOC } from 'zerod';

// 路由组件
import lazyLoad from '@/lazyLoad/lazyLoad';
const Main = lazyLoad(() => import('@/views/Main/'));
const LoginMain = lazyLoad(() => import('@/views/Login/'));
const Index = lazyLoad(() => import('@/views/Index/'));
const pageConfig = {
    rootRoutes: [
        {
            path: '/index',
            component: Index,
        },
        {
            redirect: true,
            path: '/',
            to: '/index/clueDiscovery'
        },
        {
            redirect: true,
            path: '/index',
            to: '/index/clueDiscovery'
        },
        {
            redirect: true,
            path: '/index/clueDiscovery',
            to: '/index/clueDiscovery/byClue'
        },
        {
            path: '/login',
            component: LoginMain,
        },
        // {
        //     path: '/index/clueDiscovery/clueDiscoveryDetail',

        // }
    ],
    footerLinks: null,
    footerCopyright: null,
};
export default ZappHOC(pageConfig);
