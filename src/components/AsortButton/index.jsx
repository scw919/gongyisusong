import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
class AsortButton extends React.Component {
    static propTypes = {
        sortType: PropTypes.string,
        sortName: PropTypes.string,
    };

    render() {
        const {
            sortType,
            sortName,
            clickEvent,
        } = this.props;
        return (
            <Button onClick={clickEvent} className="sort-btn">
                {sortName}
                <span className={`sort-btn-icon ${sortType == 'asc' ? 'ascending' : (sortType == 'desc' ? 'descending' : '')}`}><Icon className="icon-top" type="caret-up" /><Icon className="icon-bottom" type="caret-down" /></span>
            </Button>
        );
    }
}

export default {
    name: 'AsortButton',
    component: AsortButton,
};