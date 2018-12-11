import React from 'react';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router';
import Util from '@/utils';
import './style.scss';

class LoginMain extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount () {

    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ token: values.username });
                Util.setLocalItem('token', values.username);
            }
        });
    }

    render () {
        let { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.state.token) {
            return <Redirect to={from} />;
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item className="title text-center bold">
                        系统登录
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                            initialValue: 'admin'
                        })(
                            <Input
                                placeholder="用户名" size="large"
                                prefix={<i className="fa fa-user" style={{ color: '#889aa4' }} />}>
                            </Input>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                            initialValue: 'password'
                        })(
                            <Input
                                placeholder="密码" size="large" type="password"
                                prefix={<i className="fa fa-lock" style={{ color: '#889aa4' }} />}>
                            </Input>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" style={{ width: '100%'}}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
}

export default Form.create()(LoginMain);
