import axios from 'axios';
import Util from '@/utils';
import history from '@/utils/history';
import { message } from 'antd';

const instance = axios.create({
    baseURL: '',
    timeout: 60000
});

const requestWithToken = (config) => {
    let token = Util.getLocalItem('token');
    if (token) {
        config.headers['M-Token'] = token;
    } else {
        window.location.path = '/login';
    }
    return config;
};

// 每次请求都带上token
instance.interceptors.request.use(config => {
    config = requestWithToken(config);

    return config;
}, error => {
    return Promise.reject(error);
});

// 处理返回结果
instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                window.localStorage.clear();
                history.replace('/login');
                break;
            case 500:
                message.error(error.response.data.message);
                break;
        }
    } else if (error.code === 'ECONNABORTED') {
        message.error('请求超时，请稍后再试');
    }

    return Promise.reject(error.response);
});

export default instance;
