import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import compnents from '@/components/load-components.js';
const { AfileShow, AclueItem } = compnents;
import { Upload, Icon, Button, message } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
// 路由组件
import mainRoutes from '../load-child-routes.js';
// 样式类
import './style.scss';
// 接口
import apis from '@/App.api.js';
import upload from '@/Api/upload.api.js';
// 通用工具
import { zTool } from "zerod";
import commonMethods from '@/zTool/commonMethods.js';
const { matchUrlToMenu, createBreadCrumb, fileSizeChange } = commonMethods;

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

// const fileList = [
//     {
//         uid: '-1',
//         name: 'xxx.png',
//         status: 'done',
//         size: '2.9M',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }
// ];
class ClueDiscoveryDetail extends React.Component {
    state = {
        details: {},
        // 文件列表
        filesList: [
            { name: '1附件名称.png', type: 'png', size: '2.8M', url: detailInfo },
            { name: '2附件名称.doc', type: 'word', size: '2.8M', url: detailInfo },
            { name: '3附件名称.mp4', type: 'video', size: '2.8M', url: detailInfo },
            { name: '4附件名称.pdf', type: 'pdf', size: '2.8M', url: detailInfo },
        ],
        fileList: [],
        visible: false, //添加线索弹窗 
    }
    match = matchPath(this.props.location.pathname, {
        path: this.props.routePath
    });
    componentDidMount() {
        // console.log(this.match, mainRoutes,this.props.location);
        // createBreadCrumb(this.match, this.props.location, mainRoutes);
        let query = {
            id: this.props.match.params.id
        }
        apis.main.getClueCltDetail(query).then(res => {
            if (res.data) {
                let fileList = this.getFileList(res.data.collUploadFile);
                this.setState({
                    details: res.data,
                    fileList: fileList,
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
            refresh: true
        }
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <div className="text-center" styleName="detail-title">
                        <p className="ft-24">{details.collectionName}</p>
                        <p className="mar-t-15">
                            {
                                details.doMainsLabels ? details.doMainsLabels.map((item, index) => {
                                    return <span key={index} className={`tags-self ${item.color}`}>{item.desc}</span>
                                }) : null
                            }
                        </p>
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
                        <div className="flex" styleName="file-manage file-list">
                            {fileList.map((file, index) => {
                                return (
                                    <AfileShow delete={this.deleteFile} key={index} {...file} />
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
    toggleModal = (status) => {
        console.log(status);
        this.setState({
            visible: status
        })
    }
    // 根据返回的文件字符串解析 list
    getFileList = (path) => {
        let pathList = path.split(',');
        let fileList = [];
        let nameReg = "?fileName=", uidReg = "?uid=", sizeReg = "?size=";
        pathList.map((item, index) => {
            fileList.push({
                url: item.split(nameReg)[0],
                name: item.split(nameReg)[1].split(uidReg)[0],
                uid: item.split(uidReg)[1].split(sizeReg)[0],
                size: item.split(sizeReg)[1],
            })
        })
        return fileList;
    }
    // 根据uid 删除文件
    deleteFile = (uid) => {

        let fileList = this.state.fileList;
        fileList = fileList.filter(item => {
            return item.uid != uid
        })
        console.log(uid, fileList);
        this.setState({
            fileList: fileList
        })
    }
    // 自定义上传  gzwjc-miniprogram-wisdom/file/upload
    getNewFileList = (name, uid, size, url) => {
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        newFileList.push({
            uid: uid,
            name: name,
            size: fileSizeChange(size),
            url: url,
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
            // let fileList = this.state.fileList;
            this.getNewFileList(file.name, file.uid, file.size, res.data);
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
    // 表单
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    // 保存提交
    saveBaseInfo = (e) => {
        const { details, fileList } = this.state;
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log(fieldsValue);
                let collUploadFile = "";
                fileList.map((item, index)=> {
                    collUploadFile += `${index>0?',':''}${item.url}?fileName=${item.name}?uid=${item.uid}?size=${item.size}`
                })
                let data = Object.assign({}, fieldsValue, { id: details.id, collUploadFile: collUploadFile })
                apis.main.saveColl(data).then(res => {
                    message.success('保存成功')
                })
            }
        });
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);