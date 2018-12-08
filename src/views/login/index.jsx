import React from 'react';
import { Button } from 'antd';
import { Redirect } from 'react-router';
import Util from '@/utils';

class NoAuthMain extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount () {
        this.setToken();
    }

    setToken () {
        this.setState({ token: Util.getLocalItem('token') });
    }

    handleClick () {
        Util.setLocalItem('token', '1');
        this.setToken();
    }

    render () {
        let { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.state.token) {
            return <Redirect to={from} />;
        }

        return (
            <div className="text-center" style={{ paddingTop: '100px' }}>
                <h2>暂无权限（目前用token失效模拟，跳转至本界面）</h2><br/>
                <Button type="primary" onClick={this.handleClick.bind(this)}>临时登录入口，之后会去掉</Button>
            </div>
        );
    };
}

export default NoAuthMain;
