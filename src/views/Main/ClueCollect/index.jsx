import React, { useState, useEffect } from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart } = compnents;
// import SearchList from '../ClueDiscovery/Children/SearchList';
import NewDealClue from './NewDealClue';
import RelatedClue from './RelatedClue';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

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
        checkedList: [],
        dataList: [
            { menuid: 1 },
            { menuid: 2 },
            { menuid: 3 },
            { menuid: 4 },
            { menuid: 5 },
        ],
        newVisible: false, //新建处置 弹窗
        relatedVisible: false, //关联线索 弹窗
    }
    render() {
        const { history, routes } = this.props;
        const { newVisible, relatedVisible } = this.state;
        console.log(this.props, 'clueCollect')
        return (
            <Zlayout.Zbody scroll={true} loadMore={this.getData}>
                <div className="main-rt-container" style={{ height: '100%' }}>
                    {/* <AseamlessScroll /> */}
                    <AsearchPart searchResult={this.updateOptions} />
                    <div className="mar-t-20" styleName="search-list">
                        <div className="flex flex-between" styleName="search-list-top">
                            <div className="primary_self">
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                />
                                <span type="button" style={{ marginLeft: '10px' }}>取消收录</span>
                                <span styleName="total-counts">共收录1313413个文件</span>
                            </div>
                            <div className="flex">
                                <AsortButton sortType={this.state.sortByFilter} sortName={'筛选时间'} clickEvent={this.changeSortType1} />
                                <AsortButton sortType={this.state.sortByCollect} sortName={'采集时间'} clickEvent={this.changeSortType2} />
                            </div>
                        </div>
                        <div styleName="search-list-results">
                            {
                                <CheckboxGroup value={this.state.checkedList} onChange={this.onChange}>
                                    {
                                        this.state.dataList.map((sub, subKey) => {
                                            return (
                                                <AclueItem
                                                    history={history}
                                                    key={subKey}
                                                    sub={sub}
                                                    hasChecked={true}
                                                    toggleModalNew={this.toggleModalNew}
                                                    toggleModalRel={this.toggleModalRel}
                                                    isCollect={true}
                                                    clickEvent={this.handleCollected}>
                                                </AclueItem>
                                            )
                                        })
                                    }
                                </CheckboxGroup >
                            }

                        </div>
                    </div>
                    {/* <SearchList toggleModalNew={this.toggleModalNew} toggleModalRel={this.toggleModalRel} data={this.state.dataList} isCollect={true} history={history} /> */}
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
    // 复选框 勾选
    onChange = newCheckedList => {
        const { dataList, checkedList } = this.state;
        console.log(newCheckedList);
        this.setState({
            checkedList: newCheckedList,
            indeterminate: !!newCheckedList.length && newCheckedList.length < dataList.length,
            checkAll: newCheckedList.length === dataList.length,
        }, () => { console.log(checkedList) });
    };
    onCheckAllChange = e => {
        const { dataList, checkedList } = this.state;
        this.setState({
            checkedList: e.target.checked ? dataList : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    // 收录 / 取消收录
    handleCollected = (value) => {
        console.log(value)
    }
    // 排序按钮
    changeSortType1 = () => {
        const { sortByFilter } = this.state;
        let type = sortByFilter,
            newType;
        if (type != 1) {
            newType = 1;
        } else {
            newType = 2
        }
        this.setState({
            sortByFilter: newType
        })
    }
    changeSortType2 = () => {
        const { sortByCollect } = this.state;
        let type = sortByCollect,
            newType;
        if (type != 1) {
            newType = 1;
        } else {
            newType = 2
        }
        this.setState({
            sortByCollect: newType
        })
    }
}
export default connect(mapStateToProps)(withRouter(ClueDiscovery));