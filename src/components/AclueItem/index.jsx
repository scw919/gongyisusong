import React from 'react';
import PropTypes from 'prop-types';
// import compnents from '@/components/load-components.js';
// const { Acollect } = compnents;
import { Acollect } from '../Acollect';
import { Icon, Button, Checkbox, Modal } from 'antd';
const { confirm } = Modal;
import { Link } from 'react-router-dom';
import './style.scss';

const linkTypes = {
    collectDetail: '/main/myClue/clueCollect/clueCollectDetail',
    discoveryDetail: '/main/clueDiscovery/byClue/clueDiscoveryDetail',
}

class AclueItem extends React.Component {
    static propTypes = {
        sub: PropTypes.object,
        onClick: PropTypes.func,
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
        const linkUrl = isCollect ? linkTypes['collectDetail'] : linkTypes['discoveryDetail'];
        return (
            <div styleName="search-list-item">
                <div styleName="search-list-item-title" className="flex flex-between">
                    <div className="ft-18" styleName="title">
                        {hasChecked ? <Checkbox disabled={hasCollected} value={sub} id={`${sub.menuid}`} ></Checkbox > : null}
                        {/* <span onClick={(e) => { this.checkDetail(e, linkUrl) }}>番禺南丰塑料有限公司行政处罚案</span> */}
                        <Link to={`${linkUrl}/${sub.id}`} target="_blank">
                            <span style={{ marginLeft: '8px' }} dangerouslySetInnerHTML={{ __html: this.highLightRender(sub, 'name') }}></span>
                        </Link>
                    </div>
                    {/* 收录 */}
                    {canCollect ? <Acollect hasCollected={hasCollected} id={sub.id} /> : null}
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
                        <div className="ft-16 inline-block">
                            {
                                sub.lables ? Object.keys(sub.lables).map(key => {
                                    return <span key={key} className={`tags-self ${sub.lables[key]}`}>{key}</span>
                                    // <span className="tags-self tag-yellow">其他案件</span>
                                    // <span className="tags-self tag-red">罚款</span>
                                }) : null
                            }
                        </div>
                    </div>
                    {/* <div></div> */}
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="clock-circle" />
                        <span>{sub.timeLabel}: </span>
                        <span>{sub.showDateTime}</span>
                    </div>
                    {
                        !isCollect && !isHandle ? (<div styleName="right-part">
                            采集时间: {sub.createdTime}
                        </div>) : null
                    }
                </div>
                {
                    isCollect ? (<div className="flex flex-between align-item-center" styleName="collect">
                        <div styleName="left-part">
                            <span>收录时间：2020-02-12</span>
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
                                        <Button onClick={(e) => { this.checkDetail(e, linkUrl) }} type="primary" style={{ marginRight: '8px' }}>查看</Button>
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
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        confirm({
            title: '确定删除?',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    toggleModalNew = (e) => { //新建
        console.log('click');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.toggleModalNew(true);
    }
    toggleModalRel = (e) => { // 关联
        console.log('click');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.toggleModalRel(true);
    }
}

export default {
    name: 'AclueItem',
    component: AclueItem,
};
