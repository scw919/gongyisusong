import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
class AsortButton extends React.Component {
    static propTypes = {
        sortType: PropTypes.number,
        sortName: PropTypes.string,
    };

    render() {
        const {
            sortType,
            sortName,
            onClick,
        } = this.props;
        const mb = 'bottom-16';
        return (
            <Button onClick={onClick} className="sort-btn">
                {sortName}
                <span className={`sort-btn-icon ${sortType == 1 ? 'ascending' : (sortType == 2 ? 'descending' : '')}`}><Icon className="icon-top" type="caret-up" /><Icon className="icon-bottom" type="caret-down" /></span>
            </Button>
        );
    }
}

export default {
    name: 'AsortButton',
    component: AsortButton,
};
