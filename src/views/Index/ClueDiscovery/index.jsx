import React, { useState, useEffect } from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
// import compnents from '@/components/load-components.js';
// const { AseamlessScroll } = compnents;
import SearchPart from './Children/SearchPart';
import SearchList from './Children/SearchList';
import { Input, Tag, Icon, Button } from 'antd';
const { Search } = Input;

import { ZpageHeader, Zlayout, ZsideMenu } from 'zerod';
import { connect } from 'react-redux';
// 样式类
import './style.scss';
const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });

export default connect(mapStateToProps)((props) => {
    function getData() {
        console.log('loadMore');
    }
    return (
        <Zlayout.Zbody scroll={true} loadMore={getData}>
            <div className="main-rt-container" style={{ height: '100%' }}>
                {/* <AseamlessScroll /> */}
                <SearchPart />
                <SearchList />
            </div>
        </Zlayout.Zbody>
    )
});
