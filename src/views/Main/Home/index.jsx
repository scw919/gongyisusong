import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { pwdChange } from '@/store/actions';

// import compnents from '@/components/load-components.js'
// const { Aexample }=compnents;
import { ZpageHeader } from 'zerod';
const HomeIndex = (props) => (
    < div >
        <button onClick={() => { props.history.push({ pathname: '/main/test1', params: { a: 123 } }); }}>跳转</button>
        <ZpageHeader title="运维管理中心"
            breadcrumbRoutes={[
                { name: '首页', link: false },
                { name: 'test1', link: true, path: '/test1', params: { a: 1 } }
            ]}
            // breadcrumbParams={{
            //     params: { a: 1 }
            // }}
            content="运维管理中心主要提供后台运维人员使用相关功能。"
        >
        </ZpageHeader>
        <Demo userName={props.userName} pwdChange={props.pwdChange} />
    </div >
);
const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName
    });
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => ({
    pwdChange: (...args) => dispatch(pwdChange(...args)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Demo = (props) => {
    const { userName, pwdChange } = props;
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const changePwd = (value) => {
        console.log(value);
        pwdChange(value);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input value={userName} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(e) => { changePwd(e.target.value); }} />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
