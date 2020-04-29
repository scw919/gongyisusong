import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Icon, Checkbox, message } from 'antd';
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
import compnents from '@/components/load-components.js';
const { AscrollContent } = compnents;
import { Zlayout } from 'zerod';
import PropTypes from 'prop-types';
// actions
// import { changeCollapsed, changeMenuIndex, setToken } from '@/store/actions';
import './style.scss';
// 工具
import { zTool } from 'zerod';
// 接口
import apis from '@/App.api.js';

const mapStateToProps = (state, ownProps) => ({
    collectClues: state.collectClues,
});

let isLoading = false;
class AddClue extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        collectionID: PropTypes.number,
        toggleModal: PropTypes.func,
        relateClues: PropTypes.array,
    };
    state = {
        visible: this.props.visible,
        collectionID: this.props.collectionID,
        title: '关联处置线索',
        isRelate: true,
        indeterminate: true, //多选框样式设置
        checkAll: false,
        checkedList: [], //已选的线索
        keyword: null, //关键字
        query: {
            isMyClue: 1,
            list: [],
            sortList: [],
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            total: 0,
        },
        dataList: []
    }
    static defaultProps = {
        relateClues: []
    }
    checkedList = [];
    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.visible) {
            console.log(nextProps.relateClues)
            this.setState({
                visible: nextProps.visible,
                relateClues: nextProps.relateClues
            })
            this.getData(true);
        }
    }
    render() {
        console.log(this.props.relateClues, 'addclues relateClues');
        const { visible, loading, title, isRelate, dataList } = this.state;
        return (
            <div>
                <Modal
                    centered={true}
                    styleName="new-deal-box"
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确定
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                    ]}
                >
                    <div styleName="item search">
                        <div>
                            <Search
                                // onInput={(e) => { this.setState({ keyword: e.target.value }); this.getData(true) }}
                                // value={keyword}
                                enterButton
                                onSearch={(value, e) => { this.setState({ keyword: value }, () => { this.getData(true) }); }}
                                placeholder="根据用户输入关键字进行模糊搜索"
                                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </div>
                        <div styleName="search-clue-list">
                            <Zlayout flexRow>
                                <AscrollContent scroll={true} ref_component={this} loadmore={'ref_component'}>
                                    <CheckboxGroup
                                        value={this.state.checkedList}
                                        onChange={this.onChangeSelClue}
                                    >
                                        {
                                            dataList.map((sub, subKey) => {
                                                return (
                                                    <div key={subKey} className="flex" styleName="search-clue-item">
                                                        <Checkbox className="mar-r-5" disabled={sub.checked} value={sub} onChange={this.onChangeSelClue} />
                                                        <div className="flex flex-1">
                                                            <span className="ellipsis" styleName="item-tit" title={sub.caseName}>{sub.caseName}</span>
                                                            <span className="text-right ellipsis" styleName="item-tag" title={this.subLables(sub.lables)}>{this.subLables(sub.lables)}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </CheckboxGroup>
                                </AscrollContent>
                            </Zlayout>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    // 搜索
    clueSearch = async (query) => {
        const { relateClues } = this.props;
        return apis.main.clueSearch(query).then(res => {
            // return res.data;
            let dataList = res.data.list.map(item => {
                relateClues.map(relateItem => {
                    if (item.id == relateItem.id) {
                        item.checked = true;
                        this.checkedList.push(item);
                    }
                })
                return item;
            })
            res.data.list = dataList;
            // console.log(res.data.list);
            return res.data
        }).catch(err => {
            // console.log(err)
        })
    }
    // 滚动获取数据
    getData = async (initData) => { //initData true: 初始化第一页 false 页数自加1
        if (isLoading) {
            return;
        }
        isLoading = true;
        let newQuery = zTool.deepCopy(this.state.query);
        if (this.state.keyword) {
            newQuery.list = [{
                dimension: "keyword",
                paramValue: this.state.keyword
            }]
        } else {
            newQuery.list = []
        }
        if (initData) {
            newQuery.pageNum = 1;
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            this.setState({
                query: newQuery,
                dataList: data.list,
                checkAll: false,
                indeterminate: false,
                checkedList: this.checkedList
            })
            isLoading = false;
        } else {
            newQuery.pageNum += 1;
            // console.log(newQuery.pageNum, newQuery.pages, '222222222222222222222222222222')
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
                dataList: old_dataList,
                checkedList: this.checkedList
            })
            isLoading = false;
        }
    }
    // lables 解析
    subLables = (lables) => {
        let newLables = "";
        if (lables && lables.clueType) {
            // Object.keys(lables).map(key => {
            //     // return <span key={key} className={`tags-self ${sub.lables[key]}`}>{key}</span>
            //     newLables += ` ${key}`
            // })
            newLables = lables.clueType
        }
        return newLables;
    }
    // 改变 所选 线索
    onChangeSelClue = (checkedList) => {
        const { dataList } = this.state;
        console.log(checkedList);
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < dataList.length,
            checkAll: checkedList.length === dataList.length,
        });
    }
    // 确定
    handleOk = () => {
        const { history, relateClues } = this.props;
        const { collectionID, checkedList } = this.state;
        this.setState({ loading: true });
        let data = {
            clueId: [],
            clueCollectionIds: [collectionID],
        },
            relateIds = [];
        relateClues.map(relateItem => {
            relateIds.push(relateItem.id);
        })
        checkedList.map(item => {
            if(relateIds.indexOf(item.id)==-1){
                data['clueId'].push(item.id);
            }
        })
        apis.main.addClueToColl(data).then(res => {
            let query = {
                isMyClue: 1,
                list: [],
                sortList: [],
                pageNum: 1,
                pageSize: 10,
                pages: 1,
                total: 0,
            }
            this.setState({ loading: false, visible: false, dataList: [], query: query });
            this.props.toggleModal(false, checkedList);
            message.success("操作成功");
            // history.go(0);
        })
    };
    // 取消
    handleCancel = () => {
        let query = {
            isMyClue: 1,
            list: [],
            sortList: [],
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            total: 0,
        }
        this.setState({ visible: false, dataList: [], query: query });
        this.props.toggleModal(false);
    };
}
export default connect(mapStateToProps)(AddClue);