import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AClueDetailCard, AfileShow } = compnents;

import { Icon, Button, Upload } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import upload from '@/Api/upload.api.js';
import { withRouter } from 'react-router-dom';
// 接口
import apis from '@/App.api.js';
// 样式类
import './style.scss';
// 通用工具
import { zTool } from "zerod";

import detailInfo from '@/assets/images/detail/detail-info.jpg';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });
class ClueDiscoveryDetail extends React.Component {
    state = {
        // 详情
        details: {},
        // 文件列表
        filesList: [
            { name: '1附件名称.png', type: 'png', size: '2.8M', url: detailInfo },
            { name: '2附件名称.doc', type: 'word', size: '2.8M', url: detailInfo },
            { name: '3附件名称.mp4', type: 'video', size: '2.8M', url: detailInfo },
            { name: '4附件名称.pdf', type: 'pdf', size: '2.8M', url: detailInfo },
        ],
        fileList: [

        ]
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        let query = {
            id: this.props.match.params.id
        }
        apis.main.getDetail(query).then(res => {
            res && res.data ? this.setState({
                details: res.data
            }) : null
        })
    }
    render() {
        const { fileList, details } = this.state;
        const { history, routes } = this.props;
        console.log(this.props, 'clueCollectDetail')
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <AClueDetailCard id={this.props.match.params.id} {...details} />
                    {/* 线索其他内容 */}
                    <div className="ft-16" styleName="clue-other main-module">
                        <p className="title-line-before" styleName="title bt-line">线索其他内容</p>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处理事由：</p>
                                <p styleName="content">
                                    {details.punishmentCause}
                                </p>
                            </div>
                        </div>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处罚依据：</p>
                                <p styleName="content">
                                    {details.punishmentBasis}
                                </p>
                            </div>
                        </div>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处罚结果：</p>
                                <p styleName="content">
                                    {details.penaltyResult}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 文件材料 */}
                    <div styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">文件材料</p>
                        <div className="flex" styleName="file-list">
                            {
                                details.clueUploadFile ? details.clueUploadFile.split(',').map((item, index) => {
                                    let obj = { type: item.split('.'), name: item, size: item.length, url: item };
                                    return (
                                        <AfileShow disabled={true} key={index} {...obj} />
                                    )
                                }) : null
                            }
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
                                action=""
                                customRequest={this.customRequest}
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
                    <div className="flex just-con-center" style={{ padding: '45px 0' }}>
                        <Button type="primary" style={{ marginRight: '24px' }}>保存</Button>
                        <Button onClick={() => { history.goBack() }}>返回</Button>
                    </div>
                </div>
            </Zlayout.Zbody>
        )
    }
    // 自定义上传  gzwjc-miniprogram-wisdom/file/upload
    getFileList = (name, uid, size, url) => {
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        newFileList.push({
            uid: uid,
            name: name,
            status: 'done',
            size: size,
            url: url,
            thumbUrl: url,
        })
        this.setState({
            fileList: newFileList
        });
    }
    customRequest = (params) => {
        const file = params.file;
        let formData = new FormData();
        formData.append("fName", file);
        console.log(params);
        upload.apis.upload(formData, {}).then((res) => {
            // console.log(res.success)
            let fileList = this.state.fileList;
            this.getFileList(file.name, file.uid, file.size, res.data);
        })
    }
    handleChangeFile = (fileList) => {
        console.log(fileList);
        // let newFile = fileList.file.response;
        // let stateFileList = this.state.fileList;
        // stateFileList.push(newFile);
        // console.log(stateFileList);
        // this.setState({ fileList: stateFileList });
    }
}
export default connect(mapStateToProps)(withRouter(ClueDiscoveryDetail));