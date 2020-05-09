import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Icon, Input, Checkbox, Button, Radio, Tree, message } from 'antd';
const { TreeNode } = Tree;
const { Search } = Input;
import { AscrollContent } from '../AscrollContent';
import { Zlayout, zTool } from 'zerod';
import './style.scss';
import apis from '@/App.api.js';
import store from '@/store';
import { } from '@/store/actions';

const unique = (arr) => {
    let res = new Map();
    return arr.filter(item => !res.has(item.id) && res.set(item.id, 1))
}
let isLoadingClue = false,
    isLoadingCollection = false;
// //at.alicdn.com/t/font_1740380_epha2kuvmm.js
export class Atransfer extends React.PureComponent {
    static propTypes = {
        layout: PropTypes.string,
        width: PropTypes.string,
        newCollect: PropTypes.bool,
        clues: PropTypes.array,
    };
    static defaultProps = {
        layout: 'left',
        width: '1080px',
        clues: [{
            "id": 61409,
            "caseName": "广州市曾本五金工业有限公司行政处罚案件",
            "addressConcerned": "海珠区",
            "partyName": null,
            "timeLabel": "处罚决定日期",
            "showDateTime": "2018-08-28",
            "createdTime": "2020-04-25",
            "includeTime": null,
            "lables": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" },
            "highlightResult": { "highlightCaseName": null, "highlightAddressConcerned": null }
        },]
    }
    state = {
        type: 2, //0-新建  1-关联  2-直接办理
        caseType: 0, //0-民事公益诉讼  1-行政公益诉讼
        clueKeyword: '', //搜索线索关键字
        collectKeyword: '', //搜索集合关键字
    }
    queryClue = { // 关联线索查询
        list: [],
        isMyClue: 1,
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 0,
        sortList: []
    }
    queryCollection = { // 关联集合查询
        collectionName: "",
        current: 1,
        size: 10,
        pages: 1,
        total: 0,
    }
    clues = [ // 关联线索

    ]
    collections = [ //关联集合

    ]
    queryDealCollection = { // 直接办理集合查询
        collectionName: "",
        current: 1,
        size: 10,
        pages: 1,
        total: 0,
    }
    collectionsDeal = [] //直接办理集合
    newCollection = { //创建新集合
        isEditable: true,
        isEditing: false,
        id: 0,
        defaultCollectionName: '自定义线索集',
        collectionName: '自定义线索集',
        clues: []
    };
    newCheckedCluesDeleteKeys = [0];

