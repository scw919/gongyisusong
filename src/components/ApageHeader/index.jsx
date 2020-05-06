import React from 'react';
import { connect } from 'react-redux';
// zerod
import { Zlayout } from 'zerod';
// actions
import { changeCollapsed, changeMenuIndex, setToken } from '@/store/actions';
// import { Link } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
import { Icon, Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import cssClass from './style.scss';
// img
import logo from '@/assets/images/logo@2x.png';
import avator from '@/assets/images/procurator.png';

const mapStateToProps = (state, ownProps) => ({
    menuIndex: state.menuIndex,
    collapsed: state.collapsed,
});
const mapDispatchToProps = (dispatch) => ({
    changeCollapsed: (...args) => dispatch(changeCollapsed(...args)),
    changeMenuIndex: (...args) => dispatch(changeMenuIndex(...args)),
    setToken: (...args) => dispatch(setToken(...args)),
});
class ApageHeader extends React.Component {
    static propTypes = {
        activeIndex: PropTypes.number,
        history: PropTypes.any
    };
    menuItems = [
        { name: '首页', index: 0, path: '/index' },
        { name: '线索管理', index: 1, path: '/main' },
        // { name: '系统管理', index: 2, path: '/sys' },
        // { name: '参考案例', index: 2, path: '' },
        // { name: '系统管理', index: 3, path: '' },
    ]
    render() {
        const { menuIndex } = this.props;
        return (
            <Zlayout.Zheader style={{ backgroundColor: '#14305A' }}>
                <div className="z-flex-space-between" style={{ height: '100%' }}>
                    <div className="z-flex-items-center">
                        <Logo />
                        <Zlayout.Template>
                            {
                                this.menuItems.map((menu, index) => {
                                    return (
                                        <Zlayout.ZheaderBtn key={index} onClick={() => { this.linkTo(menu) }} styleName={menuIndex === menu.index ? 'head-btn active' : 'head-btn'}>{menu.name}</Zlayout.ZheaderBtn>
                                    )
                                })
                            }
                        </Zlayout.Template>
                    </div>
                    <div><UserDropdown setToken={this.props.setToken} /></div>
                </div>
            </Zlayout.Zheader >
        );
    }
    linkTo = (menu) => {
        const { changeMenuIndex, history } = this.props;
        changeMenuIndex(menu.index);
        history.push(menu.path);
    }
    toggleCollapsed = () => {
        const { changeCollapsed } = this.props;
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
        changeCollapsed(!this.props.collapsed);
    };
}
class UserDropdown extends React.Component {
    state = {
        userInfo: {}
    }
    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.setState({
            userInfo: userInfo
        })
    }
    render() {
        const { userInfo } = this.state;
        return (
            <Dropdown className='z-drop-down' overlay={this.dropdownMenu} trigger={['click']} placement="bottomRight">
                <Zlayout.ZheaderBtn className="z-margin-right-15">
                    <span className="z-icon-circle z-margin-right-8 head-avator">
                        <img src={avator} alt="" />
                    </span>
                    <span className={cssClass['z-my-class']}>{userInfo && userInfo.account || '未登录'}</span>
                </Zlayout.ZheaderBtn>
            </Dropdown>
        );
    }
    methods = {
        //用户dropdown按钮点击触发
        onMenuClick: (item) => {
            if (item.key === '/logout') {
                localStorage.removeItem('userInfo');
                this.props.setToken(null);
                window.location.assign('/login');
                // window.open('/main/home'); //打开新的页面
                // window.location.assign('http://www.runoob.com');
            }
        },
    };

    dropdownMenu = (
        <Menu
            className={cssClass['z-main-user-menu']}
            selectedKeys={[]}
            onClick={this.methods.onMenuClick && this.methods.onMenuClick}
        >
            {/* <Menu.Item disabled>
                <Icon type="user" />
                个人中心
            </Menu.Item>
            <Menu.Item disabled>
                <Icon type="setting" />
                设置
            </Menu.Item>
            <Menu.Divider /> */}
            <Menu.Item key="/logout">
                <Icon type="logout" />
                退出登录
            </Menu.Item>
        </Menu>
    );
}
class Logo extends React.Component {
    static propTypes = {
        getLogoMethods: PropTypes.func,
    };

    state = {
        showTitle: false,
    };

    componentDidMount() {
        this.props.getLogoMethods &&
            this.props.getLogoMethods({
                toggleTitle: this.toggleTitle,
            });
    }

    render() {
        return (
            <div className={`z-flex-items-v-center ${cssClass['z-index-logo']}`} style={{ height: '100%' }}>
                <img src={logo} alt="" width="434" height="auto" className="z-margin-left-24" />
                {this.state.showTitle ? (
                    <span className="z-margin-left-12 z-font-size-20" style={{ fontWeight: 600 }}>
                        <i className={cssClass['z-own']}>公益诉讼</i>
                    </span>
                ) : null}
            </div>
        );
    }
    toggleTitle = (show) => {
        this.setState({
            showTitle: show,
        });
    };
}
export default {
    name: 'ApageHeader',
    component: connect(mapStateToProps, mapDispatchToProps)(ApageHeader),
};
