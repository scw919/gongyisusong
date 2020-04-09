// react
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// zerod
import { Zlayout, ZmainHOC, ZpageHeader } from 'zerod';
import GlobalLoading from 'zerod/lazyLoad/Loading.jsx';
// 路由组件
import mainRoutes from './load-child-routes.js';
// console.log(mainRoutes);
import compnents from '@/components/load-components.js';
const { ApageHeader, } = compnents;
// ant ui
import { Icon, Dropdown, Menu, Button, Breadcrumb } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

// img
import logo from '@/assets/images/logo.png';
// 样式类
import './style.scss';

// import { withRouter } from 'react-router-dom';
// import mainRoutes from '@/Main/load-child-routes.js';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1740380_epha2kuvmm.js',
});

const logoStyle = {
    height: '100%',
    width: 'auto',
};
const mapStateToProps = (state, ownProps) => ({
    userName: state.userName,
    collapsed: state.collapsed
});

class Main extends React.Component {
    componentDidMount() { }
    render() {
        const { history, userName, collapsed } = this.props;
        //自定义主页布局，经过ZmainHOC包装的组件，会this.props.getSideMenuTemplate和this.props.getMaimRouteTemplate两个方法
        return (
            <Zlayout>
                <ApageHeader history={history} />
                <Zlayout.Zbody scroll={false} className="layout-container">
                    <Zlayout flexRow >
                        <Zlayout.Zheader className="bread-crumb">
                            <Breadcrumb>
                                <Breadcrumb.Item>线索管理</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="">线索发现</a>
                                </Breadcrumb.Item>
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
export default ZmainHOC(connect(mapStateToProps)(Main),
    callback => {
        //同pageConfig的componentDidMount函数
        callback(
            //保存的用户信息
            {},
            //侧边导航数据
            [
                {
                    permUrl: 'clueDiscovery',
                    permName: '线索发现',
                    permIconUrl: 'compass',
                    children: [
                        {
                            permUrl: 'byClue',
                            permName: '按线索',
                            permIconUrl: '11',
                        },
                        {
                            permUrl: 'clueDiscoveryDetail',
                            permName: 'detail',
                            permIconUrl: '11'
                        }
                    ]
                },
                {
                    permUrl: 'clueDiscoveryCopy',
                    permName: '我的线索',
                    permIconUrl: () => {
                        return (<IconFont size="large" type="icon-integral" />)
                    },
                    children: [
                        {
                            permUrl: 'byClue1',
                            permName: '线索搜录',
                            permIconUrl: '11',
                        },
                        {
                            permUrl: 'byClue2',
                            permName: '线索处置',
                            permIconUrl: '11',
                        }
                    ]
                }
            ],
            //mapKeys
            { iconClass: 'permIconUrl', path: 'permUrl', name: 'permName', children: 'children' },
            //路由配置数据
            mainRoutes,
        );
    });

