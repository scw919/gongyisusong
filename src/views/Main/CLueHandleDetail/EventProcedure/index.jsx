import React from 'react';
import { Timeline } from 'antd';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

class EventProcedure extends React.Component {
    static defaultProps = {
        clues: []
    }
    render() {
        const { history, clues } = this.props;
        const sortType = ['domain', 'clueType', 'PenaltyCategoryOne', 'PenaltyCategoryTwo'];

        return (
            <Timeline styleName="time-line" mode="alternate" position="right">
                {clues.map((event, index) => {
                    let labels = event.labels || {}, newLabels = {};
                    for (let i = 0; i < sortType.length; i++) {
                        labels[sortType[i]] && labels[sortType[i]].length > 0 ? newLabels[sortType[i]] = labels[sortType[i]] : null
                    }
                    return (
                        <Timeline.Item key={index} dot={<span styleName="time-line-dot"></span>}>
                            <Link to={`/main/myClue/clueCollect/clueCollectDetail/${event.id}/hideFile`} target="_blank">
                                <div className="pointer">
                                    <p styleName="name">{event.caseName}</p>
                                    <p styleName="unit">{event.partyName}</p>
                                    <p styleName="type">{this.renderType(newLabels)}</p>
                                    <p styleName="time">{event.penaltyDecisionDate}</p>
                                </div>
                            </Link>
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
                type += index > 0 ? `、${labels[key]}` : labels[key]
            })
        }
        return type;
    }
}
export default EventProcedure;