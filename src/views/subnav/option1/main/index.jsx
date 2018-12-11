import React from 'react';
import { Button } from 'antd';
import ChildWindow from '@/components/ChildWindow';
import RouteWithSubs from '@/components/RouteWithSubs';
import history from '@/utils/history';

class Option1 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            childWindow: {
                title: '子层标题',
                childRoutePath: '/subnav/option1/detail'
            }
        };
    }

    handleOpenChild () {
        history.push(this.state.childWindow.childRoutePath);
    }

    render () {
        return (
            <div>
                option1<br/>

                <Button type="primary" onClick={this.handleOpenChild.bind(this)}>打开子层</Button>

                <ChildWindow title={this.state.childWindow.title} childRoutePath={this.state.childWindow.childRoutePath}>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubs key={i} {...route} />
                    ))}
                </ChildWindow>
            </div>
        );
    }
}

export default Option1;
