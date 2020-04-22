import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Upload } from 'antd';
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
        fileList: PropTypes.array,
        filePath: PropTypes.string,
    };
    static defaultProps = {
        fileList: [],
        filePath: "",
        disabled: false,
    }
    state = {
        fileList: [],
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.filePath && 
            nextProps.filePath != "null"&&
            (this.props.filePath != nextProps.filePath)) {
            let fileList = this.getFileList(nextProps.filePath, true);
            this.setState({
                fileList: fileList
            });
        }
    }
    render() {
        const {
            disabled
        } = this.props;
        const { fileList } = this.state;
        return (
            <div className="flex" styleName="file-manage file-list">
                {fileList.map((file, index) => {
                    return (
                        <AfileShow
                            disabled={disabled}
                            delete={this.deleteFile}
                            key={index}
                            {...file}
                        />
                    )
                })}
                <Upload
                    action=""
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
        return getFileList(path, isSelfUpload)
    }
    // 根据uid删除文件
    deleteFile = (uid) => {
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        newFileList = newFileList.filter(item => {
            return item.uid != uid
        })
        console.log(uid, newFileList);
        this.setState({
            fileList: newFileList
        })
        this.getNewFilePath(newFileList);
    }
    // 获取新的文件列表
    getNewFileList = (name, uid, size, url) => {
        const { fileList } = this.state;
        let newFileList = zTool.deepCopy(fileList);
        newFileList.push({
            uid: uid,
            name: name,
            size: fileSizeChange(size),
            url: url,
        })
        this.setState({
            fileList: newFileList
        });
        this.getNewFilePath(newFileList);
    }
    // 自定义上传文件
    customRequest = (params) => {
        const file = params.file;
        let formData = new FormData();
        formData.append("fName", file);
        console.log(params);
        apis.upload.upload(formData, {}).then((res) => {
            // console.log(res.success)
            // let fileList = this.state.fileList;
            this.getNewFileList(file.name, file.uid, file.size, res.data);
        })
    }
    // 文件上传改变
    handleChangeFile = (fileList) => {
        console.log(fileList);
        // let newFile = fileList.file.response;
        // let stateFileList = this.state.fileList;
        // stateFileList.push(newFile);
        // console.log(stateFileList);
        // this.setState({ fileList: stateFileList });
    }
    // 拼接新的文件 path 返回父组件
    getNewFilePath = (fileList) => {
        let collUploadFile = "";
        fileList.map((file, index) => {
            collUploadFile += `${index > 0 ? ',' : ''}${file.url}?fileName=${file.name}?uid=${file.uid}?size=${file.size}`
        })
        this.props.updateFilePath(collUploadFile);
    }
}

export default {
    name: 'Aupload',
    component: Aupload,
};