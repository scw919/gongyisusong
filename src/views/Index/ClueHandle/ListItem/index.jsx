import React from 'react';
import { Button, Modal } from 'antd';
const { confirm } = Modal;
// import { zTool } from "zerod";
import './style.scss';
class ListItem extends React.Component {

    render() {
        const { status } = this.props;
        const iconName = this.renderIcon(status);
        return (
            <div onClick={this.checkDetail} className="ft-16 relative" styleName="item-box">
                <div className="absolute" styleName={iconName}></div>
                <p className="ellipsis" styleName="title">番禺南丰塑料制品有限公司行政处罚案</p>
                <p styleName="tags">
                    <span className="tags-self tag-grey">司法诉讼：5条</span>
                    <span className="tags-self tag-grey">行政处罚：5条</span>
                    <span className="tags-self tag-grey">意见投诉：5条</span>
                </p>
                <p className="ellipsis">涉事主体：番禺南丰塑料制品有限公司</p>
                <p className="ellipsis">涉及公益诉讼领域：环境保护、食药安全、国有有限公司</p>
                <p className="ellipsis">创建时间：2020-02-12</p>
                <div className="flex flex-between align-item-center">
                    <div styleName="update-time">更新时间：2020-02-12</div>
                    <div>
                        <Button onClick={this.delete} type="link" className="warning">删除</Button>
                        <Button onClick={this.drop} type="link">废弃</Button>
                    </div>
                </div>
            </div>
        );
    }
    renderIcon = (status) => {
        switch (status) {
            case 0:
                return 'status-icon apply-build';
                break;
            case 1:
                return 'status-icon apply-builded';
                break;
            case 2:
                return 'status-icon apply-unpass';
                break;
            case 3:
                return 'status-icon apply-searching';
                break;
        }
    }
    // 跳转详情
    checkDetail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { history } = this.props;
        history.push('/index/myClue/clueHandleDetail');
    }
    // 删除
    delete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        confirm({
            title: '确定删除?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 废弃
    drop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        confirm({
            title: '确定废弃?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
}

export default ListItem;