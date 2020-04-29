import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
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
        this.props.submit({})
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
                // let values = zTool.deepCopy(fieldsValue);
                if (fieldsValue['createTime'] && fieldsValue['createTime'].length > 1) {
                    fieldsValue['createStart'] = fieldsValue['createTime'][0].format('YYYY-MM-DD');
                    fieldsValue['createEnd'] = fieldsValue['createTime'][1].format('YYYY-MM-DD');
                    delete fieldsValue['createTime'];
                } else {
                    fieldsValue['createStart'] = "";
                    fieldsValue['createEnd'] = "";
                }
                if (fieldsValue['updateTime'] && fieldsValue['updateTime'].length > 1) {
                    fieldsValue['updateStart'] = fieldsValue['updateTime'][0].format('YYYY-MM-DD');
                    fieldsValue['updateEnd'] = fieldsValue['updateTime'][1].format('YYYY-MM-DD');
                    delete fieldsValue['updateTime'];
                } else {
                    fieldsValue['updateStart'] = "";
                    fieldsValue['updateEnd'] = "";
                }
                // fieldsValue['createTime'] = null;
                // fieldsValue['updateTime'] = null;


                fieldsValue.pageNum = 1;
                this.props.submit(fieldsValue);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form
                className="search-form"
                {...layout}
                name="basic"
                onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="线索名称："
                            name="collectionName"
                        >
                            {getFieldDecorator('collectionName', {
                                rules: [],
                            })(
                                <Input
                                    placeholder="请输入"
                                    autoComplete="off"
                                    allowClear
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="涉事主体："
                            name="typesSubjectsInvolved"
                            rules={[]}
                        >
                            {getFieldDecorator('typesSubjectsInvolved', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="0">企业</Option>
                                    <Option value="1">自然人</Option>
                                    <Option value="2">社会组织</Option>
                                    <Option value="3">其他</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="涉及公益诉讼领域："
                            name="domain"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {getFieldDecorator('domain', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="0">环境资源</Option>
                                    <Option value="1">食药安全</Option>
                                    <Option value="2">国有财产</Option>
                                    <Option value="3">国有土地</Option>
                                    <Option value="4">英烈权益</Option>
                                    <Option value="5">其他</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="线索类别："
                            name="clueType"
                        >
                            {getFieldDecorator('clueType', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="0">其他案件</Option>
                                    <Option value="1">行政处罚</Option>
                                    <Option value="2">12309</Option>
                                    <Option value="3">12345</Option>
                                    <Option value="4">互联网舆情</Option>
                                    <Option value="5">其他</Option>
                                </Select>
                            )}
                        </Form.Item></Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="线索阶段："
                            name="collStage"
                        >
                            {getFieldDecorator('collStage', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="0">调查取证中</Option>
                                    <Option value="1">呈请立案中</Option>
                                    <Option value="2">已立案</Option>
                                    <Option value="3">立案审批未通过</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            className="label"
                            label="线索状态："
                            name="collStatus"
                            rules={[]}
                        >
                            {getFieldDecorator('collStatus', {
                                rules: [],
                            })(
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                >
                                    <Option value="0">正常</Option>
                                    <Option value="1">废弃</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6} className="align-right">
                        <Form.Item
                            className="label"
                            label="更新时间："
                            name="updateTime"
                        >
                            {getFieldDecorator('updateTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    getCalendarContainer={triggerNode => triggerNode.parentNode}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6} className="align-right">
                        <Form.Item
                            className="label"
                            label="创建时间："
                            name="createTime"
                        >
                            {getFieldDecorator('createTime')(
                                <RangePicker
                                    getCalendarContainer={triggerNode => triggerNode.parentNode}
                                    format="YYYY-MM-DD"
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={18} span={6}>
                        <Row>
                            <Col className="text-right primary_self" span={23}>
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