import React from 'react';
import PropTypes from 'prop-types';

class LoginMain extends React.PureComponent {
    // 定义props的类型(如果有props规定必须要写)
    static propTypes = {
        className: PropTypes.string,
    };
    // props的默认值（如果需要）
    static defaultProps = {
        className: 'z-body',
    };
    // 定义初始state
    state = {
        listData: [{
            name: 'zerod1'
        }, {
            name: 'zerod1'
        }, {
            name: 'zerod1'
        }, {
            name: 'zerod1'
        }, {
            name: 'zerod1'
        }],
    };
    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.state.listData.map((item, index) => <p key={index}>{item.name}</p>)}
            </div>
        );
    }
}
export default LoginMain;
