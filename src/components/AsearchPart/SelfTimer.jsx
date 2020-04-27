import React from 'react';
import { Modal, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import './style.scss';
class SelfTimer extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
    };
    state = {
        loading: false,
        visible: this.props.visible,
        title: '自定义时间段',
    }
    timeRanger = {
        startTime: '',
        endTime: ''
    };
    dateFormat = 'YYYY-MM-DD hh:mm:ss';
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
                    centered={true}
                    width={430}
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
                    <div className="flex align-item-center just-con-center" styleName="timer-item">
                        开始时间：
                        <DatePicker
                            styleName="time-picker"
                            format={this.dateFormat}
                            showTime
                            onChange={this.onChangeStart}
                        />
                    </div>
                    <div className="flex align-item-center just-con-center" styleName="timer-item">
                        结束时间：
                        <DatePicker
                            styleName="time-picker"
                            format={this.dateFormat}
                            showTime
                            onChange={this.onChangeEnd}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
    // 日期选择
    onChangeStart = (value, dateString) => {
        this.timeRanger['startTime'] = dateString;
    }
    onChangeEnd = (value, dateString) => {
        this.timeRanger['endTime'] = dateString;
    }
    // 弹窗底部按钮
    handleOk = () => {
        let messages = null, startTime = this.timeRanger.startTime, endTime = this.timeRanger.endTime;
        if (!startTime) {
            messages = "请选择开始时间";
        } else if (!endTime) {
            messages = "请选择结束时间"
        } else if (moment(startTime).valueOf() > moment(endTime).valueOf()) {
            messages = "开始时间不能大于结束时间"
        }
        if (messages) {
            message.warning(messages);
            return;
        }
        this.setState({
            visible: false
        });
        this.props.onOk(`${startTime}--${endTime}`);
    };
    handleCancel = () => {
        this.setState({ visible: false });
        this.props.onCancel();
    };
}
export default SelfTimer;