import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AClueDetailCard, AfileShow } = compnents;

import { Input, Tag, Icon, Button } from 'antd';

import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
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
        // 文件列表
        filesList: [
            { name: '1附件名称.png', type: 'png', size: '2.8M', url: detailInfo },
            { name: '2附件名称.doc', type: 'word', size: '2.8M', url: detailInfo },
            { name: '3附件名称.mp4', type: 'video', size: '2.8M', url: detailInfo },
            { name: '4附件名称.pdf', type: 'pdf', size: '2.8M', url: detailInfo },
        ]
    }
    render() {
        const { history } = this.props;
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <AClueDetailCard />
                    {/* 线索其他内容 */}
                    <div className="ft-16" styleName="clue-other main-module">
                        <p className="title-line-before" styleName="title bt-line">线索其他内容</p>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处理事由：</p>
                                <p styleName="content">
                                    经我局执法支队2019年1月16日、17日调查显示，当事人不按照国家规定申报登记危险废物并填写危险废物转移联单，自2017年开始，将生产过程中产生的废物代码分别为“336-069-17”和“336-101-17”的含铬污泥均以废物代码为“336-054-17”的含镍污泥的名义进行申报登记并填写转移联单。
                                </p>
                            </div>
                        </div>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处罚依据：</p>
                                <p styleName="content">
                                    《中华人民共和国固体废物污染环境防治法》：违反本法有关危险废物污染环境防治的规定，有下列行为之一的，由县级以上人民政府环境保护行政主管部门责令停止违法行为，限期改正，处以罚款：（二）不按照国家规定申报登记危险废物，或者在申报登记时弄虚作假的；有前款第一项、第二项、第七项、第八项、第九项、第十项、第十一项、第十二项、第十三项行为之一的，处一万元以上十万元以下的罚款；有前款第三项、第五项、第六项行为之一的，处二万元以上二十万元以下的罚款；有前款第四项行为的，限期缴纳，逾期不缴纳的，处应缴纳危险废物排污费金额一倍以上三倍以下的罚款。；《中华人民共和国固体废物污染环境防治法》：违反本法有关危险废物污染环境防治的规定，有下列行为之一的，由县级以上人民政府环境保护行政主管部门责令停止违法行为，限期改正，处以罚款：（六）不按照国家规定填写危险废物转移联单或者未经批准擅自转移危险废物的；有前款第六项行为的，处二万元以上二十万元以下的罚款。
                                </p>
                            </div>
                        </div>
                        <div styleName="clue-other-item">
                            <div>
                                <p styleName="title">处罚结果：</p>
                                <p styleName="content">
                                    罚款20万元。限当事人在收到本处罚决定书之日起15日内，按照《广州市非税收入缴款通知书》的要求，将上述罚款缴到非税收入代收银行（工商银行、建设银行、广州银行、广州农村商业银行、中国银行、农业银行、邮政储蓄银行、交通银行、光大银行、中信银行、广发银行、浦发银行、华夏银行、招商银行、民生银行、兴业银行、平安银行、广东华兴银行、创兴银行、浙商银行、渤海银行、珠海华润银行、九江银行），收入项目编码：3124。
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 文件材料 */}
                    <div styleName="main-module">
                        <p className="title-line-before" styleName="title bt-line">文件材料</p>
                        <div className="flex" styleName="file-list">
                            {
                                this.state.filesList.map((item, index) => {
                                    return (
                                        <AfileShow key={index} type={item.type} name={item.name} size={item.size} url={item.url} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="text-center mar-b-20">
                    <Button onClick={() => { history.goBack() }} >返回</Button>
                </div>
            </Zlayout.Zbody >
        )
    }
}
export default connect(mapStateToProps)(ClueDiscoveryDetail);