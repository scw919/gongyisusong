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
class AddClue extends React.Component {
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
                                                        <div className="flex flex-1">
                                                            <span styleName="item-tit">番禺新风塑料制品有限公司行政处罚案</span>
                                                            <span className="text-right" styleName="item-tag">环境污染</span>
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
            this.props.toggleModal(false);
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.toggleModal(false);
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
}
export default AddClue;