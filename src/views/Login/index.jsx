import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss';
import avator from '@/assets/images/procurator.png';
import logo from '@/assets/images/login/logo.png';
class LoginMain extends React.PureComponent {
    // 定义初始state
    state = {
        validateCode: avator
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const userIcon = <span styleName="validate-icon user"></span>
        const pwdIcon = <span styleName="validate-icon pwd"></span>
        const validateIcon = <span styleName="validate-icon validate"></span>
        const validateCode = <span styleName="validate-icon code"><img src={this.state.validateCode} alt="" /></span>

        return (
            <div styleName="login-box">
                <div styleName="logo-div">
                    <img src={logo} alt="" />
                </div>
                <div className="flex flex-col align-item-center" styleName="login-box-child">
                    <div styleName="login-box-title">登录</div>
                    <Form onSubmit={this.handleSubmit} styleName="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={userIcon}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input.Password
                                    prefix={pwdIcon}
                                    placeholder="请输入密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('valicode', {
                                rules: [{ required: true, message: 'Please input your validate code!' }],
                            })(
                                <Input
                                    prefix={validateIcon}
                                    suffix={validateCode}
                                    placeholder="请输入验证码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" styleName="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
    // 获取验证码
    changeValidateCode = () => {
        let isLogo = this.state.validateCode == logo;
        this.setState({
            validateCode: isLogo ? avator : logo
        })
    }
    // 提交登录
    handleSubmit = e => {
        const { history } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                history.push('/index');
            }
        });
    };

}

export default Form.create({ name: 'normal_login' })(LoginMain);
