// 侧边导航缩伸缩
export const changeCollapsed = (value) => ({
    type: 'evaluate.changeCollapsed',
    payload: {
        value,
    },
});
// 头部导航菜单 index
export const changeMenuIndex = (value) => ({
    type: 'evaluate.changeMenuIndex',
    payload: {
        value,
    },
});

// changeBreadCrumb
export const changeBreadCrumb = (value) => ({
    type: 'evaluate.changeBreadCrumb',
    payload: {
        value,
    },
});
// 首页数据获取
export const getIndexData_part_1 = (value) => {
    return {
        type: 'index.getIndexData_part_1',
        payload: {
            value,
        },
    };
};
export const changetabs_part_2 = (value) => {
    return {
        type: 'index.changetabs_part_2',
        payload: {
            value,
        },
    };
};
export const getIndexData_part_2 = (value) => {
    return {
        type: 'index.getIndexData_part_2',
        payload: {
            value,
        },
    };
};
