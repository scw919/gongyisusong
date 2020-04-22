import httpAjax from '@/zTool/httpAjax.js';
export default {
    name: 'login',
    apis: {
        // 获取验证码 /login/getKaptcha
        getKaptcha() {
            return httpAjax(
                'get',
                `/login/getKaptcha?t=${new Date()}`,
                {},
                {
                    baseURL: 'http://172.16.121.73:8763',
                    headers: {
                        'Content-Type': 'image/jpeg;charset=UTF-8',
                        'transfer-encoding': 'chunked',
                    },
                    transformResponse: [
                        function (data) {
                            // 这里提前处理返回的数据
                            return {
                                code: 0,
                                data: data,
                            };
                        },
                    ],
                },
            );
        },
        // 登录 /login/getLoginUserInfo
        login(query) {
            return httpAjax('post', '/login/getLoginUserInfo', query, { baseURL: 'http://172.16.121.73:8763' });
        },
    },
};
