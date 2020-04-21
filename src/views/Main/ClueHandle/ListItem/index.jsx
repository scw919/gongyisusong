import React from 'react';
import { Button, Modal, message } from 'antd';
const { confirm } = Modal;
import { Link } from 'react-router-dom';
// import { zTool } from "zerod";
import './style.scss';
// 接口
import apis from '@/App.api.js';

class ListItem extends React.Component {
    static defaultProps = {
        counts: [],
        typesSubjectsInvolved: [],
        collStage: {},
        collStatus: {}
    }
    render() {
        const {
            // status,
            id,
            collectionName, //集合名称
            counts, // 处罚历史
            collStage, //线索阶段
            collStatus, //线索状态,
            typesSubjectsInvolved, //涉事主体
            doMains, //领域
            createdTime, //创建时间
            updateTime, //更新时间

        } = this.props;
        const iconName = this.renderIcon(collStage.code);
        return (
            <div onClick={(e) => { this.checkDetail(e, id) }} className="ft-16 relative" styleName="item-box">
                <div className="absolute" styleName={iconName}></div>
                <p className="ellipsis" styleName="title">{collectionName}</p>
                <p styleName="tags">
                    {
                        counts.length > 0 ? counts.map((item, index) => {
                            return <span key={index} className="tags-self tag-grey">{item.desc}：{item.count}条</span>
                        }) : <span></span>
                    }
                </p>
                <p className="ellipsis">涉事主体：{this.renderArrayString(typesSubjectsInvolved)}</p>
                <p className="ellipsis">涉及公益诉讼领域：{this.renderArrayString(doMains)}</p>
                <p className="ellipsis">创建时间：{createdTime}</p>
                <div className="flex flex-between align-item-center">
                    <div styleName="update-time">更新时间：{updateTime}</div>
                    <div>
                        <Button onClick={(e) => { this.delete(e, id) }} type="link" className="warning">删除</Button>
                        {
                            collStatus.code == 0 ?
                                <Button onClick={(e) => { this.drop(e, id, true) }} type="link">废弃</Button> :
                                <Button onClick={(e) => { this.drop(e, id, false) }} type="link">启用</Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
    renderIcon = (code) => { // 0-调查取证中,1-呈请立案中,2-已立案,3-立案审批未通过
        switch (code) {
            case 0:
                return 'status-icon apply-searching';
                break;
            case 1:
                return 'status-icon apply-build';
                break;
            case 2:
                return 'status-icon apply-builded';
                break;
            case 3:
                return 'status-icon apply-unpass';
                break;
        }
    }
    // 渲染数组中的字符串
    renderArrayString = (subjects) => {
        let subjectsShow = " ";
        if (subjects && subjects.length > 0) {
            subjects.map((item, index) => {
                subjectsShow += index > 0 ? `、${item}` : item;
            })
        }
        return subjectsShow;
    }
    // 跳转详情
    checkDetail = (e, id) => {
        e.stopPropagation();
        const { history } = this.props;
        // history.push(`/main/myClue/clueHandle/clueHandleDetail/${id}`);
        window.open(`/main/myClue/clueHandle/clueHandleDetail/${id}`);
    }
    // 删除
    delete = (e, id) => {
        const { refresh } = this.props;
        e.stopPropagation();
        confirm({
            title: '确定删除?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
                apis.main.deleteClueCollection({ id: id }).then(res => {
                    message.success('操作成功');
                    refresh()
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 废弃
    drop = (e, id, disabled) => {
        const { refresh } = this.props;
        e.stopPropagation();
        confirm({
            title: disabled ? '确定废弃?' : '确定启用?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
                disabled ? apis.main.disabledClueCollection({ id: id }).then(res => {
                    message.success('操作成功');
                    refresh()
                    // this.
                }) : apis.main.enabledClueCollection({ id: id }).then(res => {
                    message.success('操作成功');
                    refresh()
                    // this.
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
}

export default ListItem;