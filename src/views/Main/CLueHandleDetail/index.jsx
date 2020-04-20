import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import compnents from '@/components/load-components.js';
const { AfileShow, AclueItem } = compnents;
import { Upload, Icon, Button } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
// 路由组件
import mainRoutes from '../load-child-routes.js';
// 样式类
import './style.scss';
// 通用工具
import { zTool } from "zerod";
import commonMethods from '@/zTool/commonMethods.js';
const { matchUrlToMenu, createBreadCrumb } = commonMethods;

import BaseInfo from './BaseInfo';
import AddClue from './AddClue';
import EventProcedure from './EventProcedure';
import detailInfo from '@/assets/images/detail/detail-info.jpg';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });

const fileList = [
    {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        size: '2.9M',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
];
class ClueDiscoveryDetail extends React.Component {
    state = {
        // 文件列表
        filesList: [
            { name: '1附件名称.png', type: 'png', size: '2.8M', url: detailInfo },
            { name: '2附件名称.doc', type: 'word', size: '2.8M', url: detailInfo },
            { name: '3附件名称.mp4', type: 'video', size: '2.8M', url: detailInfo },
            { name: '4附件名称.pdf', type: 'pdf', size: '2.8M', url: detailInfo },
        ],
        visible: false, //添加线索弹窗 
    }
    match = matchPath(this.props.location.pathname, {
        path: this.props.routePath
    });
    componentWillMount() {
        // console.log(this.match, mainRoutes,this.props.location);
        // createBreadCrumb(this.match, this.props.location, mainRoutes);
    }
    render() {
        const { history } = this.props;
        const AclueItmOpt = {
            hasChecked: false,
            canCollect: false,
            isHandle: true,
            history: history,
        }
        const addClueOpt = {
            visible: this.state.visible,
            toggleModal: this.toggleModal
        }
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <div className="text-center" styleName="detail-title">
                        <p className="ft-24">番禺南丰塑料制品有限公司行政处罚案</p>
                        <p className="mar-t-15">
                            <span className="tags-self GREEN">资源环境</span>
                            <span className="tags-self YELLOW">其他案件</span>
                            <span className="tags-self RED">罚款</span>
                        </p>
                    </div>
                    {/* 基本概况 */}
                    <div className="ft-16" styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">基本概况</p>
                        <BaseInfo
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
                        {/* <div styleName="other-clue">
                            <AclueItem {...AclueItmOpt} />
                        </div> */}
                    </div>
                    {/* 事态进程 */}
                    <div className="ft-16" styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">事态进程</p>
                        <div styleName="event-procedure">
                            <EventProcedure history={this.props.history} />
                        </div>
                    </div>
                    {/* 其他材料 上传 */}
                    <div styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">其他材料上传</p>
                        <div className="flex" styleName="file-manage file-list">
                            {fileList.map((file, index) => {
                                return (
                                    <AfileShow key={index} {...file} />
                                )
                            })}
                            <Upload
                                action="https://172.16.121.18:8904/gzwjc-miniprogram-wisdom/file/upload"
                                // customRequest={this.customRequest}
                                showUploadList={false}
                                fileList={fileList}
                                onChange={this.handleChangeFile}
                            >
                                <Button styleName="upload-btn">
                                    <Icon type="upload" />
                                    支持扩展名： .doc .docx .pdf .jpg
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="text-center" styleName="handle-btn-box">
                        <Button className="primary_self" onClick={this.saveBaseInfo} type="primary">
                            呈请立案
                        </Button>
                        <Button onClick={this.saveBaseInfo} ghost type="primary">
                            保存
                        </Button>
                        <Button onClick={this.saveBaseInfo}>
                            返回
                        </Button>
                    </div>
                    {/* 添加其他线索 */}
                    <AddClue {...addClueOpt} />
                </div>
            </Zlayout.Zbody>
        )
    }

    // 添加线索弹窗 显示隐藏
    toggleModal = (status) => {
        console.log(status);
        this.setState({
            visible: status
        })
    }

    // 自定义上传  gzwjc-miniprogram-wisdom/file/upload
    customRequest = (detail) => {
        console.log(detail);
        upload.apis.upload(detail.file).then((res) => {
            console.log(res.success)
        })
    }
    //  监听 文件上传
    handleChangeFile = (fileList) => {
        console.log(fileList);
        let newFile = fileList.file.response;
        let stateFileList = this.state.fileList;
        stateFileList.push(newFile);
        console.log(stateFileList);
        // this.setState({ fileList: stateFileList });
    }
    // 表单
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    // 保存提交
    saveBaseInfo = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log(fieldsValue);
            }
        });
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);