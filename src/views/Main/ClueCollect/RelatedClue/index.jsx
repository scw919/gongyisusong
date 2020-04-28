import React from 'react';
import { Modal, Button, Input, Icon, Checkbox, message } from 'antd';
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
import compnents from '@/components/load-components.js';
const { AscrollContent } = compnents;
import { Zlayout } from 'zerod';
import PropTypes from 'prop-types';
import './style.scss';
// 工具
import { zTool } from 'zerod';
// 接口
import apis from '@/App.api.js';
let isLoading = false;

class NewDealClue extends React.PureComponent {
    static propTypes = {
        visible: PropTypes.bool, // 弹窗 状态
        clueID: PropTypes.number, // 收录的线索id
    };
    state = {
        loading: false,
        visible: this.props.visible,
        title: '关联处置线索',
        isRelate: false,
        indeterminate: true, //多选框样式设置
        keyword: null,
        checkedList: [], //已选的线索
        query: {
            collectionName: "",
            current: 1,
            size: 10,
            pages: 1,
            total: 0,
        },
        dataList: [],
        plainOptions: [
            { name: 'apple0', menuid: 0, type: '行政处罚', extend: true },
            { name: 'apple1', menuid: 1, type: '行政处罚', extend: true },
            { name: 'apple2apple2apple2apple2apple2applapple2apple2', menuid: 2, type: '行政处罚', extend: true },
            { name: 'apple0', menuid: 3, type: '行政处罚', extend: true },
        ]
    }
    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                clueID: nextProps.clueID
            })
            this.getData(true);
        }
    }
    render() {
        console.log("related render");
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
                                                        <Checkbox className="mar-r-5" key={subKey} value={sub} onChange={this.onChangeSelClue} />
                                                        <div className="pointer" styleName="extend—item">
                                                            <div onClick={() => { this.toggleExtend(sub) }} className="flex" styleName="extend-item-tit">
                                                                <span styleName="extend-icon">
                                                                    {
                                                                        sub.extend ? (<Icon type="minus" />)
                                                                            : (<Icon type="plus" />)
                                                                    }
                                                                </span>
                                                                <span>{sub.collectionName}</span>
                                                            </div>
                                                            <div styleName={`${sub.extend ? 'extend' : 'collapse'} extend-item-content `}>
                                                                {sub.clues && sub.clues.length ? sub.clues.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="flex flex-between">
                                                                            <div>{item.caseName}</div>
                                                                            <div className="flex-1 ellipsis text-right" styleName="flag">
                                                                                {item.clueType.desc}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : null}
                                                            </div>
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


    // 切换是否需要关联
    onChangeRadio = e => {
        this.setState({
            isRelate: e.target.value,
        });
    };
    // 搜索
    clueSearch = async (query) => {
        return apis.main.getRelations(query).then(res => {
            res.data.respVOs.forEach(item => {
                item.extend = false;
            })
            return res.data;
        }).catch(err => {
            // console.log(err)
        })
    }
    // 滚动获取数据
    getData = async (initData) => { //initData true: 初始化第一页 false 页数自加1
        console.log(isLoading, '加载中')
        if (isLoading) {
            return;
        }
        isLoading = true;
        let newQuery = zTool.deepCopy(this.state.query);
        if (this.state.keyword) {
            newQuery.collectionName = this.state.keyword;
        } else {
            newQuery.collectionName = "";
        }
        if (initData) {
            newQuery.current = 1;
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            this.setState({
                query: newQuery,
                dataList: data.respVOs,
                checkAll: false,
                checkedList: [],
                indeterminate: false,
            })
            isLoading = false;
        } else {
            newQuery.current += 1;
            console.log(newQuery.pageNum, newQuery.pages, '222222222222222222222222222222')
            if (newQuery.current > newQuery.pages) {
                isLoading = false;
                return false;
            }
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            let old_dataList = this.state.dataList;
            old_dataList = old_dataList.concat(data.respVOs);
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
        const { plainOptions } = this.state;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    }
    // 展开 收起
    toggleExtend = (item) => {
        console.log(item);
        const { dataList } = this.state;
        let newDataList = dataList.map(item_1 => {
            if (item_1.id == item.id) {
                item_1.extend = !item_1.extend;
            }
            return item_1
        })
        this.setState({
            dataList: newDataList
        })

    }
    // 确定
    handleOk = () => {
        const { clueID, checkedList } = this.state;
        this.setState({ loading: true });
        let data = {
            clueCollectionIds: [],
            clueId: [clueID],
        }
        checkedList.map(item => {
            data['clueCollectionIds'].push(item.id);
        })
        apis.main.addClueToColl(data).then(res => {
            this.setState({
                loading: false,
                visible: false,
                keyword: ""
            });
            this.props.toggleModalRel(false);
            message.success("操作成功");
        })
    };
    // 取消
    handleCancel = () => {
        this.setState({
            visible: false,
            keyword: ""
        });
        this.props.toggleModalRel(false);
    };
}
export default NewDealClue;