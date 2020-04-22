export default {
    name: 'user',
    mutations: {
        saveToken(state, action) {
            return {
                ...state,
                token: action.payload.value,
            };
        },
        removeToken(state, action) {
            return {
                ...state,
                token: null,
            };
        },
    },
};
