import * as types from './type';
import DashboardService from '@/services/dashboardService';

export const getDashboardInfo = (params) => {
    return async dispatch => {
        const response = await DashboardService.getInfo(params);
        const result = response.data.result || {};
        dispatch({
            type: types.DASHBOARD_INFO,
            info: result,
        });
    };
};
