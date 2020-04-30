import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Icon, Button, Upload, message } from 'antd';
import { AfileShow } from '../AfileShow';
import './style.scss';
// 工具
import { zTool } from 'zerod';
import commonMethods from '@/zTool/commonMethods.js';
const { fileSizeChange, getFileList } = commonMethods;
// 接口
import apis from '@/App.api.js';

class Aupload extends React.Component {
    static propTypes = {
        updateFilePath: PropTypes.func,
        disabled: PropTypes.bool,
        accept: PropTypes.string,
        fileList: PropTypes.array,
        filePath: PropTypes.string,
    };
    static defaultProps = {
        accept: '.jpg,.doc,.docx,.pdf',
        fileList: [],
        filePath: "",
        disabled: false,
    }
    filePath = "";
    state = {
        fileList: [],
        timestamp: null, // 驱动页面刷新
    }
    uploadingFiles = {};  //记录正在上传的文件
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps.filePath)
        if (nextProps.filePath &&
            nextProps.filePath != "null" &&
            (this.props.filePath != nextProps.filePath)) {
            this.filePath = nextProps.filePath;
            let fileList = this.getFileList(nextProps.filePath, true);
            this.setState({
                fileList: fileList
            });
        }
    }
    render() {
        const {
            accept,
            disabled
        } = this.props;
        const { fileList } = this.state;
        return (
            <div className="flex" styleName="file-manage file-list">
                {fileList.map((file, index) => {
                    return file.name ? (
                        <AfileShow
                            disabled={disabled}
                            delete={this.deleteFile}
                            key={index}
                            {...file}
                        />
                    ) : null
                })}
                <Upload
                    action=""
                    accept={accept}
                    customRequest={this.customRequest}
                    showUploadList={false}
                    fileList={fileList}
                    onChange={this.handleChangeFile}
                >
                    <Button styleName="upload-btn">
                        <Icon type="upload" />
                            支持扩展名： .doc .docx .pdf .jpg
                        </Button>
                </Upload>
            </div>
        );
    }
    getFileList = (path, isSelfUpload) => {
        let fileList = getFileList(path, isSelfUpload);
        // console.log(fileList);
        for (let uid in this.uploadingFiles) {
            fileList.push(this.uploadingFiles[uid]);
        }
        return fileList;
    }
    // 根据uid删除文件
    deleteFile = (uid, percent, cancel) => {
        if (percent < 100) { //删除下载文件时 触发
            cancel && cancel();
        }
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        newFileList = newFileList.filter(item => {
            return item.uid != uid
        })
        this.setState({
            fileList: newFileList
        })
        this.filePath = "";
        if (newFileList.length > 0) {
            //删除操作之后重新拼接文件url集合
            newFileList.forEach(element => {
                if (element.url) {
                    console.log(element, 'delete file')
                    this.getNewFilePath(element.name, element.uid, element.size || 0, element.url);
                }
            });
        }
        this.emitFilePath(this.filePath);
    }

    // 自定义上传文件
    customRequest = (params) => {
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        let CancelToken = axios.CancelToken;
        let cancel = new CancelToken(function executor(c) {
            params.file.cancel = c
            // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
        })
        const file = params.file;
        let uploadFile = {
            name: file.name,
            size: fileSizeChange(file.size),
            uid: file.uid,
            cancel: file.cancel,
            percent: file.percent || 0
        }
        this.uploadingFiles[file.uid] = uploadFile;  //记录正在上传的文件
        newFileList.push(uploadFile);
        // console.log(newFileList)
        this.setState({
            fileList: newFileList
        })
        let formData = new FormData();
        formData.append("fName", file);
        apis.upload.upload(formData, (progressEvent) => { //文件上传进度展示
            let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
            uploadFile.percent = percent;
            this.setState({
                timestamp: new Date().getTime()
            })
        }, cancel).then((res) => {
            delete this.uploadingFiles[file.uid]; //清除该文件在正在上传的列表记录
            this.getNewFilePath(file.name, file.uid, file.size, res.data);
            this.emitFilePath(this.filePath);
            this.setState({
                fileList: this.getFileList(this.filePath, true)
            });
        }).catch(err => {
            console.log(err);
            message.warning('上传失败！');
            setTimeout(_ => {
                this.deleteFile(file.uid)
            }, 1000)
        })
    }
    // 文件上传改变
    handleChangeFile = (info) => {
        const { file, fileList, event } = info;
    }
    // 拼接新的文件 path 返回父组件
    getNewFilePath = (name, uid, size, url) => {
        if (!this.filePath) {
            this.filePath = `${url}?fileName=${name}?uid=${uid}?size=${size}`;
        } else {
            this.filePath += `,${url}?fileName=${name}?uid=${uid}?size=${size}`;
        }
    }
    // path 返回父组件
    emitFilePath = (path) => {
        this.props.updateFilePath(path.replace(/\&/g, "%26"));
    }
}

export default {
    name: 'Aupload',
    component: Aupload,
};