    checkedCollections = [];
    checkedCluesAdd = [];
    checkedCluesDelete = [];
    checkedCluesDeleteKeys = [

    ];
    componentWillMount() {
        // this.getClueData(true);
        this.clues = this.props.clues;
        this.collections.map(item => {
            this.checkedCluesDeleteKeys[item.id] = []
        })
    }
    render() {
        console.log('render');
        const { layout, width } = this.props;
        const { type } = this.state;
        const radioStyle = layout == 'left' ? {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            margin: '0 0 15px 0',
            width: '125px',
            textAlign: 'center',
            borderRadius: '5px',
        } : {
                margin: '0 10px 0 0',
                borderRadius: '5px',
            };
        const tabStyle = layout == 'left' ? {
            borderRight: '1px solid #ddd'
        } : {}
        const transferBoxStyle = layout == 'left' ? {
            width: '1080px'
        } : {
                width: '875px'
            }
        return (
            <div>
                <h3>穿梭框</h3>
                <div className={`flex ${layout == 'top' ? 'flex-col' : ''}`} styleName="transfer-box" style={this.transferBoxStyle()}>
                    <div styleName="type-tabs" style={tabStyle}>
                        <Radio.Group value={type} onChange={this.onChangeType}>
                            <Radio.Button style={radioStyle} value={2}>直接办理</Radio.Button>
                            <Radio.Button style={radioStyle} value={0}>创建新集合</Radio.Button>
                            <Radio.Button style={radioStyle} value={1}>关联其他集合</Radio.Button>
                        </Radio.Group>
                    </div>
                    {
                        type == 2 ? (
                            <div className="mar-t-10" styleName="right-deal">
                                <div>案件类型：</div>
                                <div className="mar-t-10">
                                    <Radio.Group size="small" onChange={this.onChangeCaseType} value={this.state.caseType}>
                                        <Radio value={0}>民事公益诉讼</Radio>
                                        <Radio value={1}>行政公益诉讼</Radio>
                                    </Radio.Group>
                                </div>
                                <div key={'collectionsDealScroll'} className="mar-t-10" styleName="transfer-box-cont transfer-box-cont-lt">
                                    <div styleName="header">线索集合</div>
                                    <div styleName="search">
                                        <Search defaultValue={this.queryDealCollection.collectionName} autoComplete={false} placeholder="请输入搜索名称" onSearch={(value) => { this.searchCollections(value, 2) }} />
                                    </div>
                                    <div styleName="clue-list">
                                        <Zlayout flexRow>
                                            <AscrollContent ref={el => this.collectionsDealScroll = el} scroll={true} ref_component={this} loadmore={'getCollectionData'} showBack={false}>
                                                {this.collectionsDeal.map((item, index) => {
                                                    return (
                                                        <div key={index} styleName="colection-item">
                                                            <Tree
                                                                checkStrictly
                                                                checkable
                                                                checkedKeys={this.checkedCluesDeleteKeys[item.id]}
                                                                onCheck={this.onCheck}
                                                                onSelect={this.onSelect}
                                                            >
                                                                {this.renderTreeNodes(item, '', false)}
                                                            </Tree>
                                                        </div>
                                                    )
                                                })}
                                            </AscrollContent>
                                        </Zlayout>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <div className="flex align-item-center" styleName="transfer-box-cont-fa">
                                    <div styleName="transfer-box-cont transfer-box-cont-lt">
                                        <div styleName="header">待处理线索</div>
                                        <div styleName="search">
                                            <Search placeholder="请输入搜索名称" onSearch={(value) => { this.searchClues(value) }} />
                                        </div>
                                        <div styleName="clue-list">
                                            <Zlayout flexRow>
                                                <AscrollContent ref={el => this.clueScroll = el} scroll={true} ref_component={this} loadmore={'getClueData'} showBack={false}>
                                                    {
                                                        this.clues.map(item => {
                                                            return (
                                                                <div className="ellipsis" styleName="clue-item" key={item.id} title={item.caseName}>
                                                                    <Checkbox onChange={e => this.onCheckClues(item, e)}>
                                                                        {item.caseName}
                                                                    </Checkbox>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </AscrollContent>
                                            </Zlayout>
                                        </div>
                                    </div>
                                    <div styleName="transfer-box-handle">
                                        <div>
                                            <Button disabled={this.checkedCluesDelete.length == 0} type="primary" onClick={() => this.moveLeft()}>
                                                <Icon type="left" />
                                            </Button>
                                        </div>
                                        <div>
                                            <Button disabled={this.checkedCluesAdd.length == 0} type="primary" onClick={() => this.moveRight()}>
                                                <Icon type="right" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div key={'collectionsScroll'} styleName="transfer-box-cont transfer-box-cont-rt">
                                        <div styleName="header">线索集合</div>
                                        {
                                            type == 1 ? <div styleName="search">
                                                <Search defaultValue={this.queryCollection.collectionName} autoComplete={false} placeholder="请输入搜索名称" onSearch={(value) => { this.searchCollections(value) }} />
                                            </div> : null
                                        }
                                        <div styleName="collection-list">
                                            {
                                                type == 1 ? (
                                                    <Zlayout flexRow>
                                                        <AscrollContent ref={el => this.collectionsScroll = el} scroll={true} ref_component={this} loadmore={'getCollectionData'} showBack={false}>
                                                            {this.collections.map((item, index) => {
                                                                return (
                                                                    <div key={index} styleName="colection-item">
                                                                        <Tree
                                                                            checkStrictly
                                                                            checkable
                                                                            checkedKeys={this.checkedCluesDeleteKeys[item.id]}
                                                                            onCheck={this.onCheck}
                                                                            onSelect={this.onSelect}
                                                                        >
                                                                            {this.renderTreeNodes(item)}
                                                                        </Tree>
                                                                    </div>
                                                                )
                                                            })}
                                                        </AscrollContent>
                                                    </Zlayout>
                                                ) : (
                                                        <div styleName="colection-item">
                                                            <Tree
                                                                defaultExpandedKeys={['0']}
                                                                checkStrictly
                                                                checkable
                                                                checkedKeys={this.newCheckedCluesDeleteKeys}
                                                                onCheck={this.onCheck}
                                                                onSelect={this.onSelect}
                                                            >
                                                                {this.renderTreeNodes(this.newCollection)}
                                                            </Tree>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div >
                <div><Button onClick={() => { this.newCollectionByClue() }}>新建</Button></div>
            </div >
        );
    }
    // 容器宽高
    transferBoxStyle = () => {
        console.log('calc')
        const { layout } = this.props;
        const { type } = this.state;
        return layout == 'left' && type < 2 ? {
            width: '1080px'
        } : {
                width: '655px'
            }
    }
    // 集合树渲染
    renderTreeNodes = (item, parentId = "", CheckChild = true) => {
        const editBtnStyle = {
            padding: '0',
            width: 'auto',
            position: 'absolute',
            right: '12px',
            top: '3px',
            // transform: 'translateY(-50%)'
        }
        if (item.clues) {
            let parentId = item.id;
            if (item.isEditable) {
                if (item.isEditing) {
                    item.title = (
                        <div>
                            <input
                                value={item.collectionName}
                                onChange={(e) => {
                                    this.newCollection.collectionName = e.target.value;
                                    this.setState({ update: new Date() })
                                }
                                } />
                            <span style={editBtnStyle}>
                                <Icon type='close' style={{ marginLeft: 10 }}
                                    onClick={() => {
                                        this.newCollection.collectionName = this.newCollection.defaultCollectionName;
                                        this.newCollection.isEditing = false; this.setState({ update: new Date() })
                                    }} />
                                <Icon type='check' style={{ marginLeft: 10 }}
                                    onClick={() => {
                                        this.newCollection.defaultCollectionName = this.newCollection.collectionName;
                                        this.newCollection.isEditing = false; this.setState({ update: new Date() })
                                    }} />
                            </span>
                        </div>
                    );
                } else {
                    item.title = (
                        <div>
                            <span>
                                {item.collectionName}
                            </span>
                            <span >
                                <Button
                                    style={editBtnStyle}
                                    type="link"
                                    block
                                    onClick={() => { this.newCollection.isEditing = true; this.setState({ update: new Date() }) }}
                                >修改
                                </Button>
                                {/* <Icon style={{ marginLeft: 10 }} type='edit' /> */}
                            </span>
                        </div>
                    )
                }
            } else {
                item.title = item.collectionName
            }
            return (
                <TreeNode style={{ position: 'relative' }} title={item.title} key={item.id} isCollect={true} dataRef={item}>
                    {item.clues.map(clue => {
                        return this.renderTreeNodes(clue, parentId, CheckChild)
                    })}
                </TreeNode>
            );
        }
        return <TreeNode checkable={CheckChild} key={item.id} title={item.caseName} {...item} parentId={parentId} />;
    }
    // 左侧线索勾选
    onCheckClues = (item, e) => {
        console.log(item, e.target.checked);
        if (e.target.checked) {
            this.checkedCluesAdd.push(item);
            // this.clues = this.clues.filter(clueItem => clueItem.id != item.id);
        } else {
            this.checkedCluesAdd = this.checkedCluesAdd.filter(itemAdd => itemAdd.id != item.id);
            // this.clues.push(item);
        }
        this.setState({
            update: new Date()
        })
        // console.log(this.checkedCluesAdd, 'checkedCluesAdd')
    }
    // 集合选择
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    // 集合勾选
    onCheck = (checkedKeys, info) => {
        console.log(checkedKeys);
        const { type } = this.state;

        let checked = info.checked;
        let node = info.node,
            collectionId,
            checkedNode = info.checkedNodes[0],
            checkedId,
            isCollect = node.props.isCollect; //是否为集合
        console.log(node.props.id, node.props.isCollect);
        if (isCollect) {  // 如果是集合
            if (checked) {
                collectionId = checkedId = node.props.eventKey;;
                this.checkedCollections.push(checkedId);
            } else {
                collectionId = checkedId = node.props.eventKey;
                this.checkedCollections = this.checkedCollections.filter(item => item != checkedId);
            }

            console.log(this.checkedCollections, 'this.checkedCollections')
        } else { //否则是线索
            let clue = node.props; collectionId = clue.parentId;
            if (checked) {
                this.checkedCluesDelete.push(clue);
            } else {
                this.checkedCluesDelete = this.checkedCluesDelete.filter(item => item.id != clue.id)
            }
            console.log(this.checkedCluesDelete, 'checkedCluesDelete')
        }
        if (type === "0") { //新建
            this.newCheckedCluesDeleteKeys = checkedKeys;
        } else {
            this.checkedCluesDeleteKeys[collectionId] = checkedKeys;
        }
        this.setState({
            update: new Date()
        })
    }
    // 切换创建类型
    onChangeType = (e) => {
        this.setState({ type: e.target.value });
    }
    // moveLeft checkedCollections checkedCluesAdd checkedCluesDelete
    moveLeft = () => {
        const { type } = this.state;
        if (this.checkedCluesDelete.length > 0) {
            this.clues = this.clues.concat(this.checkedCluesDelete);
            this.clues = unique(this.clues);
            console.log(this.clues);
            if (type === 0) {
                this.checkedCluesDelete.map(item => {
                    this.newCollection.clues = this.newCollection.clues.filter(clue => clue.id != item.id)
                    this.newCheckedCluesDeleteKeys.checked = this.newCheckedCluesDeleteKeys.checked.filter(itemChecked => itemChecked != item.id)
                })
            } else {
                this.checkedCluesDelete.map(item => {
                    let parentId = item.parentId;
                    this.collections.forEach(collection => {
                        if (collection.id == parentId) {
                            collection.clues = collection.clues.filter(clue => clue.id != item.id)
                            // 请求后台接口关联修改线索
                            this.clueRelateCollection(collection);
                        }
                    })
                    console.log(this.checkedCluesDeleteKeys[parentId])
                    this.checkedCluesDeleteKeys[parentId].checked = this.checkedCluesDeleteKeys[parentId].checked.filter(itemChecked => itemChecked != item.id)
                })
            }
            this.checkedCluesDelete = [];
            this.setState({
                update: new Date()
            })
        } else {
            message.warning('请选择要移除的线索')
        }
    }
    // moveRight
    moveRight = () => {
        // this.checkedCluesAdd
        const { type } = this.state;
        if (this.checkedCluesAdd.length > 0) {
            if (type === 0) {
                let itemCluesKeys = this.newCollection.clues.map(clue => clue.id);
                // item.clues = item.clues.concat(this.checkedCluesAdd);
                this.checkedCluesAdd.map(itemAdd => {
                    if (itemCluesKeys.includes(itemAdd.id)) return;
                    this.newCollection.clues.push(itemAdd);
                })
            } else {
                if (this.checkedCollections.length > 0) {
                    this.checkedCollections.forEach(key => {
                        this.collections.forEach(item => {
                            let itemCluesKeys = item.clues && item.clues.length > 0 ? item.clues.map(clue => clue.id) : [];
                            if (item.id == key) {
                                // item.clues = item.clues.concat(this.checkedCluesAdd);
                                this.checkedCluesAdd.map(itemAdd => {
                                    if (itemCluesKeys.includes(itemAdd.id)) return;
                                    item.clues.push(itemAdd);
                                    // 请求后台接口关联修改线索
                                    this.clueRelateCollection(item);
                                })
                            }
                        })
                    })
                    // this.checkedCluesAdd = [];

                } else {
                    message.warning('请选择关联集合');
                }
            }
            this.setState({
                update: new Date()
            })
        } else {
            message.warning('请选择要关联的线索');
        }

        console.log(this.collections, 'this.collections');
    }
    // 线索关键字搜索
    searchClues = (keyword) => {
        this.clueScroll.backToTop();
        if (keyword) {
            this.queryClue.list = [{
                dimension: "keyword",
                paramValue: keyword
            }]
        } else {
            this.queryClue.list = []
        }
        this.getClueData(true)

    }
    // 搜索
    clueSearch = async (query) => {
        return apis.main.clueSearch(query).then(res => {
            return res.data;
        }).catch(err => {
            // console.log(err)
        })
    }
    // 获取查询线索数据
    getClueData = async (initData) => {
        if (isLoadingClue) {
            return;
        }
        isLoadingClue = true;
        let newQuery = zTool.deepCopy(this.queryClue);
        if (initData) {
            newQuery.pageNum = 1;
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            this.clues = data.list;
            this.queryClue = newQuery;
            isLoadingClue = false;
            this.setState({
                update: new Date()
            })
        } else {
            newQuery.pageNum += 1;
            console.log(newQuery.pageNum, newQuery.pages, '222222222222222222222222222222')
            if (newQuery.pageNum > newQuery.pages) {
                isLoadingClue = false;
                return false;
            }
            const data = await this.clueSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            let old_dataList = this.clues;
            old_dataList = old_dataList.concat(data.list);
            this.queryClue = newQuery;
            this.clues = old_dataList;
            isLoadingClue = false;
            this.setState({
                update: new Date()
            })
        }
    }
    // 集合关键字搜索
    searchCollections = (keyword) => { //type=2  直接办理
        const { type } = this.state;
        type == 2 ? this.collectionsDealScroll.backToTop() : this.collectionsScroll.backToTop();

        if (keyword) {
            type == 2 ? this.queryDealCollection.collectionName = keyword : this.queryCollection.collectionName = keyword;
        } else {
            type == 2 ? this.queryDealCollection.collectionName = "" : this.queryCollection.collectionName = "";
        }
        this.getCollectionData(true)
    }
    // 搜索
    collectionSearch = async (query) => {
        return apis.main.getRelations(query).then(res => {
            return res.data;
        }).catch(err => {
            // console.log(err)
        })
    }
    // 获取查询集合数据
    getCollectionData = async (initData) => { //initData true: 初始化第一页 false 页数自加1
        const { type } = this.state;
        if (isLoadingCollection) {
            return;
        }
        isLoadingCollection = true;
        let newQuery = zTool.deepCopy(type == 2 ? this.queryDealCollection : this.queryCollection);
        if (initData) {
            newQuery.current = 1;
            const data = await this.collectionSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            if (type == 2) {
                this.collectionsDeal = data.respVOs;
                this.queryDealCollection = newQuery;
            } else {
                this.collections = data.respVOs;
                this.queryCollection = newQuery;
            }
            isLoadingCollection = false;
            this.setState({
                update: new Date()
            })
        } else {
            newQuery.current += 1;
            console.log(newQuery.current, newQuery.pages, '222222222222222222222222222222')
            if (newQuery.current > newQuery.pages) {
                isLoadingCollection = false;
                return false;
            }
            const data = await this.collectionSearch(newQuery);
            newQuery.pages = data.pages;
            newQuery.total = data.total;
            if (type == 2) {
                let old_dataList = this.collectionsDeal;
                old_dataList = old_dataList.concat(data.respVOs);
                this.queryDealCollection = newQuery;
                this.collectionsDeal = old_dataList;
            } else {
                let old_dataList = this.collections;
                old_dataList = old_dataList.concat(data.respVOs);
                this.queryCollection = newQuery;
                this.collections = old_dataList;
            }
            isLoadingCollection = false;
            this.setState({
                update: new Date()
            })
        }
    }
    // 新建集合
    newCollectionByClue = () => {
        let collection = this.newCollection;
        let data = {
            collectionName: collection.collectionName,
            ids: collection.clues && collection.clues.length > 0 ? collection.clues.map(clue => {
                return clue.id
            }) : []
        }
        apis.main.saveCollect(data).then(res => {
            this.newCollection = { //创建新集合
                isEditable: true,
                isEditing: false,
                id: 0,
                defaultCollectionName: '自定义线索集',
                collectionName: '自定义线索集',
                clues: []
            }
            message.success("新建成功");
        })
    }
    // 线索集合关联
    clueRelateCollection = (collection) => {
        let data = {
            clueCollectionIds: [collection.id],
            clueId: collection.clues && collection.clues.length > 0 ? collection.clues.map(item => item.id) : [],
        }
        apis.main.addClueToColl(data).then(res => {
            // message.success("操作成功");
        })
    }
    // 案件办理  - 类型切换
    onChangeCaseType = (e) => {
        this.setState({
            caseType: e.target.value,
        });
    }

}
export default {
    name: 'Atransfer',
    component: Atransfer,
};