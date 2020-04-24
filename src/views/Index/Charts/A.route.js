// import React from 'react';
// import { Redirect } from 'react-router-dom';
import lazyLoad from '@/lazyLoad/lazyLoad';
import commonMethods from '@/zTool/commonMethods.js';
const { redirectDeal } = commonMethods;
// const isLogin = Boolean(localStorage.getItem('token')&&localStorage.getItem('token')!='null');
const Charts = lazyLoad(() => import('.'));

export default [
    redirectDeal({
        path: '/charts',
        component: Charts,
        notFilterByMenu: true,
    })
];
