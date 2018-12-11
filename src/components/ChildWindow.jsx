import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import './ChildWindow.scss';
import history from '@/utils/history';

class ChildWindow extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        childRoutePath: PropTypes.string.isRequired,
        parentRoutePath: PropTypes.string
    }

    constructor (props) {
        super(props);
        this.state = {
            isShow: false,
            unlisten: null
        };
    }

    componentDidMount () {
        this.shouldShowChildWindow();
        const unlisten = history.listen(() => {
            this.shouldShowChildWindow();
        });
        this.setState({ unlisten: unlisten });
    }

    componentWillUnmount () {
        this.state.unlisten();
    }

    shouldShowChildWindow () {
        this.setState({ isShow: history.location.pathname === this.props.childRoutePath });
    }

    handleClose () {
        this.setState({ isShow: false });

        this.props.parentRoutePath ? history.replace(this.props.parentRoutePath) : history.go(-1);
    }

    render () {
        return (
            <CSSTransitionGroup
                transitionName="child-window"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={600}>
                {
                    this.state.isShow &&
                    <div className="child-window">
                        <div className="header clearfix">
                            <div className="pull-left lh60 p-l-26">
                                <span className="f16">{this.props.title}</span>
                            </div>
                            <div className="pull-right p-r-20 f14 lh60 hand" onClick={this.handleClose.bind(this)}>
                                <i className="fa fa-compress f14 c-blue"></i>&nbsp;&nbsp;退出
                            </div>
                        </div>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                }
            </CSSTransitionGroup>
        );
    }
}

export default ChildWindow;
