import React from 'react';
import PropTypes from 'prop-types';
import { AlabelTags } from '../AlabelTags';
import { Acollect } from '../Acollect';
import { Icon, Button, Checkbox, Modal, message } from 'antd';
const { confirm } = Modal;
import { Link } from 'react-router-dom';
import './style.scss';
// 接口
import apis from '@/App.api.js';

const linkTypes = {
    collectDetail: '/main/myClue/clueCollect/clueCollectDetail',
    discoveryDetail: '/main/clueDiscovery/byClue/clueDiscoveryDetail',
}

class AclueItem extends React.Component {
    static propTypes = {
        sub: PropTypes.object,
        onClick: PropTypes.func,
        callback: PropTypes.func, //回调
        toggleModal: PropTypes.func,
        hasCollected: PropTypes.bool, //是否已收藏
        hasChecked: PropTypes.bool, // 是否可勾选
        canCollect: PropTypes.bool, //是否显示收录按钮
        isCollect: PropTypes.bool, // 是否可新建/关联 处置线索
        isHandle: PropTypes.bool, // 线索处置 查看，删除
    };
    static defaultProps = {
        canCollect: true,
        hasCollected: false,
        hasChecked: false,
        isCollect: false,
        isHandle: false,
    }
    render() {
        const {
            clickEvent,
            sub,
            isCollect,
            isHandle,
            hasChecked,
            canCollect,
            hasCollected,
            history
        } = this.props;
        sub.lables = sub.lables ? sub.lables : sub.labels;
        const linkUrl = isCollect || isHandle ? linkTypes['collectDetail'] : linkTypes['discoveryDetail'];
        return (
            <div styleName="search-list-item">
                <div styleName="search-list-item-title" className="flex flex-between">
                    <div className="ft-18" styleName="title">
                        {hasChecked ? <Checkbox style={{ marginRight: '8px' }} disabled={hasCollected && !isCollect} value={sub} id={`${sub.id}`} ></Checkbox > : null}
                        {/* <span onClick={(e) => { this.checkDetail(e, linkUrl) }}>番禺南丰塑料有限公司行政处罚案</span> */}
                        <Link to={`${linkUrl}/${sub.id}`} target="_blank">
                            <span dangerouslySetInnerHTML={{ __html: this.highLightRender(sub, 'name') }}></span>
                        </Link>
                    </div>
                    {/* 收录 */}
                    {canCollect ? <Acollect clickEvent={this.props.clickEvent} hasCollected={hasCollected} id={sub.id} /> : null}
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="environment" />
                        <span dangerouslySetInnerHTML={{ __html: this.highLightRender(sub, 'address') }}></span>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="book" />
                        <AlabelTags labels={sub.lables} />
                    </div>
                    {/* <div></div> */}
                </div>
                <div className="flex flex-between">
                    {
                        isHandle ? (
                            <div styleName="left-part">
                                <Icon className="mar-r-5" type="clock-circle" />
                                <span>处罚决定日期: </span>
                                <span>{sub.penaltyDecisionDate}</span>
                            </div>) : (
                                <div styleName="left-part">
                                    <Icon className="mar-r-5" type="clock-circle" />
                                    <span>{sub.timeLabel}: </span>
                                    <span>{sub.showDateTime}</span>
                                </div>
                            )
                    }
                    {
                        !isCollect && !isHandle ? (<div styleName="right-part">
                            采集时间: {sub.createdTime}
                        </div>) : null
                    }
                </div>
                {
                    isCollect ? (<div className="flex flex-between align-item-center" styleName="collect">
                        <div styleName="left-part">
                            <span>收录时间：{sub.createdTime}</span>
                        </div>
                        <div className="flex flex-1 flex-end" styleName="right-part">
                            <div onClick={this.toggleModalNew}>新建处置线索</div>
                            <div onClick={this.toggleModalRel}>关联处置线索</div>
                        </div>
                    </div>)
                        : (
                            isHandle ? (
                                <div className="flex flex-between align-item-center" styleName="collect">
                                    <div styleName="left-part">
                                        <span>采集时间：{sub.createdTime}</span>
                                    </div>
                                    <div className="flex flex-1 flex-end" styleName="right-part">
                                        <Link to={`${linkUrl}/${sub.id}`} target="_blank">
                                            <Button type="primary" style={{ marginRight: '8px' }}>查看</Button>
                                        </Link>
                                        <Button onClick={(e) => { this.delete(e) }} type="danger">删除</Button>
                                    </div>
                                </div>
                            ) : null
                        )
                }
                {this.props.children}
            </div>
        );
    }
    // 高亮渲染
    highLightRender = (item, type) => {
        switch (type) {
            case 'name':
                if (item.highlightResult && item.highlightResult.highlightCaseName) {
                    return item.highlightResult.highlightCaseName
                } else {
                    return item.caseName;
                }
                break;
            case 'address':
                if (item.highlightResult && item.highlightResult.highlightAddressConcerned) {
                    return item.highlightResult.highlightAddressConcerned
                } else {
                    return item.addressConcerned;
                }
                break;
        }
    }
    // 跳转详情
    checkDetail = (e, linkUrl) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { history } = this.props;
        history.push(linkUrl);
    }
    // 删除
    delete = (e) => {
        const { sub, callback } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        confirm({
            title: '确定删除?',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // console.log('OK');
                apis.main.deleteClue({ id: sub.id }).then(res => {
                    message.success('操作成功');
                    callback && callback(sub.id);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    toggleModalNew = (e) => { //新建
        const { sub } = this.props;
        // console.log('click', sub);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.toggleModalNew(true, sub);
    }
    toggleModalRel = (e) => { // 关联
        const { sub } = this.props;
        // console.log('click', sub);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.toggleModalRel(true, sub);
    }
}

export default {
    name: 'AclueItem',
    component: AclueItem,
};
