import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
import apis from '@/App.api.js';
import store from '@/store';
import { getCollectedClues } from '@/store/actions';
export class Acollect extends React.PureComponent {
    static propTypes = {
        id: PropTypes.number,
        hasCollected: PropTypes.bool,
    };
    state = {
        hasCollected: this.props.hasCollected
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            hasCollected: nextProps.hasCollected
        });
    }
    render() {
        const { id } = this.props;
        const { hasCollected } = this.state;
        console.log(hasCollected, 'acollected')
        return (
            <div>
                {
                    hasCollected ?
                        (
                            <div onClick={(e) => { this.handleCollected(e, id) }} styleName="collect collected" className="ft-16 pointer">
                                <Icon type="heartFill" className="mar-r-5" />
                                已收录
                            </div>
                        ) :
                        (
                            <div onClick={(e) => { this.handleCollected(e, id) }} styleName="collect" className="ft-16 pointer">
                                <Icon type="heart" className="mar-r-5" />
                                收录
                            </div>
                        )
                }
            </div>
        );
    }
    //发起请求
    includeClue = (id, flag) => {
        let query = {
            clueIds: [id],
            flag: flag
        }
        apis.main.includedClue(query).then(res => {
            this.setState({
                hasCollected: flag
            }, () => {
                // console.log(this.state);
                const {
                    clickEvent,
                } = this.props;
                clickEvent && clickEvent(flag);
            });
            store.dispatch(getCollectedClues());
        })
    }
    handleCollected = (e, id) => {
        // console.log(id);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let hasCollected = this.state.hasCollected;
        this.includeClue(id, !hasCollected);
    }
}
export default {
    name: 'Acollect',
    component: Acollect,
};