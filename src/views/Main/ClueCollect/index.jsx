import React, { useState, useEffect } from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
// import compnents from '@/components/load-components.js';
// const { AseamlessScroll } = compnents;
import SearchPart from '../ClueDiscovery/Children/SearchPart';
import SearchList from '../ClueDiscovery/Children/SearchList';
import NewDealClue from './NewDealClue';
import RelatedClue from './RelatedClue';
import { Input, Tag, Icon, Button } from 'antd';
const { Search } = Input;

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// 样式类
import './style.scss';
// 通用工具
import { zTool } from "zerod";

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });
const dataList = [
    { menuid: 1, name: 'Apple' },
    { menuid: 2, name: 'pear' },
    { menuid: 3, name: 'Orange' },
    { menuid: 4, name: 'Orange2' },
    { menuid: 5, name: 'Orange3' },
]
let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {
        pageSet: {
            pageSize: 10,
            total: 100,
            pageNum: 1,
            hasNext: true,
        },
        query: {

        },
        dataList: [
            { menuid: 1, name: 'Apple' },
            { menuid: 2, name: 'pear' },
            { menuid: 3, name: 'Orange' },
            { menuid: 4, name: 'Orange2' },
            { menuid: 5, name: 'Orange3' },
        ],
        newVisible: false, //新建处置 弹窗
        relatedVisible: false, //关联线索 弹窗
    }
    render() {
        const { history } = this.props;
        const { newVisible, relatedVisible } = this.state;
        return (
            <Zlayout.Zbody scroll={true} loadMore={this.getData}>
                <div className="main-rt-container" style={{ height: '100%' }}>
                    {/* <AseamlessScroll /> */}
                    <SearchPart searchResult={this.updateOptions} />
                    <SearchList toggleModalNew={this.toggleModalNew} toggleModalRel={this.toggleModalRel} data={this.state.dataList} isCollect={true} history={history}/>
                    {/* 新建 线索收录 */}
                    <NewDealClue visible={newVisible} toggleModalNew={this.toggleModalNew} />
                    {/* 关联线索收录 */}
                    <RelatedClue visible={relatedVisible} toggleModalRel={this.toggleModalRel} />
                </div>
            </Zlayout.Zbody>
        )
    }
    // 子组件 更新搜索条件
    updateOptions = (options) => {
        this.state.query = options;
        this.setState({
            query: options
        }, () => { this.getData(true) });
        // console.log('loadMore',this.state.query);
    }
    // 获取查询数据
    getData = (initData) => { //initData true: 初始化第一页 false 页数自加1
        if (isLoading) {
            return;
        }
        isLoading = true;
        let newQuery = zTool.deepCopy(this.state);
        if (initData) {
            // 
            this.setState({
                dataList: [
                    { menuid: 1, name: 'Apple' },
                    { menuid: 2, name: 'pear' },
                    { menuid: 3, name: 'Orange' },
                    { menuid: 4, name: 'Orange2' },
                    { menuid: 5, name: 'Orange3' },
                ]
            });
            isLoading = false;
        } else {
            let pageSet = this.state.pageSet;
            pageSet.pageNum += 1;
            this.setState({
                pageSet: pageSet
            });
            newQuery.pageSet.pageNum += 1;
            let dataList = this.state.dataList;
            let dataItem = zTool.deepCopy(dataList[dataList.length - 1]);
            dataItem.menuid = dataItem.menuid + 1;
            dataList.push(dataItem);
            this.setState({
                dataList: dataList
            });
            isLoading = false;
        }
        // 请求数据 
        console.log(this.state);
    }
    // 列表组件 点击 新建 处置线索
    toggleModalNew = (status) => {
        this.setState(
            {
                newVisible: status
            }, () => {
                console.log(this.state)
            }
        );

    }
    // 列表组件 点击 关联 处置线索
    toggleModalRel = (status) => {
        this.setState(
            {
                relatedVisible: status
            }, () => {
                console.log(this.state)
            }
        );

    }
}
export default connect(mapStateToProps)(withRouter(ClueDiscovery));