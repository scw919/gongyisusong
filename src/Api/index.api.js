import httpAjax from '@/zTool/httpAjax.js';
export default {
    name: 'index',
    apis: {
        //part-1
        getFirstSurvey(query) {
            return httpAjax('post', '/getFirstSurvey', query);
        },
        // part-2
        getEachSituation(query) {
            return httpAjax('post', '/getEachSituation', query);
        },
        // part-3
        getClueGeneralTrend(query) {
            return httpAjax('post', '/getClueGeneralTrend', query);
        }
    },
};
