import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import compnents from '@/components/load-components.js';
const { AsortButton, Acollect, AclueItem } = compnents;
import { Input, Tag, Icon, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
// 样式类
import './style.scss';
// import { useStore } from 'react-redux';
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
    { menuid: 1, name: 'Apple' },
    { menuid: 2, name: 'pear' },
    { menuid: 3, name: 'Orange' },
];
const defaultCheckedList = [
    { menuid: 1, name: 'Apple' },
    { menuid: 2, name: 'pear' },
]
export default class SearchList extends React.Component {
    static propTypes = {
        toggleModalNew: PropTypes.func,
        toggleModalRel: PropTypes.func,
    };
    state = {
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        sortByFilter: 0,
        sortByCollect: 0,
        plainOptions: this.props.data,
    };

    componentWillReceiveProps(props, nextProps) { //解决父组件setState传值 无法更新子组件页面的问题
        this.setState({
            plainOptions: props.data,
        });
    }

    render() {
        const { isCollect, toggleModalNew, toggleModalRel, history } = this.props;
        return (
            <div className="mar-t-20" styleName="search-list">
                <div className="flex flex-between" styleName="search-list-top">
                    <div>
                        <Checkbox
                            className="primary_self"
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            <span type="button">全部收录</span>
                        </Checkbox>
                        <span styleName="total-counts">共收录1313413个文件</span>
                    </div>
                    <div className="flex">
                        <AsortButton sortType={this.state.sortByFilter} sortName={'筛选时间'} onClick={this.changeSortType1} />
                        <AsortButton sortType={this.state.sortByCollect} sortName={'采集时间'} onClick={this.changeSortType2} />
                    </div>
                </div>
                <div styleName="search-list-results">
                    {
                        <CheckboxGroup value={this.state.checkedList} onChange={this.onChange}>
                            {
                                this.state.plainOptions.map((sub, subKey) => {
                                    return (
                                        <AclueItem
                                            history={history}
                                            key={subKey}
                                            sub={sub}
                                            toggleModalNew={toggleModalNew}
                                            toggleModalRel={toggleModalRel}
                                            isCollect={isCollect}
                                            hasChecked={true}
                                            clickEvent={this.handleCollected}>
                                        </AclueItem>
                                    )
                                })
                            }
                        </CheckboxGroup >
                    }

                </div>
            </div>
        );
    }
    onChange = newCheckedList => {
        const { plainOptions, checkedList } = this.state;
        console.log(newCheckedList);
        this.setState({
            checkedList: newCheckedList,
            indeterminate: !!newCheckedList.length && newCheckedList.length < plainOptions.length,
            checkAll: newCheckedList.length === plainOptions.length,
        }, () => { console.log(checkedList) });
    };

    onCheckAllChange = e => {
        const { plainOptions, checkedList } = this.state;
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    changeSortType1 = () => {
        const { sortByFilter } = this.state;
        let type = sortByFilter,
            newType;
        if (type != 1) {
            newType = 1;
        } else {
            newType = 2
        }
        this.setState({
            sortByFilter: newType
        })
    }
    changeSortType2 = () => {
        const { sortByCollect } = this.state;
        let type = sortByCollect,
            newType;
        if (type != 1) {
            newType = 1;
        } else {
            newType = 2
        }
        this.setState({
            sortByCollect: newType
        })
    }
    // 收录 / 取消收录
    handleCollected = (value) => {
        console.log(value)
    }
}