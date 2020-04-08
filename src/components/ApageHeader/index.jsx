import React from 'react';
import { connect } from 'react-redux';
// zerod
import { Zlayout, ZmainHOC } from 'zerod';
// actions
import { changeCollapsed } from '@/store/actions';
import { Link } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
import { Icon, Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import cssClass from './style.scss';
// img
import logo from '@/assets/images/logo@2x.png';
import avator from '@/assets/images/procurator.png';

function itemRender(route, params, routes, paths) {
    return !route.link ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
}
const mapStateToProps = (state, ownProps) => ({
    userName: state.userName,
    collapsed: state.collapsed
});
const mapDispatchToProps = (dispatch) => ({
    changeCollapsed: (...args) => dispatch(changeCollapsed(...args)),
});

class ApageHeader extends React.Component {
    static propTypes = {
        activeIndex: PropTypes.number,
        history: PropTypes.any
    };
    render() {
        const { history, userName, collapsed } = this.props;
        const mb = 'bottom-16';
        return (
            <Zlayout.Zheader style={{ backgroundColor: '#14305A' }}>
                <div className="z-flex-space-between" style={{ height: '100%' }}>
                    <div className="z-flex-items-center">
                        <Logo />
                        <Zlayout.Template>
                            {/* <Button type="link" onClick={() => { this.linkTo('/main/home'); }}>Link</Button> */}
                            <Zlayout.ZheaderBtn styleName={userName === 1 ? 'head-btn active' : 'head-btn'}>首页</Zlayout.ZheaderBtn>
                            <Zlayout.ZheaderBtn styleName={userName === 2 ? 'head-btn active' : 'head-btn'}>线索管理</Zlayout.ZheaderBtn>
                            <Zlayout.ZheaderBtn styleName={userName === 3 ? 'head-btn active' : 'head-btn'}>参考案例</Zlayout.ZheaderBtn>
                            <Zlayout.ZheaderBtn styleName={userName === 3 ? 'head-btn active' : 'head-btn'}>系统管理</Zlayout.ZheaderBtn>
                        </Zlayout.Template>
                    </div>
                    <div><UserDropdown /></div>
                </div>
            </Zlayout.Zheader >
        );
    }
    linkTo(path) {
        this.props.history.push(path);
    }
    toggleCollapsed = () => {
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
        this.props.changeCollapsed(!this.props.collapsed);
    };
}
class UserDropdown extends React.Component {
    render() {
        return (
            <Dropdown className='z-drop-down' overlay={this.dropdownMenu} trigger={['click']} placement="bottomRight">
                <Zlayout.ZheaderBtn className="z-margin-right-15">
                    <span className="z-icon-circle z-margin-right-8 head-avator">
                        <img src={avator} alt=""/>
                    </span>
                    <span className={cssClass['z-my-class']}>用户名</span>
                </Zlayout.ZheaderBtn>
            </Dropdown>
        );
    }
    methods = {
        //用户dropdown按钮点击触发
        onMenuClick: (item) => {
            if (item.key === '/logout') {
                window.open('/main/home');
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
            <Menu.Item disabled>
                <Icon type="user" />
                个人中心
            </Menu.Item>
            <Menu.Item disabled>
                <Icon type="setting" />
                设置
            </Menu.Item>
            <Menu.Divider />
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
