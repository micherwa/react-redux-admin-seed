import React, { Component } from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import RouteWithSubRoutes from '@/components/RouteWithSubRoutes';
import history from '@/utils/history';
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
            unlisten: null
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

        const arr = [];
        for (let i = 0; i < route.length; i++) {
            if (route[i] === '/') {
                break;
            }
            arr.push(route[i]);
        }
        this.setState({ menuItemkey: arr.join('')});
    }

    render () {
        return (
            <Layout className="home">
                <Header className="c-white clearfix header">
                    <div className="pull-left f20 w210 text-center">
                        Lilith 广告投放配置平台
                    </div>
                    <span className="pull-right avatar m-l-10 m-t-12">
                        <img className="img-responsive" src={ this.state.avatarUrl } />
                    </span>
                    <span className="pull-right f14">Hi, {this.state.userName}</span>
                </Header>
                <Layout>
                    <Sider width={ 180 }>
                        <Menu
                            mode="inline" theme="dark"
                            selectedKeys={[ this.state.menuItemkey ]} defaultOpenKeys={['master-manager']}
                            style={{ height: '100%' }}>
                            <Menu.Item key="dashboard">
                                <Link to="/dashboard">首页</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="home-content">
                        <Content style={{ height: this.state.mainHeight }}>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
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
