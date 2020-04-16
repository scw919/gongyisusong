// /gzwjc-miniprogram-wisdom/file/upload
import httpAjax from '@/zTool/httpAjax.js';
export default {
    name: 'upload',
    apis: {
        //上传文件
        upload(query) {
            return httpAjax('post', '/gzwjc-miniprogram-wisdom/file/upload', query, {baseUrl: 'https://172.16.121.18:8904'});
        },
    },
};
