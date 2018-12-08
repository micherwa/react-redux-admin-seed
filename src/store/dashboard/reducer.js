import * as types from './type';

const defaultState = {
    info: {}
};

export const dashboardData = (state = defaultState, action) => {
    switch (action.type) {
        case types.DASHBOARD_INFO:
            return {...state, ...action};
        default:
            return state;
    }
};
