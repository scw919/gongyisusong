import React from 'react';
import { Modal, Button, Input, Radio, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import { Zlayout } from 'zerod';
import PropTypes from 'prop-types';
import './style.scss';
const plainOptions = [
    { name: 'apple0', menuid: 0, type: '行政处罚' },
    { name: 'apple1', menuid: 1, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2apple2applapple2apple2', menuid: 2, type: '行政处罚' },
    { name: 'apple0', menuid: 3, type: '行政处罚' },
    { name: 'apple1', menuid: 4, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2e2apple2apple2apple2', menuid: 5, type: '行政处罚' },
    { name: 'apple0', menuid: 6, type: '行政处罚' },
    { name: 'apple1', menuid: 7, type: '行政处罚' },
    { name: 'apple2apple2apple2apple2apple2apple2apple2', menuid: 8, type: '行政处罚' },
    { name: 'apple0', menuid: 9, type: '行政处罚' },
    { name: 'apple1', menuid: 10, type: '行政处罚' },
    { name: 'apple2apple2appleppapple2apple2apple2apple2apple2', menuid: 11, type: '行政处罚' },
];
class NewDealClue extends React.Component {
    static propTypes = {
        visible: PropTypes.bool
    };
    state = {
        loading: false,
        visible: this.props.visible,
        title: '新建处置线索',
        isRelate: false,
        indeterminate: true, //多选框样式设置
        checkedList: [], //已选的线索
    }
    componentWillReceiveProps(props, nextProps) {
        this.setState({
            visible: props.visible
        })
    }
    render() {
        const { visible, loading, title, isRelate } = this.state;
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
                    <div className="flex align-item-center" styleName="clue-name item">
                        <span styleName="left">线索名称：</span>
                        <Input styleName="right" placeholder="支持回填" />
                    </div>
                    <div className="flex align-item-center" styleName="item">
                        <span className="mar-r-10" styleName="left">是否需要关联其他线索：</span>
                        <Radio.Group onChange={this.onChangeRadio} value={isRelate}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </div>
                    {
                        isRelate ? (
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
                                                            <div key={subKey} className="flex" styleName="search-clue-item">
                                                                <Checkbox value={sub} onChange={this.onChangeSelClue} />
                                                                <div className="flex ft-16" styleName="clue-name">
                                                                    <div className="ellipsis" title={sub.name}>{sub.name}</div>
                                                                    <div className="flex-1 text-right">{sub.type}</div>
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
                        ) : null
                    }

                </Modal>
            </div>
        );
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.toggleModalNew(false);
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.toggleModalNew(false);
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
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    }
}
export default NewDealClue;