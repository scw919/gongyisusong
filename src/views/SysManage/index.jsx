// react
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router'
import { matchPath } from 'react-router-dom';
// zerod
import { Zlayout, ZmainHOC } from 'zerod';
// import GlobalLoading from 'zerod/lazyLoad/Loading.jsx';
// actions
import { changeMenuIndex } from '@/store/actions';
// 路由组件
import mainRoutes from './load-child-routes.js';
// console.log(mainRoutes);
import compnents from '@/components/load-components.js';
const { ApageHeader, } = compnents;
// ant ui
import { Icon, Breadcrumb } from 'antd';
// import { createFromIconfontCN } from '@ant-design/icons';
import commonMethods from '@/zTool/commonMethods.js';
const { matchUrlToMenu, createBreadCrumb } = commonMethods;

// 样式类
import './style.scss';

// import { withRouter } from 'react-router-dom';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1740380_epha2kuvmm.js',
});

const mapStateToProps = (state, ownProps) => ({
    userName: state.userName,
    menuIndex: state.menuIndex,
    collapsed: state.collapsed,
    breadCrumbData: state.breadCrumbData,
});
const mapDispatchToProps = (dispatch) => ({
    changeMenuIndex: (...args) => dispatch(changeMenuIndex(...args)),
});
class Main extends React.Component {
    match = matchPath(this.props.location.pathname, {
        path: this.props.routePath
    });
    location = null;
    componentDidUpdate() {
        // console.log(this.location, this.props.location.pathname, 'componentDidUpdate    ');
        if (this.location && (this.location.pathname == this.props.location.pathname)) {
            return;
        }
        this.location = this.props.location;
        createBreadCrumb(this.match, this.props.location, mainRoutes);
    }
    componentDidMount() {
        matchUrlToMenu(this.match);
        createBreadCrumb(this.match, this.props.location, mainRoutes);
    }
    render() {
        const { history, userName, collapsed, breadCrumbData } = this.props;
        //自定义主页布局，经过ZmainHOC包装的组件，会this.props.getSideMenuTemplate和this.props.getMaimRouteTemplate两个方法
        return (
            <Zlayout>
                <ApageHeader history={history} />
                <Zlayout.Zbody scroll={false} className="layout-container">
                    <Zlayout>
                        <Zlayout.Zheader className="bread-crumb ft-16">
                            <Breadcrumb>
                                {/* <Breadcrumb.Item>线索管理</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="">线索发现</a>
                                </Breadcrumb.Item> */}
                                {
                                    breadCrumbData.map((item, index) => {
                                        return <Breadcrumb.Item onClick={() => { index < breadCrumbData.length - 1 && history.push(item.path) }} key={item.path}>{item.pathName}</Breadcrumb.Item>
                                    })
                                }
                            </Breadcrumb>
                        </Zlayout.Zheader>
                        <Zlayout.Zbody className="white-bg">
                            <Zlayout flexRow>
                                {userName !== 1
                                    ? (<Zlayout width={this.ToggleSiderWidth()}>
                                        {this.props.getSideMenuTemplate({
                                            theme: 'dark',
                                            isCollapse: collapsed,
                                            openAllSubmenu: true,
                                        })}
                                    </Zlayout>)
                                    : null
                                }
                                <Zlayout className="main-container">{this.props.getMaimRouteTemplate()}</Zlayout>
                            </Zlayout>
                        </Zlayout.Zbody>
                    </Zlayout>
                </Zlayout.Zbody>
            </Zlayout>
        );
    }
    ToggleSiderWidth() {
        return this.props.collapsed ? '80px' : '200px';
    }
}
export default ZmainHOC(connect(mapStateToProps, mapDispatchToProps)(Main),
    callback => {
        //同pageConfig的componentDidMount函数
        callback(
            //保存的用户信息
            {},
            //侧边导航数据
            [
                // {
                //     permUrl: 'user',
                //     permName: '用户管理',
                //     permIconUrl: 'compass',
                // },
                {
                    permUrl: 'transform',
                    permName: '穿梭框',
                    permIconUrl: 'compass',
                }
            ],
            //mapKeys
            { iconClass: 'permIconUrl', path: 'permUrl', name: 'permName', children: 'children' },
            //路由配置数据
            mainRoutes,
        );
    });

