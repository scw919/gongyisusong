// 变异状态 例子：
export default {
    name: 'evaluate',
    mutations: {
        changeInput1(state, action) {
            return {
                ...state,
                currentValue: action.payload.value,
            };
        },
        changeInput2(state, action) {
            return {
                ...state,
                maxValue: action.payload.value,
            };
        },
        changePwdInput(state, action) {
            return {
                ...state,
                userName: Number(action.payload.value),
            };
        },
        changeCollapsed(state, action) {
            return {
                ...state,
                collapsed: Boolean(action.payload.value),
            };
        },
        changeMenuIndex(state, action) {
            return {
                ...state,
                menuIndex: Number(action.payload.value),
            };
        },
    },
};
