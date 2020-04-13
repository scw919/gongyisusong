import React from 'react';
import PropTypes from 'prop-types';
// import compnents from '@/components/load-components.js';
// const { Acollect } = compnents;
import { Acollect } from '../Acollect';
import { Icon, Button, Checkbox, Modal } from 'antd';
const { confirm } = Modal;
// import { Link } from 'react-router-dom';
import './style.scss';

const linkTypes = {
    collectDetail: '/index/myClue/clueCollectDetail',
    discoveryDetail: '/index/clueDiscovery/byClue/clueDiscoveryDetail',
}

class AclueItem extends React.Component {
    static propTypes = {
        sub: PropTypes.object,
        onClick: PropTypes.func,
        toggleModal: PropTypes.func,
        hasChecked: PropTypes.bool, // 是否可勾选
        canCollect: PropTypes.bool, //是否显示收录按钮
        isCollect: PropTypes.bool, // 是否可新建/关联 处置线索
        isHandle: PropTypes.bool, // 线索处置 查看，删除
    };
    static defaultProps = {
        canCollect: true,
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
            history
        } = this.props;
        const linkUrl = isCollect ? linkTypes['collectDetail'] : linkTypes['discoveryDetail'];
        return (
            <div onClick={(e) => { this.checkDetail(e, linkUrl) }} styleName="search-list-item">
                <div styleName="search-list-item-title" className="flex flex-between">
                    <div className="ft-18" styleName="title">
                        {hasChecked ? <Checkbox value={sub} id={`${sub.menuid}`} >{sub.name}</Checkbox > : null}
                        <span>番禺南丰塑料有限公司行政处罚案</span>
                        {/* <Link to={linkUrl}>
                            <span>番禺南丰塑料有限公司行政处罚案</span>
                        </Link> */}
                    </div>
                    {/* 收录 */}
                    {canCollect ? <Acollect isCollected={true} clickEvent={clickEvent} /> : null}
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="environment" />
                        <span>广州市南沙区南天街102号</span>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="book" />
                        <div className="ft-16 inline-block">
                            <span className="tags-self tag-green">资源环境</span>
                            <span className="tags-self tag-yellow">其他案件</span>
                            <span className="tags-self tag-red">罚款</span>
                        </div>
                    </div>
                    {/* <div></div> */}
                </div>
                <div className="flex flex-between">
                    <div styleName="left-part">
                        <Icon className="mar-r-5" type="clock-circle" />
                        <span>处罚决定日期: </span>
                        <span>2019年12月24日</span>
                    </div>
                    {
                        !isCollect && !isHandle ? (<div styleName="right-part">
                            采集时间: 2020-02-12
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
                                        <span>采集时间：2020-02-12</span>
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
    // 跳转详情
    checkDetail = (e, linkUrl) => {
        e.stopPropagation();
        const { history } = this.props;
        history.push(linkUrl);

    }
    // 删除
    delete = (e) => {
        e.stopPropagation();
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
