import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import './style.scss';
import avator from '@/assets/images/procurator.png';
import logo from '@/assets/images/login/logo.png';
// import com_const from '@/zTool/commonConsts.js';
// actions
import store from '@/store';
import { setToken, getCollectedClues } from '@/store/actions';
// 接口
import apis from '@/App.api.js';
const baseURL = "http://172.16.121.73:8765/user";

class LoginMain extends React.PureComponent {
    // 定义初始state
    state = {
        validateCode: avator
    };
    componentDidMount() {
        this.getValidateCode();
        console.log(this.props.history)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const userIcon = <span styleName="validate-icon user"></span>
        const pwdIcon = <span styleName="validate-icon pwd"></span>
        const validateIcon = <span styleName="validate-icon validate"></span>
        const validateCode = <span styleName="validate-icon code" onClick={() => { this.getValidateCode() }}><img src={this.state.validateCode} alt="" /></span>

        return (
            <div styleName="login-box">
                <div styleName="logo-div">
                    <img src={logo} alt="" />
                </div>
                <div className="flex flex-col align-item-center" styleName="login-box-child">
                    <div styleName="login-box-title">登录</div>
                    <Form onSubmit={this.handleSubmit} styleName="login-form">
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input
                                    prefix={userIcon}
                                    placeholder="请输入用户名"
                                    autoComplete="off"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    // { pattern: com_const.reg_pwd, message: '密码格式错误' }
                                ],
                            })(
                                <Input.Password
                                    prefix={pwdIcon}
                                    placeholder="请输入密码"
                                    autoComplete="new-password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入验证码' }],
                            })(
                                <Input
                                    maxLength={4}
                                    prefix={validateIcon}
                                    suffix={validateCode}
                                    placeholder="请输入验证码"
                                    autoComplete="off"
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
    getValidateCode = () => {
        let validateCode = baseURL + '/login/getKaptcha?t=' + new Date();
        this.setState({
            validateCode: validateCode,
        })
    }
    // 提交登录
    handleSubmit = e => {
        const { history } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                apis.login.login(values).then(res => {
                    let userInfo = res.data;
                    // this.props.saveUserInfo(JSON.stringify(userInfo));
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    store.dispatch(setToken(userInfo.token));
                    history.push('/index');
                    // 获取用户已收录列表
                    store.dispatch(getCollectedClues());
                    // history.go(0)
                }).catch(res => {
                    // console.log(res, 'login_err')
                    message.warning(res.msg);
                    this.getValidateCode();
                })
            }
        });
    };

}

export default Form.create({ name: 'normal_login' })(LoginMain);
