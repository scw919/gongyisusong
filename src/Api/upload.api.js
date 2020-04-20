// /gzwjc-miniprogram-wisdom/file/upload
import httpAjax from '@/zTool/httpAjax.js';
export default {
    name: 'upload',
    apis: {
        //上传文件
        upload(query) {
            return httpAjax('post', '/file/upload', query, {
                headers:{
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarymS7TlCNHkMnROj3Y'
                }
            });
        },
    },
};
