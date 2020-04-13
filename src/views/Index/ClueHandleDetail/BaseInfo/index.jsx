import React from 'react';
import { Button, Modal, Form, Row, Col, Input } from 'antd';
const { TextArea } = Input;
const { confirm } = Modal;
// import { zTool } from "zerod";
import './style.scss';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
const textLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
};
const BaseInfo = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form
                    styleName="base-info"
                    {...layout}
                    name="basic"
                >
                    <Row styleName="base-info">
                        <Col span={6}>
                            <Form.Item
                                label="线索类型："
                                name="clueType"
                            >
                                {getFieldDecorator('clueType', {
                                    rules: [{required: true, message: '请输入线索类型'}],
                                })(
                                    <Input
                                        placeholder="请输入"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="线索领域："
                                name="clueAreas"
                                rules={[]}
                            >
                                {getFieldDecorator('clueAreas', {
                                    rules: [{required: true,  message: '请输入线索领域'}],
                                })(
                                    <Input
                                        placeholder="请输入"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                {...textLayout}
                                label="线索描述："
                                name="clueDesc"
                                rules={[]}
                            >
                                {getFieldDecorator('clueDesc', {
                                    rules: [{required: true,  message: '请输入线索描述'}],
                                })(
                                    <TextArea
                                        autoSize={{ minRows: 5, maxRows: 6 }}
                                        placeholder="请输入"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            );
        }
    },
);
export default BaseInfo;