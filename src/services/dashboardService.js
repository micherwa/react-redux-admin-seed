import axios from '@/utils/http.js';

export default {
    getInfo (params = {}) {
        return axios.get('/mock/dashboardInfo', { params });
    }

};
