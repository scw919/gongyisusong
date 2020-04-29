export default {
    name: 'find',
    mutations: {
        // 获取已收藏
        getCollectedClues(state, action) {
            return {
                ...state,
                collectClues: action.payload,
            };
        },
        // 获取筛选列表 全部 
        getConditions(state, action) {
            return {
                ...state,
                conditionsList: action.payload['conditionsList'],
            };
        },
        // 获取筛选列表 已收藏 
        getConditionsMy(state, action) {
            return {
                ...state,
                conditionsListMy: action.payload['conditionsList'],
            };
        },
    },
};
