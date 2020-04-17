export default {
    name: 'find',
    mutations: {
        getCollectedClues(state, action) {
            return {
                ...state,
                collectClues: action.payload,
            };
        },
    },
};
