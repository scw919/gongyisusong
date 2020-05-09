import React, { useState, useEffect } from 'react';
// import ZpureComponent from 'zerod/components/ZpureComponent';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart, AscrollContent } = compnents;
// import SearchList from '../ClueDiscovery/Children/SearchList';
import NewDealClue from './NewDealClue';
import RelatedClue from './RelatedClue';
import { Checkbox, message, Pagination } from 'antd';
const CheckboxGroup = Checkbox.Group;
// actions
import { getCollectedClues, getConditions } from '@/store/actions';
// import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
const mapDispatchToProps = (dispatch) => ({//getConditions
    getCollectedClues: (...args) => dispatch(getCollectedClues(...args)),
    getConditions: (...args) => dispatch(getConditions(...args)),

});
let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {
        query: {
            list: [],
            isMyClue: 1,
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            total: 0,
            sortList: [],
        },
        checkedList: [],
        dataList: [

        ],
        sortByFilter: null, //默认筛选时间
        sortByCollect: 'desc', //默认采集时间
        collectClues: [],//已收录的线索
        newVisible: false, //新建处置 弹窗
        relatedVisible: false, //关联线索 弹窗
    }
    componentWillMount() {
        this.props.getConditions({ me: 1 })
    }
    render() {
        const { history, routes } = this.props;
        const { newVisible, relatedVisible, query } = this.state;
        return (
            <AscrollContent scroll={true} ref={ref => this.scroll = ref}>
                <div className="main-rt-div1">
                    <div className="main-rt-div2">
                        <div className="main-rt-container" style={{ height: '100%' }}>
                            {/* <AseamlessScroll /> */}
                            <AsearchPart isMyClue={true} searchResult={this.updateOptions} />
                            <div className="mar-t-20" styleName="search-list">
                                <div className="flex flex-between" styleName="search-list-top">
                                    <div className="primary_self">
                                        <Checkbox
                                            indeterminate={this.state.indeterminate}
                                            onChange={this.onCheckAllChange}
                                            checked={this.state.checkAll}
                                        />
                                        <button className="ant-btn-deep-blue" onClick={() => { this.includeAll() }} style={{ marginLeft: '10px' }}>取消收录</button>
                                        <span styleName="total-counts">共收录{this.state.query.total}个案件</span>
                                    </div>
                                    <div className="flex">
                                        <AsortButton sortType={this.state.sortByFilter} sortName={'筛选时间'} clickEvent={this.changeSortType1} />
                                        <AsortButton sortType={this.state.sortByCollect} sortName={'收录时间'} clickEvent={this.changeSortType2} />
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
                                                            isCollect={true}
                                                            hasChecked={true}
                                                            hasCollected={true}
                                                            toggleModalNew={this.toggleModalNew}
                                                            toggleModalRel={this.toggleModalRel}
                                                            clickEvent={this.handleCollected}>
                                                        </AclueItem>
                                                    )
                                                })
                                            }
                                        </CheckboxGroup >
                                    }

                                </div>
                                <div className="text-right" style={{ marginTop: '10px' }}>
                                    <Pagination size="small" defaultPageSize={10} pageSizeOptions={["5", "10", "15"]} current={query.pageNum} showSizeChanger showQuickJumper total={query.total} onShowSizeChange={this.onShowSizeChange} onChange={this.pageChange} />
                                </div>
                            </div>
                            {/* <SearchList toggleModalNew={this.toggleModalNew} toggleModalRel={this.toggleModalRel} data={this.state.dataList} isCollect={true} history={history} /> */}
                            {/* 新建 线索收录 */}
                            <NewDealClue visible={newVisible} clueName={this.state.clueName} clueID={this.state.clueID} toggleModalNew={this.toggleModalNew} />
                            {/* 关联线索收录 */}
                            <RelatedClue visible={relatedVisible} clueName={this.state.clueName} clueID={this.state.clueID} toggleModalRel={this.toggleModalRel} />
                        </div>
                    </div>
                </div>

            </AscrollContent>
        )
    }
    // 搜索
    clueSearch = async (query) => {
        return apis.main.clueSearch(query).then(res => {
            return res.data;
        }).catch(err => {
            // console.log(err)
        })
    }
    // 子组件 更新搜索条件
    updateOptions = (paramsList) => {
        console.log('updateOptions');
        let newQuery = zTool.deepCopy(this.state.query);
        newQuery.list = paramsList;
        this.setState({
            query: newQuery
        }, () => { this.getData(true) });
        // console.log('loadMore',this.state.query);
    }
    // 获取查询数据
    getData = async (initData) => { //initData true: 初始化第一页 false 页数自加1
        const { sortByCollect, sortByFilter } = this.state;
        let sortList = [
            sortByCollect ? {
                order: sortByCollect,
                sortFiled: "includeTime"
            } : null, sortByFilter ? {
                order: sortByFilter,
                sortFiled: "uniteSortTime"
            } : null].filter((s) => {
                return s;
            });

        let newQuery = zTool.deepCopy(this.state.query);
        newQuery.sortList = sortList;
        if (initData) {
            newQuery.pageNum = 1;
            newQuery.pages = 0;
            newQuery.total = 0;
        }
        const data = await this.clueSearch(newQuery);
        newQuery.pages = data.pages;
        newQuery.total = data.total;
        this.setState({
            query: newQuery,
            dataList: data.list,
            checkAll: false,
            checkedList: [],
            indeterminate: false,
        })
        this.scroll.backToTop()
    }
    // 列表组件 点击 新建 处置线索
    toggleModalNew = (status, sub) => {
        if (sub) {
            this.setState({
                newVisible: status,
                clueName: sub.caseName,
                clueID: sub.id,
            })
        } else {
            this.setState({
                newVisible: status,
            })
        }
    }
    // 列表组件 点击 关联 处置线索
    toggleModalRel = (status, sub) => {
        if (sub) {
            this.setState({
                relatedVisible: status,
                clueName: sub.caseName,
                clueID: sub.id,
            })
        } else {
            this.setState({
                relatedVisible: status,
            })
        }

    }
    // 复选框 勾选
    onChange = newCheckedList => {
        const { dataList, checkedList } = this.state;
        console.log(newCheckedList);
        this.setState({
            checkedList: newCheckedList,
            indeterminate: !!newCheckedList.length && newCheckedList.length < dataList.length,
            checkAll: newCheckedList.length === dataList.length,
        });
    };
    onCheckAllChange = e => {
        const { dataList, checkedList } = this.state;
        this.setState({
            checkedList: e.target.checked ? dataList : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    // 全部取消收录
    includeAll = () => {
        const { checkedList, dataList, query } = this.state;
        let req_query = { flag: false, clueIds: [] }, newQuery = zTool.deepCopy(query);;
        checkedList.map(item => {
            req_query['clueIds'].push(item.id);
        })
        if (req_query['clueIds'].length > 0) {
            apis.main.includedClue(req_query).then(_ => {
                if (checkedList.length >= dataList.length) {
                    if (query.pages > 1) {
                        newQuery.pageNum -= 1;
                    }
                }
                console.log(newQuery, 'newQuery');
                this.props.getCollectedClues();
                this.props.getConditions({ me: 1 });
                // this.props.getCollectedClues().then(action => {
                this.setState({
                    // collectClues: action.payload.collectClues,
                    checkedList: [],
                    indeterminate: false,
                    checkAll: false,
                    query: newQuery
                })
                this.getData();
                // })
            })
        } else {
            message.info('请选择取消收录的线索')
        }
    }
    // 收录 / 取消收录
    handleCollected = (value) => {
        console.log(value);
        this.getData(true);
    }
    // 排序按钮
    changeSortType1 = () => {
        const { sortByFilter } = this.state;
        let type = sortByFilter,
            newType;
        if (type != 'asc') {
            newType = 'asc';
        } else {
            newType = 'desc'
        }
        this.setState({
            sortByFilter: newType,
            sortByCollect: null
        }, () => { this.getData(true) })
    }
    changeSortType2 = () => {
        const { sortByCollect } = this.state;
        let type = sortByCollect,
            newType;
        if (type != 'asc') {
            newType = 'asc';
        } else {
            newType = 'desc'
        }
        this.setState({
            sortByFilter: null,
            sortByCollect: newType
        }, () => { this.getData(true) })
    }
    // 分页
    pageChange = (page, pageSize) => {
        let query = this.state.query;
        query.pageNum = page;
        query.pageSize = pageSize;
        this.setState({
            query: query
        })
        this.getData();
    }
    onShowSizeChange = (current, size) => {
        let query = this.state.query;
        query.pageSize = size;
        this.getData(true);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClueDiscovery));