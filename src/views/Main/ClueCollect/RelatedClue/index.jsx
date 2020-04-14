import React from 'react';
import { Modal, Button, Input, Radio, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import { Zlayout } from 'zerod';
import PropTypes from 'prop-types';
import './style.scss';
const plainOptions11 = [
    { name: 'apple0', menuid: 0, type: '行政处罚', extend: true },
    { name: 'apple1', menuid: 1, type: '行政处罚', extend: true },
    { name: 'apple2apple2apple2apple2apple2applapple2apple2', menuid: 2, type: '行政处罚', extend: true },
    { name: 'apple0', menuid: 3, type: '行政处罚', extend: true },
];
class NewDealClue extends React.Component {
    static propTypes = {
        visible: PropTypes.bool
    };
    state = {
        loading: false,
        visible: this.props.visible,
        title: '关联处置线索',
        isRelate: false,
        indeterminate: true, //多选框样式设置
        checkedList: [], //已选的线索
        plainOptions: [
            { name: 'apple0', menuid: 0, type: '行政处罚', extend: true },
            { name: 'apple1', menuid: 1, type: '行政处罚', extend: true },
            { name: 'apple2apple2apple2apple2apple2applapple2apple2', menuid: 2, type: '行政处罚', extend: true },
            { name: 'apple0', menuid: 3, type: '行政处罚', extend: true },
        ]
    }
    componentWillReceiveProps(props, nextProps) {
        this.setState({
            visible: props.visible
        })
    }
    render() {
        const { visible, loading, title, isRelate, plainOptions } = this.state;
        return (
            <div>
                <Modal
                    styleName="new-deal-box"
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确定
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                    ]}
                >
                    <div styleName="item search">
                        <div>
                            <Input
                                placeholder="根据用户输入关键字进行模糊搜索"
                                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </div>
                        <div styleName="search-clue-list">
                            <Zlayout flexRow>
                                <Zlayout.Zbody scroll={true} loadMore={this.getData}>
                                    <CheckboxGroup
                                        value={this.state.checkedList}
                                        onChange={this.onChangeSelClue}
                                    >
                                        {
                                            plainOptions.map((sub, subKey) => {
                                                return (
                                                    <div className="flex" styleName="search-clue-item">
                                                        <Checkbox className="mar-r-5" key={subKey} value={sub} onChange={this.onChangeSelClue} />
                                                        <div className="pointer" styleName="extend—item">
                                                            <div onClick={() => { this.toggleExtend(sub) }} className="flex" styleName="extend-item-tit">
                                                                <span styleName="extend-icon">
                                                                    {
                                                                        sub.extend ? (<Icon type="minus" />)
                                                                            : (<Icon type="plus" />)
                                                                    }
                                                                </span>
                                                                <span>番禺新风塑料制品有限公司行政处罚案</span>
                                                            </div>
                                                            <div styleName={`${sub.extend ? 'extend' : 'collapse'} extend-item-content `}>
                                                                <div className="flex flex-between">
                                                                    <div>制品有限公司行政处罚案番禺新风塑料</div>
                                                                    <div className="flex-1 text-left" styleName="flag">
                                                                        <span>环境污染</span>
                                                                        <span>刑事案件</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-between">
                                                                    <div>制品有限公司行政处罚案番禺新风塑料</div>
                                                                    <div className="flex-1 text-left" styleName="flag">
                                                                        <span>环境污染</span>
                                                                        <span>12345举报</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </CheckboxGroup>
                                </Zlayout.Zbody>
                            </Zlayout>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.toggleModalRel(false);
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.toggleModalRel(false);
    };
    // 切换是否需要关联
    onChangeRadio = e => {
        this.setState({
            isRelate: e.target.value,
        });
    };
    // 滚动获取数据
    getData = () => {
        console.log('getData')
    }
    // 改变 所选 线索
    onChangeSelClue = (checkedList) => {
        const { plainOptions } = this.state;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    }
    // 展开 收起
    toggleExtend = (item) => {
        console.log(item);
        const { plainOptions } = this.state;
        let newPlainOptions = plainOptions.map(item_1 => {
            if (item_1.menuid == item.menuid) {
                item_1.extend = !item_1.extend;
            }
            return item_1
        })
        this.setState({
            plainOptions: newPlainOptions
        })

    }
}
export default NewDealClue;