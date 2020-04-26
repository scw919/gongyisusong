import React from 'react';
// import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
// import apis from '@/App.api.js';
// import store from '@/store';
// import { getCollectedClues } from '@/store/actions';
// //at.alicdn.com/t/font_1740380_epha2kuvmm.js
export class AlabelTags extends React.PureComponent {
    static propTypes = {
        labels: PropTypes.object,
    };
    static defaultProps = {
        labels: {}
    }
    componentDidMount() {
    }
    render() {
        // const { labels } = this.props;
        const labels = {
            domain: "其他",
            PenaltyCategoryOne: "罚金",
            clueType: "行政处罚"
        }
        let newLabels = {};
        // console.log(hasCollected, 'acollected');
        const sortType = ['domain', 'clueType', 'PenaltyCategoryOne', 'PenaltyCategoryTwo'];
        for (let i = 0; i < sortType.length; i++) {
            labels[sortType[i]] && labels[sortType[i]].length > 0 ? newLabels[sortType[i]] = labels[sortType[i]] : null
        }
        return (
            <div className="ft-16 inline-block">
                {
                    Object.keys(newLabels).map(key => {
                        return <span key={key} className={`tags-self ${key}`}>{newLabels[key]}</span>
                    })
                }
            </div>
        );
    }
}
export default {
    name: 'AlabelTags',
    component: AlabelTags,
};