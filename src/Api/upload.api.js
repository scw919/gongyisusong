// /gzwjc-miniprogram-wisdom/file/upload
import httpAjax from '@/zTool/httpAjax.js';
import { index_base } from './base_config';
export default {
    name: 'upload',
    apis: {
        //上传文件
        upload(query) {
            return httpAjax('post', index_base + '/file/upload', query, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarymS7TlCNHkMnROj3Y',
                },
            });
        },
    },
};
