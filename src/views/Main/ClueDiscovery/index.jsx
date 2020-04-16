import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart } = compnents;
// import SearchList from './Children/SearchList';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
// 样式类
import './style.scss';
// 通用工具
import { zTool } from "zerod";
// 接口
import apis from '@/App.api.js';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });
let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {
        query: {
            list: [],
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            sortList: []
        },
        checkedList: [],
        dataList: [
            { menuid: 1 },
            { menuid: 2 },
            { menuid: 3 },
            { menuid: 4 },
            { menuid: 5 },
        ]
    }
    render() {
        const { history } = this.props;
        const { dataList } = this.state;
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
                                <span type="button" style={{ marginLeft: '10px' }}>全部收录</span>
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
                                        dataList && dataList.length > 0 ? dataList.map((sub, subKey) => {
                                            return (
                                                <AclueItem
                                                    history={history}
                                                    key={subKey}
                                                    sub={sub}
                                                    hasChecked={true}
                                                    clickEvent={this.handleCollected}>
                                                </AclueItem>
                                            )
                                        }) : null
                                    }
                                </CheckboxGroup >
                            }

                        </div>
                    </div>
                    {/* <SearchList data={this.state.dataList} history={history} /> */}
                </div>
            </Zlayout.Zbody>
        )
    }
    // 搜索
    clueSearch = async (query) => {
        return apis.main.clueSearch(query).then(res => {
            console.log(res.data);
            let newQuery = zTool.deepCopy(this.state.query);
            newQuery.pages = res.data.pages;
            newQuery.total = res.data.total;
            this.setState({
                query: newQuery
            })
            return res.data.list;
        }).catch(err => {
            console.log(err)
        })
    }
    // 子组件 更新搜索条件
    updateOptions = (paramsList) => {
        let newQuery = zTool.deepCopy(this.state.query);
        newQuery.list = paramsList;
        this.setState({
            query: newQuery
        }, () => { this.getData(true) });
        // console.log('loadMore',this.state.query);
    }
    // 获取查询数据
    getData = async (initData) => { //initData true: 初始化第一页 false 页数自加1
        if (isLoading) {
            return;
        }
        isLoading = true;
        let newQuery = zTool.deepCopy(this.state.query);
        if (initData) {
            const dataList = await this.clueSearch(newQuery);
            this.setState({
                dataList: dataList
            })
            isLoading = false;
        } else {
            let query = this.state.query;
            query.pageNum += 1;
            this.setState({
                query: query
            });
            newQuery.pageNum += 1;
            const dataList = await this.clueSearch(newQuery);
            let old_dataList = this.state.dataList;
            old_dataList.concat(dataList);
            this.setState({
                dataList: old_dataList
            })
            isLoading = false;
        }
        // 请求数据 
        console.log(this.state.dataList);
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
export default connect(mapStateToProps)(ClueDiscovery);