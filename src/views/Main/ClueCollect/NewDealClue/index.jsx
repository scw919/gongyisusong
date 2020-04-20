import React from 'react';
import { Modal, Button, Input, Radio, Icon, Checkbox, message } from 'antd';
const { Search } = Input;
const CheckboxGroup = Checkbox.Group;
import { Zlayout } from 'zerod';
import PropTypes from 'prop-types';
import './style.scss';
// 工具
import { zTool } from 'zerod';
// 接口
import apis from '@/App.api.js';
let isLoading = false;
const plainOptions = [
    { name: 'apple0', menuid: 0, type: '行政处罚' },
    { name: 'apple1', menuid: 1, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2apple2applapple2apple2', menuid: 2, type: '行政处罚' },
    { name: 'apple0', menuid: 3, type: '行政处罚' },
    { name: 'apple1', menuid: 4, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2e2apple2apple2apple2', menuid: 5, type: '行政处罚' },
    { name: 'apple0', menuid: 6, type: '行政处罚' },
    { name: 'apple1', menuid: 7, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2apple2apple2apple2', menuid: 8, type: '行政处罚' },
    { name: 'apple0', menuid: 9, type: '行政处罚' },
    { name: 'apple1', menuid: 10, type: '行政处罚' },
    { name: 'apple2apple2appleppapple2apple2apple2apple2apple2', menuid: 11, type: '行政处罚' },
];
class NewDealClue extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        clueName: PropTypes.string,
        clueID: PropTypes.number,
    };
    state = {
        loading: false,
        visible: this.props.visible,
        title: '新建处置线索',
        isRelate: true,
        indeterminate: true, //多选框样式设置
        checkAll: false,
        checkedList: [], //已选的线索
        clueName: this.props.clueName,//线索名称
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
    componentWillReceiveProps(props, nextProps) {
        this.setState({
            visible: props.visible,
            clueName: props.clueName
        })
        this.getData(true);
    }
    componentDidMount() {
        // this.getData(true)
    }
    render() {
        const { visible, loading, title, isRelate, dataList, keyword, clueName } = this.state;
        console.log(dataList);
        return (
            <div>
                <Modal
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
                    <div className="flex align-item-center" styleName="clue-name item">
                        <span styleName="left">线索名称：</span>
                        <Input onChange={(e) => { this.setState({ clueName: e.target.value }) }} value={clueName} onBlur={this.checkCollectionName} styleName="right" placeholder="支持回填" />
                    </div>
                    <div className="flex align-item-center" styleName="item">
                        <span className="mar-r-10" styleName="left">是否需要关联其他线索：</span>
                        <Radio.Group onChange={this.onChangeRadio} value={isRelate}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </div>
                    {
                        isRelate ? (
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
                                        <Zlayout.Zbody scroll={true} loadMore={this.getData}>
                                            <CheckboxGroup
                                                value={this.state.checkedList}
                                                onChange={this.onChangeSelClue}
                                            >
                                                {
                                                    dataList.map((sub, subKey) => {
                                                        return (
                                                            <div key={subKey} className="flex" styleName="search-clue-item">
                                                                <Checkbox value={sub} onChange={this.onChangeSelClue} />
                                                                <div className="flex" styleName="clue-name">
                                                                    <div className="ellipsis" title={sub.caseName}>{sub.caseName}</div>
                                                                    <div className="flex-1 text-right ellipsis" title={this.subLables(sub.lables)}>
                                                                        {
                                                                           this.subLables(sub.lables)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </CheckboxGroup>
                                        </Zlayout.Zbody>
                                    </Zlayout>
                                </div>
                            </div>
                        ) : null
                    }

                </Modal>
            </div>
        );
    }
    // 集合名称查重
    checkCollectionName = e => {
        let value = e.target.value,
            query = { name: value };
        if (!value) {
            return;
        }
        apis.main.checkCollectionName(query).then(res => {
            if (res.code == 0) {
                return true;
            } else {
                message.warning('线索名称已存在，请重新输入');
                this.setState({
                    clueName: null
                });
            }
        });
    }
    // 切换是否需要关联
    onChangeRadio = e => {
        let value = e.target.value;
        this.setState({
            isRelate: value,
        });
    };
    // 搜索
    clueSearch = async (query) => {
        return apis.main.clueSearch(query).then(res => {
            return res.data;
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
                checkedList: [],
                indeterminate: false,
            })
            isLoading = false;
        } else {
            newQuery.pageNum += 1;
            console.log(newQuery.pageNum, newQuery.pages, '222222222222222222222222222222')
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
    // lables 解析
    subLables = (lables) => {
        let newLables = "";
        if (lables) {
            Object.keys(lables).map(key => {
                // return <span key={key} className={`tags-self ${sub.lables[key]}`}>{key}</span>
                newLables += ` ${key}`
            })
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
        const { checkedList } = this.state;
        let data = {
            collectionName: this.state.clueName,
            ids: [this.props.clueID]
        }
        checkedList.map(item => {
            data['ids'].push(item.id);
        })
        apis.main.saveCollect(data).then(res => {
            let query = {
                isMyClue: 1,
                list: [],
                sortList: [],
                pageNum: 1,
                pageSize: 10,
                pages: 1,
                total: 0,
            }
            this.setState({ loading: false, dataList: [], query: query });
            this.props.toggleModalNew(false);
            message.info("新建成功");
        })
    };
    // 取消
    handleCancel = () => {
        let query = {
            list: [],
            sortList: [],
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            total: 0,
        }
        this.setState({ visible: false, dataList: [], query: query });
        this.props.toggleModalNew(false);
    };
}
export default NewDealClue;