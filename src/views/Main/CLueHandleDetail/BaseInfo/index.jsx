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
            const {
                soluClueDes, //基本概况-线所描述 
                soluClueDomain, //基本概况-线索领域
                soluClueType, //基本概况-线索类型
                form
            } = this.props;
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
                                name="soluClueType"
                            >
                                {getFieldDecorator('soluClueType', {
                                    rules: [{ required: true, message: '请输入线索类型' }],
                                    initialValue: soluClueType,
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
                                name="soluClueDomain"
                                rules={[]}
                            >
                                {getFieldDecorator('soluClueDomain', {
                                    rules: [{ required: true, message: '请输入线索领域' }],
                                    initialValue: soluClueDomain,
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
                                name="soluClueDes"
                                rules={[]}
                            >
                                {getFieldDecorator('soluClueDes', {
                                    rules: [{ required: true, message: '请输入线索描述' }],
                                    initialValue: soluClueDes,
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