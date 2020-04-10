import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Modal } from 'antd';
import './style.scss';

import pngIcon from '@/assets/images/detail/picture.png';
import pdfIcon from '@/assets/images/detail/pdf.png';
import videoIcon from '@/assets/images/detail/video.png';
import wordIcon from '@/assets/images/detail/word.png';
// import doc from '@/assets/doc.doc';
import mp4 from '@/assets/mp4.mp4';
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class AfileShow extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.any,
    };
    state = {
        previewVisible: false,
        previewImage: null
    }
    render() {
        const {
            name,
            type,
            size,
            url
        } = this.props;
        // console.log(this.props)
        const { previewVisible, previewImage } = this.state;
        return (
            <div className="relative" styleName="file-box">
                {/* handleIcon */}
                <div className="absolute" styleName="handle-modal">
                    <div className="flex align-item-center just-con-center">
                        <Icon onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            this.handlePreview(url)
                        }} type="eye" />
                        <Icon type="download" />
                    </div>
                </div>
                {this.renderImg(name)}
                <div>
                    <p title={name} className="ellipsis">{name}</p>
                    <p>({size})</p>
                </div>
                <Modal width={768} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    {
                        this.renderPreview((type||this.getFileType(name)), url)
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
        console.log('cancel');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ previewVisible: false }, () => {
            console.log(this.state.previewVisible);
        });
    }
    // 渲染对应文件的icon
    renderImg = (name) => {
        const { type } = this.props;
        let fileType = this.getFileType(name);
        switch (fileType) {
            case 'png':
                return <img src={pngIcon} alt="" />;
                break;
            case 'pdf':
                return <img src={pdfIcon} alt="" />;;
                break;
            case 'mp4':
                return <img src={videoIcon} alt="" />;;
                break;
            case 'doc'||'docx':
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
                <video src={mp4} width="720" height="500" controls>
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
