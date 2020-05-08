import React from 'react';
// import { connect } from 'react-redux';
import { Icon, Input, Checkbox, Button, Radio, Tree, Message } from 'antd';
const { TreeNode } = Tree;
const { Search } = Input;
import PropTypes from 'prop-types';
import './style.scss';
import apis from '@/App.api.js';
import store from '@/store';
import { } from '@/store/actions';

const unique = (arr) => {
    let res = new Map();
    return arr.filter(item => !res.has(item.id) && res.set(item.id, 1))
}

// //at.alicdn.com/t/font_1740380_epha2kuvmm.js
export class Atransfer extends React.PureComponent {
    static propTypes = {
    };
    state = {
        type: '0', //0-新建  1-关联
    }
    clues = [
        {
            "id": 161409,
            "caseName": "广州市曾本五金工业有限公司行政处罚案件",
            "addressConcerned": "海珠区",
            "partyName": null,
            "timeLabel": "处罚决定日期",
            "showDateTime": "2018-08-28",
            "createdTime": "2020-04-25",
            "includeTime": null,
            "lables": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" },
            "highlightResult": { "highlightCaseName": null, "highlightAddressConcerned": null }
        },
        {
            "id": 161509,
            "caseName": "广州市曾本五金工业有限公司行政处罚案件",
            "addressConcerned": "海珠区",
            "partyName": null,
            "timeLabel": "处罚决定日期",
            "showDateTime": "2018-08-28",
            "createdTime": "2020-04-25",
            "includeTime": null,
            "lables": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" },
            "highlightResult": { "highlightCaseName": null, "highlightAddressConcerned": null }
        }
    ]
    collections = [
        {
            "id": 82,
            "collectionName": "广州市曾本五金工业有限公司行政处罚案件",
            "collStage": { "desc": "调查取证中", "code": 0 },
            "collStatus": { "desc": "启用", "code": 0 },
            "clueType": null, "collUploadFile": null,
            "soluClueType": null,
            "soluClueDomain": null,
            "soluClueDes": null,
            "doMains": ["其他"],
            "clueTypes": ["行政处罚"],
            "clues": [{ "id": 61409, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 17:01:52" }, { "id": 61109, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 17:01:52" }]
        },
        {
            "id": 81,
            "collectionName": "建设单位未取得建设工程施工许可证开工",
            "collStage": { "desc": "调查取证中", "code": 0 },
            "collStatus": { "desc": "启用", "code": 0 },
            "clueType": null, "collUploadFile": null,
            "soluClueType": null,
            "soluClueDomain": null,
            "soluClueDes": null,
            "doMains": ["其他"],
            "clueTypes": ["行政处罚"],
            "clues": [{ "id": 61409, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 17:01:40" }, { "id": 91296, "caseName": "建设单位未取得建设工程施工许可证开工", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市番海互联网科技有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-07-04", "createdTime": "2020-04-24", "addTime": "2020-05-07 11:47:58" }, { "id": 61509, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 11:47:58" }, { "id": 61609, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 11:47:58" }, { "id": 61109, "caseName": "广州市曾本五金工业有限公司行政处罚案件", "addressConcerned": "海珠区", "addressConcernedLongitude": null, "addressConcernedLatitude": null, "domain": null, "labels": { "clueType": "行政处罚", "domain": "其他", "PenaltyCategoryOne": "罚金" }, "partyName": "广州市曾本五金工业有限公司", "typesSubjectsInvolved": { "desc": "企业", "code": 0 }, "clueType": { "desc": "行政处罚", "code": 1 }, "penaltyDecisionDate": "2018-08-28", "createdTime": "2020-04-25", "addTime": "2020-05-07 11:47:58" }]
        }
    ]
    newCollection = { //创建新集合
        id: 0,
        collectionName: "自定义线索集",
        clues: []
    };
    newCheckedCluesDeleteKeys = [0];

    checkedCollections = [];
    checkedCluesAdd = [];
    checkedCluesDelete = [];
    checkedCluesDeleteKeys = [

    ];
    componentWillMount() {
        this.collections.map(item => {
            this.checkedCluesDeleteKeys[item.id] = []
        })
    }
    render() {
        const { type } = this.state;
        return (
            <div styleName="transfer-box">
                <h3>穿梭框</h3>
                <div styleName="type-tabs">
                    <Radio.Group value={type} onChange={this.onChangeType}>
                        <Radio.Button value="0">创建新集合</Radio.Button>
                        <Radio.Button value="1">关联其他集合</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="flex align-item-center" styleName="transfer-box-cont">
                    <div styleName="transfer-box-cont transfer-box-cont-lt">
                        <p>待处理线索</p>
                        <div styleName="search">
                            <Search placeholder="请输入" />
                        </div>
                        <div styleName="clue-list">
                            {
                                this.clues.map(item => {
                                    return (
                                        <div styleName="clue-item" key={item.id}>
                                            <Checkbox onChange={e => this.onCheckClues(item, e)}>
                                                <span>{item.caseName}</span>
                                            </Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div styleName="transfer-box-handle">
                        <div>
                            <Button onClick={() => this.moveLeft()}>
                                <Icon styleName="icon-left" type="caret-up" />
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => this.moveRight()}>
                                <Icon styleName="icon-right" type="caret-up" />
                            </Button>
                        </div>
                    </div>
                    <div styleName="transfer-box-cont transfer-box-cont-rt">
                        <div className="flex align-item-center flex-between">
                            <div>线索集合</div>

                        </div>
                        {
                            type == 1 ? <div styleName="search">
                                <Search placeholder="请输入" />
                            </div> : null
                        }
                        <div styleName="collection-list">
                            {
                                type == 1 ? this.collections.map((item, index) => {
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
                                }) : (
                                        <div styleName="colection-item">
                                            <Tree
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
            </div>
        );
    }
    // 集合树渲染
    renderTreeNodes = (item, parentId = "") => {
        if (item.clues) {
            let parentId = item.id;
            return (
                <TreeNode title={item.collectionName} key={item.id} isCollect={true} dataRef={item}>
                    {item.clues.map(clue => {
                        return this.renderTreeNodes(clue, parentId)
                    })}
                </TreeNode>
            );
        }
        return <TreeNode key={item.id} title={item.caseName} {...item} parentId={parentId} />;
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
        console.log(this.checkedCluesAdd, 'checkedCluesAdd')
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
            if (type === "0") {
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
            Message.warning('请选择要移除的线索')
        }
    }
    // moveRight
    moveRight = () => {
        // this.checkedCluesAdd
        const { type } = this.state;
        if (type === "0") {
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
                        let itemCluesKeys = item.clues.map(clue => clue.id);
                        if (item.id == key) {
                            // item.clues = item.clues.concat(this.checkedCluesAdd);
                            this.checkedCluesAdd.map(itemAdd => {
                                if (itemCluesKeys.includes(itemAdd.id)) return;
                                item.clues.push(itemAdd);
                            })
                        }
                    })
                })
                // this.checkedCluesAdd = [];

            } else {
                Message.warning('请选择关联集合');
            }
        }
        this.setState({
            update: new Date()
        })
        console.log(this.collections, 'this.collections');
    }
    //发起请求
    includeClue = (id, flag) => {
        let query = {
            clueIds: [id],
            flag: flag
        }
        apis.main.includedClue(query).then(res => {
            this.setState({
                hasCollected: flag
            }, () => {
                // console.log(this.state);
                const {
                    clickEvent,
                } = this.props;
                clickEvent && clickEvent(flag);
            });

        })
    }
}
export default {
    name: 'Atransfer',
    component: Atransfer,
};