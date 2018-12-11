import React, { Component } from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import RouteWithSubs from '@/components/RouteWithSubs';
import history from '@/utils/history';
import Util from '@/utils';
import routes from '@/routers';
import './style.scss';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            mainHeight: 0,
            menuItemkey: '',
            avatarUrl: '',
            userName: '用户名',
            unlisten: null,
            token: Util.getLocalItem('token')
        };
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleResize.bind(this));

        this.handleResize();

        this.setMenuDefaultKey();
        this.state.unlisten = history.listen(() => {
            this.setMenuDefaultKey();
        });
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize.bind(this));
        this.state.unlisten();
    }

    handleResize () {
        this.setState({ mainHeight: document.documentElement.scrollHeight - 64 });
    }

    setMenuDefaultKey () {
        let route = history.location.pathname.substring(1);

        if (route.indexOf('subnav/') > -1) {
            route = route.replace('subnav/', '');
        }

        const arr = [];
        for (let i = 0; i < route.length; i++) {
            if (route[i] === '/') {
                break;
            }
            arr.push(route[i]);
        }
        this.setState({ menuItemkey: arr.join('')});
    }

    handleClickDropMenu ({ key }) {
        if (key === 'logout') {
            Util.removeLocalItem('token');
            this.setState({ token: '' });
        }
    }

    render () {
        const menu = (
            <Menu onClick={this.handleClickDropMenu.bind(this)}>
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        );

        if (!this.state.token) {
            return <Redirect to="/login" />;
        }

        return (
            <Layout className="home">
                <Header className="c-white clearfix header">
                    <div className="pull-left f20 w210">
                        后台管理系统
                    </div>
                    <Dropdown overlay={ menu }>
                        <span className="pull-right avatar m-l-10 m-t-12 hand">
                            <img className="img-responsive" src={ this.state.avatarUrl } />
                        </span>
                    </Dropdown>
                    <span className="pull-right f14">Hi, { this.state.userName }</span>
                </Header>
                <Layout>
                    <Sider width={ 180 }>
                        <Menu
                            mode="inline" theme="dark"
                            selectedKeys={[ this.state.menuItemkey ]} defaultOpenKeys={['subnav']}
                            style={{ height: '100%' }}>
                            <Menu.Item key="dashboard">
                                <Link to="/dashboard">dashboard</Link>
                            </Menu.Item>
                            <SubMenu key="subnav" title={<span>subnav</span>}>
                                <Menu.Item key="option1">
                                    <Link to="/subnav/option1">option1</Link>
                                </Menu.Item>
                                <Menu.Item key="option2">
                                    <Link to="/subnav/option2">option2</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="home-content">
                        <Content style={{ height: this.state.mainHeight }}>
                            {routes.map((route, i) => (
                                <RouteWithSubs key={i} {...route} />
                            ))}
                            <Route path="/" exact render={() => (<Redirect to="/dashboard" />)} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Home;
