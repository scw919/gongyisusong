import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AClueDetailCard, AfileShow } = compnents;
import { Button } from 'antd';
import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
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
        ]
    }
    componentDidMount() {
        // console.log(this.props.match.params.id);
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
        const { history } = this.props;
        const { details } = this.state;
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
                </div>
                {/* <div className="text-center mar-b-20">
                    <Button onClick={() => { history.goBack() }} >返回</Button>
                </div> */}
            </Zlayout.Zbody >
        )
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);