import React from 'react';
import { connect } from 'react-redux';

// import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
import apis from '@/App.api.js';
import store from '@/store';
import { getCollectedClues, getConditions } from '@/store/actions';

// const mapDispatchToProps = (dispatch) => ({
//     getConditions: (...args) => dispatch(getConditions(...args)),
// });

// //at.alicdn.com/t/font_1740380_epha2kuvmm.js
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
        // console.log(hasCollected, 'acollected');
        return (
            <div>
                {
                    hasCollected ?
                        (
                            <div onClick={(e) => { this.handleCollected(e, id) }} styleName="collect collected" className="ft-16 pointer">
                                {/* <Icon type="heartFill" className="mar-r-5" /> */}
                                <span className="iconfont icon-heartFill mar-r-5" styleName="iconfont"></span>
                                已收录
                            </div>
                        ) :
                        (
                            <div onClick={(e) => { this.handleCollected(e, id) }} styleName="collect" className="ft-16 pointer">
                                {/* <Icon type="heart" className="mar-r-5" /> */}
                                <span className="iconfont icon-heart mar-r-5" styleName="iconfont"></span>
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
            store.dispatch(getConditions({ me: 1 }));
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