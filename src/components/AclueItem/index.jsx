import React from 'react';
import PropTypes from 'prop-types';
// import compnents from '@/components/load-components.js';
// const { Acollect } = compnents;
import { Acollect } from '../Acollect';
import { Icon, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

const linkTypes = {
    collectDetail: '/index/myClue/clueCollectDetail',
    discoveryDetail: '/index/clueDiscovery/byClue/clueDiscoveryDetail',
}

class AclueItem extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        sub: PropTypes.object,
        isCollect: PropTypes.bool,
        toggleModal: PropTypes.func,
    };
    render() {
        const {
            onClick,
            sub,
            isCollect,
        } = this.props;
        const linkUrl = isCollect ? linkTypes['collectDetail'] : linkTypes['discoveryDetail'];
        return (
            <div styleName="search-list-item">
                <div styleName="search-list-item-title" className="flex flex-between">
                    <div className="ft-18" styleName="title">
                        <Checkbox value={sub} id={`${sub.menuid}`} >{sub.name}</Checkbox >
                        <Link to={linkUrl}>
                            <span>番禺南丰塑料有限公司行政处罚案</span>
                        </Link>
                    </div>
                    {/* 收录 */}
                    <Acollect isCollected={true} onClick={onClick} />
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
                        !isCollect ? (<div styleName="right-part">
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
                    </div>) : null
                }
            </div>
        );
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
