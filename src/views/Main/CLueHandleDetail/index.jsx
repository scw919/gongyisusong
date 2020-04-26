import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import compnents from '@/components/load-components.js';
const { AclueItem, Aupload, AlabelTags } = compnents;
import { Button, message } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
// 路由组件
// import mainRoutes from '../load-child-routes.js';
// 样式类
import './style.scss';
// 接口
import apis from '@/App.api.js';
// 通用工具
// import { zTool } from "zerod";
// 子组件
import BaseInfo from './BaseInfo';
import AddClue from './AddClue';
import EventProcedure from './EventProcedure';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });
class ClueDiscoveryDetail extends React.Component {
    state = {
        details: {},
        // 文件列表
        fileList: [],
        visible: false, //添加线索弹窗 
    }
    match = matchPath(this.props.location.pathname, { //路由信息
        path: this.props.routePath
    });
    collUploadFile = ""; //文件路径字符串
    componentDidMount() {
        // console.log(this.match, mainRoutes,this.props.location);
        // createBreadCrumb(this.match, this.props.location, mainRoutes);
        let query = {
            id: this.props.match.params.id
        }
        apis.main.getClueCltDetail(query).then(res => {
            if (res.data) {
                this.collUploadFile = res.data.collUploadFile;
                this.setState({
                    details: res.data,
                })
            }
        })
    }
    render() {
        const { details, fileList } = this.state;
        const { history } = this.props;
        const addClueOpt = {
            history: history,
            visible: this.state.visible,
            collectionID: Number(this.props.match.params.id),
            toggleModal: this.toggleModal
        }
        const AclueItmOpt = {
            hasChecked: false,
            canCollect: false,
            isHandle: true,
            history: history,
            callback: this.filterClues
        }
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <div className="text-center" styleName="detail-title">
                        <p className="ft-24">{details.collectionName}</p>
                        <div className="mar-t-15">
                            <AlabelTags labels={details.doMainsLabels} />
                        </div>
                        {/* <p className="mar-t-15">
                            {
                                details.doMainsLabels ? details.doMainsLabels.map((item, index) => {
                                    return <span key={index} className={`tags-self ${item.color}`}>{item.desc}</span>
                                }) : null
                            }
                        </p> */}
                    </div>
                    {/* 基本概况 */}
                    <div className="ft-16" styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">基本概况</p>
                        <BaseInfo
                            {...details}
                            wrappedComponentRef={this.saveFormRef}
                        />
                    </div>
                    {/* 线索详情 */}
                    <div className="ft-16" styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">线索详情</p>
                        <div className="primary_self mar-t-10">
                            <Button onClick={() => { this.toggleModal(true) }} type="deepBlue">
                                添加其他线索
                            </Button>
                        </div>
                        <div styleName="other-clue">
                            {
                                details.clues ? details.clues.map((item, index) => {
                                    return <AclueItem key={index} {...AclueItmOpt} sub={item} />
                                }) : null
                            }
                        </div>
                    </div>
                    {/* 事态进程 */}
                    <div className="ft-16" styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">事态进程</p>
                        <div styleName="event-procedure">
                            <EventProcedure clues={details.clues} history={history} />
                        </div>
                    </div>
                    {/* 其他材料 上传 */}
                    <div styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">其他材料上传</p>
                        <Aupload filePath={this.collUploadFile} updateFilePath={this.updateFilePath} />
                    </div>
                    <div className="text-center" styleName="handle-btn-box">
                        <Button className="primary_self" disabled type="primary">
                            呈请立案
                        </Button>
                        <Button onClick={this.saveBaseInfo} ghost type="primary">
                            保存
                        </Button>
                        {/* <Button onClick={}>
                            返回
                        </Button> */}
                    </div>
                    {/* 添加其他线索 */}
                    <AddClue {...addClueOpt} />
                </div>
            </Zlayout.Zbody>
        )
    }

    // 添加线索弹窗 显示隐藏
    toggleModal = (status, checkedList) => {
        console.log(status);
        let details = this.state.details;
        if (checkedList && checkedList.length > 0) {
            checkedList.forEach(item => {
                item.penaltyDecisionDate = item.showDateTime;
                item.labels = item.lables;
            })
            details.clues = details.clues.concat(checkedList);
        }
        this.setState({
            visible: status,
            details: details,  //添加线索后刷新当前线索展示
        })
    }
    // 删除线索 回调
    filterClues = (id) => {
        let details = this.state.details;
        details.clues = details.clues.filter(item => {
            return item.id != id
        })
        this.setState({
            details: details
        });
    }
    // 获取文件路径字符串
    updateFilePath = (collUploadFile) => {
        this.collUploadFile = collUploadFile;
        console.log(this.collUploadFile, 'collUploadFile');
    }
    // 表单
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    // 保存提交
    saveBaseInfo = (e) => {
        const { history } = this.props;
        const { details, fileList } = this.state;
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, fieldsValue) => {
            if (!err) {
                // console.log(fieldsValue);
                let data = Object.assign({}, fieldsValue, { id: details.id, collUploadFile: this.collUploadFile || "" })
                apis.main.saveColl(data).then(res => {
                    message.success('保存成功');
                    history.go(-1);
                })
            }
        });
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);