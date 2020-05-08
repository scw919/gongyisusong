import React, { useState, useEffect } from 'react';
import compnents from '@/components/load-components.js';
const { AsortButton, AclueItem, AsearchPart, AscrollContent, Atransfer } = compnents;
// import SearchList from '../ClueDiscovery/Children/SearchList';
import { Checkbox, message, Table, Input, Divider, Button, Transfer, Switch, Tag, Tree, Icon } from 'antd';
const { TreeNode } = Tree;
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const { Column } = Table;
import difference from 'lodash/difference';
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

// Customize Table Transfer

class UserManage extends React.Component {
    state = {
       
    }
    render() {
        const { targetKeys, clueCollect } = this.state;
       
        return (
            <div>
                <Atransfer />
            </div>
        );
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserManage));