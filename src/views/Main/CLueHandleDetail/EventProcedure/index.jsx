import React from 'react';
import { Timeline, Icon, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
const eventLists = [
    { name: '番禺南丰塑料有限公司行政处罚案1', menuid: 0, type: '行政处罚', unit: '番禺南丰塑料有限公司', time: "2019-12-13 14:00" },
    { name: '番禺南丰塑料有限公司行政处罚案2', menuid: 1, type: '行政处罚', unit: '番禺南丰塑料有限公司', time: "2019-12-13 14:00" },
    { name: '番禺南丰塑料有限公司行政处罚案3', menuid: 2, type: '行政处罚', unit: '番禺南丰塑料有限公司', time: "2019-12-13 14:00" },
    { name: '番禺南丰塑料有限公司行政处罚案4', menuid: 3, type: '行政处罚', unit: '番禺南丰塑料有限公司', time: "2019-12-13 14:00" },
];
class EventProcedure extends React.Component {
    static defaultProps = {
        clues: []
    }
    render() {
        const { history, clues } = this.props;
        return (
            <Timeline styleName="time-line" mode="alternate" position="right">
                {clues.map((event, index) => {
                    return (
                        <Timeline.Item key={index} dot={<span styleName="time-line-dot"></span>}>
                            <div className="pointer" onClick={() => { history.push(`/main/clueCollect/clueCollectDetail/${event.id}`) }}>
                                <p styleName="name">{event.caseName}</p>
                                <p styleName="unit">{event.partyName}</p>
                                <p styleName="type">{this.renderType(event.labels)}</p>
                                <p styleName="time">{event.penaltyDecisionDate}</p>
                            </div>
                        </Timeline.Item>)
                })}
                <Timeline.Item dot={<span styleName=""></span>}></Timeline.Item>
            </Timeline>
        )
    }
    renderType = (labels) => {
        let type = "";
        if (labels) {
            Object.keys(labels).map((key, index) => {
                type += index > 0 ? `、${key}` : key
            })
        }
        return type;
    }
}
export default EventProcedure;