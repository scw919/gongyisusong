import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Progress } from 'antd';
import './style.scss';
import commonMethods from '@/zTool/commonMethods.js';
const { downloadFile, fileSizeChange } = commonMethods;
import pngIcon from '@/assets/images/detail/picture.png';
import pdfIcon from '@/assets/images/detail/pdf.png';
import videoIcon from '@/assets/images/detail/video.png';
import wordIcon from '@/assets/images/detail/word.png';
// import doc from '@/assets/doc.doc';

export class AfileShow extends React.Component {
    static propTypes = {
        type: PropTypes.string,  // 文件类型
        size: PropTypes.string,  // 文件大小
        name: PropTypes.string,  // 文件名
        url: PropTypes.any,      // 文件路径
        disabled: PropTypes.bool // 是否禁用 （文件上传组件含有的状态  控制icon操作显示）
    };
    static defaultProps = {
        disabled: false
    }
    state = {
        previewVisible: false,
        previewImage: null,
        percent: 0
    }
    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps != prevProps) {
            this.setState({
                percent: nextProps.percent
            })
        }
    }
    render() {
        const {
            name,
            type,
            size,
            url,
            uid,
            status,
            cancel,
            disabled
        } = this.props;
        // console.log(this.props);
        // console.log(this.props)
        const { previewVisible, previewImage, percent } = this.state;
        return (
            <div className="relative" styleName="file-box">
                {/* handleIcon */}
                <div className="absolute" styleName="handle-modal">
                    <div className="flex align-item-center just-con-center">
                        {
                            this.getFileType(name, 'docx') || percent ? null
                                : <Icon onClick={(e) => {
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                    this.handlePreview(url)
                                }} type="eye" />
                        }
                        {
                            (disabled || this.getFileType(name, 'docx'))&&!percent?
                                <Icon onClick={(e) => {
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                    downloadFile(url, name)
                                }} type="download" /> : null
                        }
                        {
                            !disabled ?
                                <Icon onClick={(e) => {
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                    this.props.delete(uid, percent, cancel)
                                }} type="delete" /> : null
                        }
                    </div>
                </div>
                {this.renderImg(name)}
                {
                    (percent && percent < 100) ? (
                        <div>
                            <Progress type="circle" percent={percent} width={40} />
                        </div>
                    ) : (
                            <div>
                                <p title={name} className="ellipsis">{name}</p>
                                <p>({fileSizeChange(size)})</p>
                            </div>
                        )
                }
                <Modal width={768} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    {
                        this.renderPreview((this.getFileType(name)), url)
                    }
                </Modal >
            </div >
        );
    }
    // 预览文件
    handlePreview = async url => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }
    // 关闭预览窗口
    handleCancel = (e) => {
        // console.log('cancel');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ previewVisible: false }, () => {
            // console.log(this.state.previewVisible);
        });
    }
    // 渲染对应文件的icon
    renderImg = (name) => {
        let fileType = this.getFileType(name);
        switch (fileType) {
            case 'png': case 'jpg':
                return <img src={pngIcon} alt="" />;
                break;
            case 'pdf':
                return <img src={pdfIcon} alt="" />;;
                break;
            case 'mp4':
                return <img src={videoIcon} alt="" />;;
                break;
            case 'doc': case 'docx':
                return <img src={wordIcon} alt="" />;;
                break;
        }
    }
    // 获取文件的类型
    getFileType = (name, type) => {
        let fileType = name.split('.')[name.split('.').length - 1].toLowerCase();
        if (!type) {
            return fileType;
        } else {
            return type.indexOf(fileType) > -1
        }
    }
    // 根据文件类型渲染预览dom
    renderPreview = (type, url) => {
        if (type == 'png' || type == 'jpg') {
            return <img style={{ width: '100%' }} src={url} alt="" />
        } else if (type == 'video') {
            return (
                <video src={url} width="720" height="500" controls>
                    您的浏览器不支持 video 标签。
                </video>
            )
        } else if (type == 'pdf') {
            return <embed src={url} type="application/pdf" style={{ width: '100%', height: '500px' }} />
        } else if (type == 'doc' || type == 'xls' || type == 'word') {
            return <iframe src={`https://view.officeapps.live.com/op/view.aspx?src=${url}`} style={{ width: '100%', height: '500px' }} frameBorder='1'></iframe>
        }
    }
}

export default {
    name: 'AfileShow',
    component: AfileShow,
};
