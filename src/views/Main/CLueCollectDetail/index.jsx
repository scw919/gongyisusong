import React from 'react';
import compnents from '@/components/load-components.js';
const { AClueDetailCard, AfileShow, Aupload } = compnents;

import { Button, message } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// 工具
import commonMethods from '@/zTool/commonMethods.js';
const { getFileList } = commonMethods;
// 接口
import apis from '@/App.api.js';
// 样式类
import './style.scss';

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
        // 文件列表-自己上传
        fileList: [],
        // 爬取资源
        punishmentFileList: [],
    }
    clueUploadFile = ""; //文件路径字符串
    componentDidMount() {
        let query = {
            id: this.props.match.params.id
        }
        apis.main.getDetail(query).then(res => {
            if (res.data) {
                let punishmentFileList = this.getFileList(res.data.punishmentFile);
                this.clueUploadFile = res.data.clueUploadFile;
                this.setState({
                    details: res.data,
                    punishmentFileList: punishmentFileList
                })
            }
        })
    }
    render() {
        const { punishmentFileList, details } = this.state;
        const { history, routes } = this.props;
        return (
            <Zlayout.Zbody scroll={true}>
                <div className="main-rt-div1">
                    <div className="main-rt-div2">
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
                                        punishmentFileList.map((file, index) => {
                                            return (
                                                <AfileShow disabled={true} key={index} {...file} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* 其他材料 上传 */}
                            <div styleName="main-module">
                                <p className="title-line-before" styleName="title bt-line">其他材料上传</p>
                                <Aupload filePath={this.clueUploadFile} updateFilePath={this.updateFilePath} />
                            </div>
                            <div className="flex just-con-center primary_self" style={{ padding: '45px 0' }}>
                                <Button onClick={() => { this.saveBaseInfo() }} type="primary" style={{ marginRight: '24px' }}>保存</Button>
                                {/* <Button onClick={() => { history.goBack() }}>返回</Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Zlayout.Zbody>
        )
    }
    // 根据filepath字符串 解析filelist文件列表
    getFileList = (path, isSelfUpload) => {
        return getFileList(path, isSelfUpload)
    }
    // 获取文件路径字符串
    updateFilePath = (clueUploadFile) => {
        this.clueUploadFile = clueUploadFile;
        console.log(this.clueUploadFile, 'clueUploadFile');
    }
    // 保存提交
    saveBaseInfo = () => {
        let data = { clueId: this.props.match.params.id, clueUploadFile: this.clueUploadFile };
        apis.main.editDetail(data).then(res => {
            message.success('保存成功')
        })
    }
}
export default connect(mapStateToProps)(withRouter(ClueDiscoveryDetail));