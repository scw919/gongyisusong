import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart, AscrollContent } = compnents;
// import SearchList from '../ClueDiscovery/Children/SearchList';
import { Checkbox, message, Table, Input, Divider, Button } from 'antd';
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const { Column } = Table;
// actions
import { getCollectedClues, getConditions } from '@/store/actions';
// import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// 样式类
import './style.scss';
// 通用工具
import { zTool, Zlayout } from "zerod";
// 接口
import apis from '@/App.api.js';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });
const mapDispatchToProps = (dispatch) => ({//getConditions
    getCollectedClues: (...args) => dispatch(getCollectedClues(...args)),
    getConditions: (...args) => dispatch(getConditions(...args)),
});
class UserManage extends React.Component {
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        },
        {
            title: "Action",
            key: "action",
            render: (text) => (
                <span>
                    <Button type="primary" onClick={() => { console.log(text) }}>编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger" onClick={() => { console.log(text) }}>删除</Button>
                </span>
            )
        }
    ];
    state = {
        data: [
            {
                key: 1,
                name: 'John Brown sr.',
                age: 60,
                address: 'New York No. 1 Lake Park',
                children: [
                    {
                        key: 11,
                        name: 'John Brown',
                        age: 42,
                        address: 'New York No. 2 Lake Park',
                    },
                    {
                        key: 12,
                        name: 'John Brown jr.',
                        age: 30,
                        address: 'New York No. 3 Lake Park',
                        children: [
                            {
                                key: 121,
                                name: 'Jimmy Brown',
                                age: 16,
                                address: 'New York No. 3 Lake Park',
                            },
                        ],
                    },
                    {
                        key: 13,
                        name: 'Jim Green sr.',
                        age: 72,
                        address: 'London No. 1 Lake Park',
                        children: [
                            {
                                key: 131,
                                name: 'Jim Green',
                                age: 42,
                                address: 'London No. 2 Lake Park',
                                children: [
                                    {
                                        key: 1311,
                                        name: 'Jim Green jr.',
                                        age: 25,
                                        address: 'London No. 3 Lake Park',
                                    },
                                    {
                                        key: 1312,
                                        name: 'Jimmy Green sr.',
                                        age: 18,
                                        address: 'London No. 4 Lake Park',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: 2,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
        ]
    }
    render() {
        const { history, routes } = this.props;
        const { data } = this.state;
        return (
            <Zlayout.Zbody scroll={true}>
                <div className="main-rt-div1">
                    <div className="main-rt-div2">
                        <div styleName="main-rt-container" style={{ height: '100%' }}>
                            <div className="flex align-item-center ft-16 mar-b-20">
                                <span>部门名称：</span>
                                <Search
                                    style={{ width: 500 }}
                                    className="search-ipt"
                                    size="large"
                                    placeholder="请输入关键字进行查询"
                                    onChange={(e) => { }}
                                    onSearch={value => this.searchResult(value)}
                                    enterButton
                                />
                            </div>
                            <Table
                                className="ft-16"
                                bordered
                                columns={this.columns}
                                rowSelection={this.rowSelection}
                                dataSource={data}

                            />
                        </div>
                    </div>
                </div>
            </Zlayout.Zbody>
        )
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    }
    searchResult = (keyWord) => {
        console.log('search: ' + keyWord);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserManage));