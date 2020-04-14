import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Select, DatePicker } from 'antd';
import { zTool } from "zerod";
const { Option } = Select;
import './style.scss';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
};
class SearchForm extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }
    // 重置
    handleReset = () => {
        this.props.form.resetFields();
    };
    // 查询
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                let values = zTool.deepCopy(fieldsValue);
                values['updateTime'] = fieldsValue['updateTime'] ? fieldsValue['updateTime'].format('YYYY-MM-DD') : '';
                values['createTime'] = fieldsValue['createTime'] ? fieldsValue['createTime'].format('YYYY-MM-DD') : '';
                // console.log('Received values of form: ', values);
                this.props.submit(values);
            }
        });
    };
    
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form
                {...layout}
                name="basic"
                onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label="线索名称："
                            name="clueName"
                        >
                            {getFieldDecorator('clueName', {
                                rules: [],
                            })(
                                <Input
                                    placeholder="请输入"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="涉事主体："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('mainBody', {
                                rules: [],
                            })(
                                <Input
                                    placeholder="请输入"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="涉及公益诉讼领域："
                            name="clueName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {getFieldDecorator('areasInvolved', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="线索类别："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('clueType', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            )}
                        </Form.Item></Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label="线索阶段："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('clueStage', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="线索状态："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('clueStatus', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="更新时间："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('updateTime')(<DatePicker />)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="创建时间："
                            name="clueName"
                            rules={[]}
                        >
                            {getFieldDecorator('createTime')(<DatePicker />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={18} span={6}>
                        <Row>
                            <Col className="text-right" span={23}>
                                <Button style={{ marginRight: '15px' }} type="primary" htmlType="submit">
                                    搜索
                                </Button>
                                <Button onClick={this.handleReset} type="default">
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create({ name: 'search_form' })(SearchForm);