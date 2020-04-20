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
        // 获取线索集合展示列表 /ClueCollection/getRelations
        getRelations(query) {
            return httpAjax('post', '/ClueCollection/getRelations', query);
        },
        // 获取线索集合详情 /ClueCollection/{id}
        getClueCollection(query) {
            return httpAjax('get', `/ClueCollection/${query.id}`);
        },
        // 线索集合名字重复性查询 /ClueCollection/checkName/{name}
        checkCollectionName(query) {
            return httpAjax('get', `/ClueCollection/checkName/${query.name}`);
        },
        // 线索关联-新增线索集合 /ClueCollection/saveCollect
        saveCollect(query) {
            return httpAjax('post', '/ClueCollection/saveCollect', query);
        },
        // 线索关联到集合 /ClueCollection/addClueToColl
        addClueToColl(query) {
            return httpAjax('post', '/ClueCollection/addClueToColl', query);
        },
    },
};
