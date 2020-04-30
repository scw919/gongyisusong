import React from 'react';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart, AscrollContent } = compnents;
// import SearchList from './Children/SearchList';
import { Checkbox, message } from 'antd';
const CheckboxGroup = Checkbox.Group;
// actions
import { getCollectedClues, getConditions } from '@/store/actions';
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
        collapsed: state.collapsed,
        collectClues: state.collectClues,
    });
const mapDispatchToProps = (dispatch) => ({
    getCollectedClues: (...args) => dispatch(getCollectedClues(...args)),
    getConditions: (...args) => dispatch(getConditions(...args)),
});
let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {
        query: {
            list: [],
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            total: 0,
            sortList: []
        },
        checkedList: [],
        dataList: [

        ],
        sortByFilter: '', //默认筛选时间
        sortByCollect: '', //默认采集时间
        collectClues: this.props.collectClues,//已收录的线索
    }
    // componentDidMount() {
    //     this.props.getCollectedClues().then(action => {
    //         // console.log(action.payload.collectClues);
    //         // this.collectClues = action.payload.collectClues;
    //         this.setState({
    //             collectClues: action.payload.collectClues
    //         })
    //     });
    // }
    componentWillUnmount() {
        this.setState = () => false;
    }
    render() {
        const { history } = this.props;
        const { dataList, } = this.state;
        return (
            <div>
                <AscrollContent scroll={true} ref_component={this} loadmore={'ref_component'}>
                    <div className="main-rt-div1">
                        <div className="main-rt-div2">
                            <div className="main-rt-container">
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
                                            <button className="ant-btn-deep-blue" onClick={() => { this.includeAll() }} style={{ marginLeft: '10px' }}>批量收录</button>
                                            <span styleName="total-counts">共找到{this.state.query.total}个结果</span>
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
                                                                hasCollected={this.hasCollected(sub.id)}
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
                        </div>
                    </div>
                </AscrollContent>
            </div>

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
        const { sortByCollect, sortByFilter } = this.state;
        let sortList = [
            sortByCollect ? {
                order: sortByCollect,
                sortFiled: "createdTime"
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
            isLoading = false;
        } else {
            newQuery.pageNum += 1;
            if (newQuery.pageNum > newQuery.pages) {
                isLoading = false;
                return false;
            }
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            let old_dataList = this.state.dataList;
            old_dataList = old_dataList.concat(data.list);
            this.setState({
                query: newQuery,
                dataList: old_dataList
            })
            isLoading = false;
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
    // 全部收录
    includeAll = () => {
        const { getConditions } = this.props;
        const { checkedList } = this.state;
        let query = { flag: true, clueIds: [] };
        checkedList.map(item => {
            query['clueIds'].push(item.id);
        })
        if (query['clueIds'].length > 0) {
            apis.main.includedClue(query).then(_ => {
                this.props.getCollectedClues().then(action => {
                    this.setState({
                        // collectClues: action.payload.collectClues,
                        checkedList: [],
                        indeterminate: false,
                        checkAll: false,
                    })
                    getConditions({ me: 1 });
                })
            })
        } else {
            message.info('请选择需要收录的线索')
        }
    }
    // 重置复选框
    resetCheckAll = () => {
        this.setState({
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        })
    }
    // 判断是否收录
    hasCollected = (id) => {
        const { collectClues } = this.props;
        // console.log(collectClues);
        return collectClues.indexOf(id) > -1;
    }
    // 收录 / 取消收录
    handleCollected = (value) => {
        console.log(value)
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
}
export default connect(mapStateToProps, mapDispatchToProps)(ClueDiscovery);