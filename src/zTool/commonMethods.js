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
    curPath = curPath.indexOf('Detail/') > -1 ? curPath.split('Detail/')[0]+'Detail/:id' : curPath;
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
    console.log(mainRoutes,matchRoutes, 'commonMethods111111111111111111111');
    // console.log(main, location, mainRoutes, 'commonMethods');
    store.dispatch(changeBreadCrumb(matchRoutes));
};
// 文件字节转换
const fileSizeChange = (limit) => {
    var size = '';
    if (limit < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = limit.toFixed(2) + 'B';
    } else if (limit < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + 'KB';
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
    } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }

    var sizeStr = size + ''; //转成字符串
    var index = sizeStr.indexOf('.'); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    if (dou == '00') {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;
};

// 根据文件url 下载文件
const downloadFileByUrl = {
    getBlob: (url, cb) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (xhr.status === 200) {
                cb(xhr.response);
            }
        };
        xhr.send();
    },

    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} filename 想要保存的文件名称
     */
    saveAs: (blob, filename) => {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement('a');
            var body = document.querySelector('body');

            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // fix Firefox
            link.style.display = 'none';
            body.appendChild(link);

            link.click();
            body.removeChild(link);

            window.URL.revokeObjectURL(link.href);
        }
    },

    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} filename 想要保存的文件名称
     */
    download: (url, filename) => {
        downloadFileByUrl.getBlob(url, (blob) => {
            downloadFileByUrl.saveAs(blob, filename);
        });
    },
};
// 根据返回的文件字符串解析 list
const getFileList = (path, isSlefUpload) => {
    //isSelfUpload 判断是否是自己上传的 不是 不包含 uid size
    let fileList = [];
    if (path && path.length > 0) {
        let pathList = path.split(',');
        let nameReg = '?fileName=',
            uidReg = '?uid=',
            sizeReg = '?size=';
        if (isSlefUpload) {
            pathList.map((item, index) => {
                fileList.push({
                    url: item.split(nameReg)[0],
                    name: item.split(nameReg)[1].split(uidReg)[0],
                    uid: item.split(uidReg)[1].split(sizeReg)[0],
                    size: item.split(sizeReg)[1],
                });
            });
            return fileList;
        } else {
            pathList.map((item, index) => {
                fileList.push({
                    url: item.split(nameReg)[0],
                    name: item.split(nameReg)[1],
                    size: '',
                    uid: '',
                });
            });
            return fileList;
        }
    } else {
        return fileList;
    }
};

const commonMethods = {
    matchUrlToMenu: matchUrlToMenu,
    createBreadCrumb: createBreadCrumb,
    downloadFile: downloadFileByUrl.download,
    fileSizeChange: fileSizeChange,
    getFileList: getFileList,
};
export default commonMethods;
