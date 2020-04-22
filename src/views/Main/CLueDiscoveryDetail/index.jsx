import React from 'react';
import compnents from '@/components/load-components.js';
const { AClueDetailCard, AfileShow } = compnents;
import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
// 接口
import apis from '@/App.api.js';
// 样式类
import './style.scss';
// 通用工具
// import { zTool } from "zerod";

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
        // 爬取资源
        punishmentFileList: [],
    }
    componentDidMount() {
        // console.log(this.props.match.params.id);
        let query = {
            id: this.props.match.params.id
        }
        apis.main.getDetail(query).then(res => {
            let punishmentFileList = this.getFileList(res.data.punishmentFile);
            this.setState({
                details: res.data,
                punishmentFileList: punishmentFileList,
            })
        })
    }
    render() {
        const { history } = this.props;
        const { details, punishmentFileList } = this.state;
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
                                punishmentFileList.map((file, index) => {
                                    return (
                                        <AfileShow disabled={true} key={index} {...file} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <div className="text-center mar-b-20">
                    <Button onClick={() => { history.goBack() }} >返回</Button>
                </div> */}
                
            </Zlayout.Zbody >
        )
    }
    // 根据返回的文件字符串解析 list
    getFileList = (path, isSlefUpload) => { //isSelfUpload 判断是否是自己上传的 不是 不包含 uid size
        let fileList = [];
        if (path && path.length > 0) {
            let pathList = path.split(',');
            let nameReg = "?fileName=", uidReg = "?uid=", sizeReg = "?size=";
            if (isSlefUpload) {
                pathList.map((item, index) => {
                    fileList.push({
                        url: item.split(nameReg)[0],
                        name: item.split(nameReg)[1].split(uidReg)[0],
                        uid: item.split(uidReg)[1].split(sizeReg)[0],
                        size: item.split(sizeReg)[1],
                    })
                })
                return fileList;
            } else {
                pathList.map((item, index) => {
                    fileList.push({
                        url: item.split(nameReg)[0],
                        name: item.split(nameReg)[1],
                        size: "",
                        uid: "",
                    })
                })
                return fileList;
            }
        } else {
            return fileList
        }
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);