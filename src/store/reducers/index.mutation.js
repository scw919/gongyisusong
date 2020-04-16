// 变异状态 例子：
export default {
    name: 'index',
    mutations: {
        getIndexData_part_1(state, action) {
            return {
                ...state,
                part_1_data_index: action.payload.value,
            };
        },
        getIndexData_part_2(state, action) {
            return {
                ...state,
                part_2_data_index: action.payload.value,
            };
        },
        // changetabs_part_2
        changetabs_part_2(state, action) {
            let new_part2_tabs = Object.assign(state.part_2_tabs, action.payload.value);

            return {
                ...state,
                part_2_tabs: new_part2_tabs,
            };
        },
    },
};
