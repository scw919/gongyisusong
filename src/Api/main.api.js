// import { message } from 'antd';
import { main_base } from './base_config';
import httpAjax from '@/zTool/httpAjax.js';

export default {
    name: 'main',
    apis: {
        //线索发现 - 输入框输入提示数据获取
        clueSuggestion(query) {
            return httpAjax('post', main_base+'/clue/suggestion', query);
        },
        // 搜索条件数据列表获取 /clue/param
        clueParams(query) {
            return httpAjax('get', main_base+'/clue/param', query);
        },
        // 线索发现 - 搜索
        clueSearch(query) {
            return httpAjax('post', main_base+'/clue/search', query);
        },
        // 查询当前用户所有收录的线索 /clue/findUserClue
        clueFindUserClue(query) {
            return httpAjax('post', main_base+'/clue/findUserClue', query);
        },
        // 线索发现-收录/取消收录线索 /clue/includedClue
        includedClue(query) {
            return httpAjax('post', main_base+'/clue/includedClue', query);
        },
        // 获取线索详情
        getDetail(query) {
            return httpAjax('get', `${main_base}/clue/getDetail/${query.id}`);
        },
        // 修改线索详情 /clue/editDetail
        editDetail(query) {
            return httpAjax('post', main_base+'/clue/editDetail', query);
        },
        // 获取线索集合展示列表 /ClueCollection/getRelations
        getRelations(query) {
            return httpAjax('post', main_base+'/ClueCollection/getRelations', query);
        },
        // 线索集合名字重复性查询 /ClueCollection/checkName/{name}
        checkCollectionName(query) {
            return httpAjax('get', `${main_base}/ClueCollection/checkName/${query.name}`);
        },
        // 线索关联-新增线索集合 /ClueCollection/saveCollect
        saveCollect(query) {
            return httpAjax('post', main_base+'/ClueCollection/saveCollect', query);
        },
        // 线索关联到集合 /ClueCollection/addClueToColl
        addClueToColl(query) {
            return httpAjax('post', main_base+'/ClueCollection/addClueToColl', query);
        },

        // 线索集合 -分页 /ClueCollection/getCollPage
        getClueCollection(query) {
            return httpAjax('post', main_base+'/ClueCollection/getCollPage', query);
        },
        // 获取线索集合详情 /ClueCollection/{id}
        getClueCltDetail(query) {
            return httpAjax('get', `${main_base}/ClueCollection/${query.id}`);
        },
        // 线索集合详情-保存 /ClueCollection/saveColl
        saveColl(query) {
            return httpAjax('post-params', main_base+'/ClueCollection/saveColl', query);
        },
        // 线索集合 - 废弃 /ClueCollection/disabled/{id}
        disabledClueCollection(query) {
            return httpAjax('post', `${main_base}/ClueCollection/disabled/${query.id}`);
        },
        // 线索集合 - 启用 /ClueCollection/enabled/{id}
        enabledClueCollection(query) {
            return httpAjax('post', `${main_base}/ClueCollection/enabled/${query.id}`);
        },
        // 线索集合 - 删除 /ClueCollection/{id}
        deleteClueCollection(query) {
            return httpAjax('delete', `${main_base}/ClueCollection/${query.id}`);
        },
        // 线索集合详情-线索删除 /ClueCollection/dleCollClue/{id}
        deleteClue(query) {
            return httpAjax('delete', `${main_base}/ClueCollection/dleCollClue/${query.id}`);
        },
    },
};
