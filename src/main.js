import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
// //引入基本模板
// const echarts = require('echarts/lib/echarts');

// 引入折线图/柱状图等组件
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/radar');

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
// React.$echarts = echarts;

import App from './App';
import './antd-vars.less';
import './app.scss';
function didRoot(App) {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector('#app'),
    );
}
didRoot(App);

if (module.hot) {
    module.hot.accept();
}
