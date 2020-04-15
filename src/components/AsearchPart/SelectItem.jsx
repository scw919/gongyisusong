import React from 'react';
// import compnents from '@/components/load-components.js';
import { Input, Tag, Icon, Button } from 'antd';
const { Search } = Input;

// 样式类
import './style.scss';
// import { useStore } from 'react-redux';

class SelectItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area: null,
            selectedAreaIndex: null,
        }
    }
    render() {
        const { areas, selName, children, type, selectedChange } = this.props;
        return (
            <div className="flex align-item-center" styleName="select-item">
                <div className="flex align-item-center">
                    {selName}<span className="separator"></span>
                </div>
                <div className="flex-1">
                    {
                        areas.map((tag, index) => {
                            return (<span key={index} onClick={() => { this.handleChangeArea(tag, index) }} styleName={`radio-tag ${index === this.state.selectedAreaIndex ? 'selected' : ''}`}>
                                <i>{tag.name}</i>
                                <i>({tag.counts})</i>
                            </span>)
                        })
                    }
                    {children}
                </div>
            </div>
        )
    }
    handleChangeArea(tag, index) {
        const { type, selectedChange } = this.props;
        tag.type = type;
        let isDel = false;
        if (this.state.selectedAreaIndex == index) {
            this.setSelectedAreaIndex(null);
            isDel = true;
        } else {
            this.setSelectedAreaIndex(index);
        }
        selectedChange(tag, isDel);
    }
    setArea(newArea) {
        this.setState({
            area: newArea
        })
    }
    setSelectedAreaIndex = (index) => {
        this.setState({
            selectedAreaIndex: index
        })
    }
};
export default SelectItem;
