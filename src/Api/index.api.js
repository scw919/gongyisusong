import httpAjax from '@/zTool/httpAjax.js';
import { index_base } from './base_config';
export default {
    name: 'index',
    apis: {
        //part-1
        getFirstSurvey(query) {
            return httpAjax('post', index_base + '/getFirstSurvey', query);
        },
        // part-2
        getEachSituation(query) {
            return httpAjax('post', index_base + '/getEachSituation', query);
        },
        // part-3
        getClueGeneralTrend(query) {
            return httpAjax('post', index_base + '/getClueGeneralTrend', query);
        },
    },
};
