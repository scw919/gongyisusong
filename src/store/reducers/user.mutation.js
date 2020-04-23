export default {
    name: 'user',
    mutations: {
        setToken (state, action) {
            return {
                ...state,
                token: action.payload.value,
                isLogin: Boolean(action.payload.value)
            };
        }
    },
};
