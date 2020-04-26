// react
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import moment from 'moment';
// zerod
import { Zlayout, ZmainHOC } from 'zerod';
// import GlobalLoading from 'zerod/lazyLoad/Loading.jsx';
// actions
import { getIndexData_part_1, getIndexData_part_2 } from '@/store/actions';
// 路由组件
import mainRoutes from './load-child-routes.js';
// console.log(mainRoutes);
import compnents from '@/components/load-components.js';
const { ApageHeader, } = compnents;
// ant ui
import { Breadcrumb, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
// import { createFromIconfontCN } from '@ant-design/icons';
import commonMethods from '@/zTool/commonMethods.js';
const { matchUrlToMenu } = commonMethods;
// 接口
import apis from '@/App.api.js';
// const { getFirstSurvey } = indexApi;
// 样式类
import './style.scss';

// import { withRouter } from 'react-router-dom';
// import mainRoutes from '@/Main/load-child-routes.js';

const dateFormat = 'YYYY/MM/DD hh:mm:ss';

const mapStateToProps = (state, ownProps) => ({
    collapsed: state.collapsed,
    menuIndex: state.mmenuIndex,
    part_2_tabs: state.part_2_tabs,
});
const mapDispatchToProps = (dispatch) => ({
    getIndexData_part_1: (...args) => dispatch(getIndexData_part_1(...args)),
    getIndexData_part_2: (...args) => dispatch(getIndexData_part_2(...args)),
});

class Main extends React.Component {
    match = matchPath(this.props.location.pathname, {
        path: this.props.routePath
    });
    query = {
        startTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
    componentDidMount() {
        matchUrlToMenu(this.match);
        this.getData();
    }
    render() {
        const { history, collapsed, menuIndex } = this.props;
        const mainBody = this.props.getMaimRouteTemplate();
        //自定义主页布局，经过ZmainHOC包装的组件，会this.props.getSideMenuTemplate和this.props.getMaimRouteTemplate两个方法
        return (
            <Zlayout>
                <ApageHeader history={history} />
                <Zlayout.Zbody scroll={false} className="layout-container">
                    <div className="" style={{ position: 'fixed', top: "22px", left: '40px', color: 'red', zIndex: 100000000 }}>定位元素</div>
                    <Zlayout flexRow >
                        <Zlayout.Zheader>
                            <div style={{ width: '100%', height: '100%' }} className="flex flex-between align-item-center">
                                <Breadcrumb className="ft-16">
                                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{ width: '400px' }} className="align-right flex align-item-center">
                                    <div style={{ width: '90px' }}>选择日期：</div>
                                    <RangePicker
                                        style={{ width: '300px' }}
                                        defaultValue={[moment(this.query.startTime, dateFormat), moment(this.query.endTime, dateFormat)]}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                        }}
                                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        onChange={this.onChange}
                                        onOk={this.onOk}
                                    />
                                </div>
                            </div>
                        </Zlayout.Zheader>
                        <Zlayout.Zbody>
                            <Zlayout flexRow>
                                <Zlayout className="main-container">{mainBody}</Zlayout>
                            </Zlayout>
                        </Zlayout.Zbody>
                    </Zlayout>
                </Zlayout.Zbody>
            </Zlayout>
        );
    }
    // getData
    getData = () => {
        const { getIndexData_part_1, getIndexData_part_2 } = this.props;
        let query_part_2 = Object.assign({}, this.query);
        // console.log(this.query,query_part_2);
        try {
            apis.index.getFirstSurvey(this.query).then(res => { // part-1
                //axios返回的数据是用response.data包括的，和jquery不一样
                // console.log(res.data);
                getIndexData_part_1(res.data);
            })
            apis.index.getEachSituation(query_part_2).then(res => { // part-2
                //axios返回的数据是用response.data包括的，和jquery不一样
                // console.log(res.data);
                getIndexData_part_2(res.data);
            })
        } catch (error) {
            console.log('error: ', error)
        }
    }
    onChange = (date, dateString) => {
        this.query = {
            startTime: dateString[0],
            endTime: dateString[1],
        }
    }
    onOk = () => {
        this.getData();
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

            ],
            //mapKeys
            { iconClass: 'permIconUrl', path: 'permUrl', name: 'permName', children: 'children' },
            //路由配置数据
            mainRoutes,
        );
    });

