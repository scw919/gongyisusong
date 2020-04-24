import httpAjax from '@/zTool/httpAjax.js';
import { login_url, login_base } from './base_config';
const config = login_url ? { baseURL: login_url } : {};

export default {
    name: 'login',
    apis: {
        // 登录 /login/getLoginUserInfo
        login(query) {
            return httpAjax('post', login_base + '/login/getLoginUserInfo', query, config);
        },
    },
};
