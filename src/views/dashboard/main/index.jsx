import React from 'react';
import { connect } from 'react-redux';
import { getDashboardInfo } from '@/store/dashboard/action';
import { Button } from 'antd';

@connect(({ dashboardData }) => ({ dashboardInfo: dashboardData.info }), { getDashboardInfo })

class DashboardMain extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.getDashboardInfo();
    }

    render () {
        return (
            <div>
                dashboard<br/>

                <div className="test">gridData: {JSON.stringify(this.props.dashboardInfo)}</div>
            </div>
        );
    };
}

export default DashboardMain;
