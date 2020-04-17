import { message } from 'antd';
import httpAjax from '@/zTool/httpAjax.js';
export default {
    name: 'main',
    apis: {
        //线索发现 - 输入框输入提示数据获取
        clueSuggestion(query) {
            return httpAjax('post', '/clue/suggestion', query);
        },
        // 搜索条件数据列表获取 /clue/param
        clueParams() {
            return httpAjax('get', '/clue/param');
        },
        //线索发现 - 搜索
        clueSearch(query) {
            return httpAjax('post', '/clue/search', query);
        },
        // 查询当前用户所有收录的线索 /clue/findUserClue
        clueFindUserClue(query) {
            return httpAjax('post', '/clue/findUserClue', query);
        },
        // 线索发现-收录/取消收录线索 /clue/includedClue
        includedClue(query) {
            return httpAjax('post', '/clue/includedClue', query);
        },
        // 获取线索详情
        getDetail(query) {
            return httpAjax('get', `/clue/getDetail/${query.id}`);
        },
    },
};
