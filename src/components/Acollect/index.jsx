import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
export class Acollect extends React.Component {
    static propTypes = {
        trademark: PropTypes.any, //图标|图示
        title: PropTypes.any, // 标题
        content: PropTypes.any, //描述说明...
        rightMoreContent: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]), // 标题列的右边可添加更多内容
        breadcrumbParams: PropTypes.any, // 面包屑路由参数
        breadcrumbRoutes: PropTypes.arrayOf(PropTypes.object), // 面包屑routes
        children: PropTypes.any,
        isCollected: PropTypes.bool
    };
    state={
        isCollected: this.props.isCollected
    }
    // componentWillReceiveProps(props, nextProps){
    //     this.setState({
    //         isCollected: props.isCollected
    //     });
    // }
    render() {
        return (
            <div>
                {
                    this.state.isCollected ?
                        (
                            <div onClick={this.handleCollected} styleName="collect collected" className="ft-16 pointer">
                                <Icon type="heartFill" className="mar-r-5" />
                                已收录
                            </div>
                        ) :
                        (
                            <div onClick={this.handleCollected} styleName="collect" className="ft-16 pointer">
                                <Icon type="heart" className="mar-r-5" />
                                收录
                            </div>
                        )
                }
            </div>
        );
    }
    handleCollected = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const {
            clickEvent,
        } = this.props;
        let isCollected = this.state.isCollected;
        this.setState({
            isCollected: !isCollected
        },() => {
            // console.log(this.state);
            clickEvent&&clickEvent(!isCollected);
        });
        
    }
}
export default {
    name: 'Acollect',
    component: Acollect,
};