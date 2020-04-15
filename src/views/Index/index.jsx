// react
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import moment from 'moment';
// zerod
import { Zlayout, ZmainHOC } from 'zerod';
// import GlobalLoading from 'zerod/lazyLoad/Loading.jsx';
// 路由组件
import mainRoutes from './load-child-routes.js';
// console.log(mainRoutes);
import compnents from '@/components/load-components.js';
const { ApageHeader, } = compnents;
// ant ui
import { Icon, Breadcrumb, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
// import { createFromIconfontCN } from '@ant-design/icons';
import commonMethods from '@/zTool/commonMethods.js';
const { matchUrlToMenu } = commonMethods;

// 样式类
import './style.scss';

// import { withRouter } from 'react-router-dom';
// import mainRoutes from '@/Main/load-child-routes.js';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1740380_epha2kuvmm.js',
});

const dateFormat = 'YYYY/MM/DD';

const mapStateToProps = (state, ownProps) => ({
    collapsed: state.collapsed,
    menuIndex: state.mmenuIndex,
});

class Main extends React.Component {
    match = matchPath(this.props.location.pathname, {
        path: this.props.routePath
    });
    componentWillMount() {
        console.log(this.props.location, this.match, '11112222');
    }
    componentDidMount(){
        matchUrlToMenu(this.match);
    }
    render() {
        const { history, collapsed, menuIndex } = this.props;
        
        //自定义主页布局，经过ZmainHOC包装的组件，会this.props.getSideMenuTemplate和this.props.getMaimRouteTemplate两个方法
        return (
            <Zlayout>
                <ApageHeader history={history} />
                <Zlayout.Zbody scroll={false} className="layout-container">
                    <div className="" style={{position: 'fixed', top: "22px", left: '40px', color: 'red', zIndex: 100000000}}>定位元素</div>
                    <Zlayout flexRow >
                        <Zlayout.Zheader>
                            <div style={{ width: '100%', height: '100%' }} className="flex flex-between align-item-center">
                                <Breadcrumb className="ft-16">
                                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{ width: '400px' }} className="align-right flex align-item-center">
                                    <div style={{ width: '90px' }}>选择日期：</div>
                                    <RangePicker
                                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                        style={{ width: '300px' }}
                                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </Zlayout.Zheader>
                        <Zlayout.Zbody>
                            <Zlayout flexRow>
                                <Zlayout className="main-container">{this.props.getMaimRouteTemplate()}</Zlayout>
                            </Zlayout>
                        </Zlayout.Zbody>
                    </Zlayout>
                </Zlayout.Zbody>
            </Zlayout>
        );
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    ToggleSiderWidth() {
        return this.props.collapsed ? '80px' : '200px';
    }
}
export default ZmainHOC(connect(mapStateToProps)(Main),
    callback => {
        //同pageConfig的componentDidMount函数
        callback(

            //保存的用户信息
            {},
            //侧边导航数据
            [

            ],
            //mapKeys
            { iconClass: 'permIconUrl', path: 'permUrl', name: 'permName', children: 'children' },
            //路由配置数据
            mainRoutes,
        );
    });

