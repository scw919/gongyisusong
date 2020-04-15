// 例子：
export const numberChange1 = (value) => ({
    type: 'evaluate.changeInput1',
    payload: {
        value,
    },
});
export const numberChange2 = (value) => ({
    type: 'evaluate.changeInput2',
    payload: {
        value,
    },
});

export const pwdChange = (value) => ({
    type: 'evaluate.changePwdInput',
    payload: {
        value,
    },
});

export const changeCollapsed = (value) => ({
    type: 'evaluate.changeCollapsed',
    payload: {
        value,
    },
});

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