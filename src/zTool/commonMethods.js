import store from '@/store';
import { zTool } from 'zerod';
// actions
import { changeMenuIndex, changeBreadCrumb } from '@/store/actions';
const matchUrlToMenu = function (match) {
    let newMenuIndex,
        cur_url = match.url;
    console.log(cur_url, 'cur_url');
    switch (cur_url) {
        case '/index':
            newMenuIndex = 0;
            break;
        case '/main':
            newMenuIndex = 1;
            break;
    }
    console.log(newMenuIndex);
    store.dispatch(changeMenuIndex(newMenuIndex));
};
const createBreadCrumb = function (main, location, mainRoutes) {
    const IndexRoute = { path: main.path, pathName: '线索管理', index: 0 };
    let curPath = location.pathname,
        matchRoutes = [];
    mainRoutes.map((item) => {
        let index = curPath.lastIndexOf(item.path);
        if (index > -1) {
            let newItem = zTool.deepCopy(item);
            newItem.path = `${main.path}${item.path}`;
            // item.path = (main.path||'') + item.path;
            matchRoutes.push(newItem);
        }
    });
    matchRoutes = matchRoutes.sort(function (a, b) {
        return a.path.length - b.path.length;
    });
    matchRoutes.unshift(IndexRoute);
    console.log(matchRoutes, 'commonMethods111111111111111111111');
    // console.log(main, location, mainRoutes, 'commonMethods');
    store.dispatch(changeBreadCrumb(matchRoutes));
};
const commonMethods = {
    matchUrlToMenu: matchUrlToMenu,
    createBreadCrumb: createBreadCrumb,
};
export default commonMethods;
