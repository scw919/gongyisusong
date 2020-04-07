import React from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
// import compnents from '@/components/load-components.js';
// const { AsideMenu } = compnents;
import { Menu, Icon, Button } from 'antd';

import { ZpageHeader, Zlayout, ZsideMenu } from 'zerod';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) =>
    // state 是 {userList: [{id: 0, name: '王二'}]}
    ({
        userName: state.userName,
        collapsed: state.collapsed
    });

export default connect(mapStateToProps)((props) => (
    <div className="container" style={{ height: '100%' }}>
        <Zlayout.Zbody scroll={true} height='100%'>
            <div style={{height: '1000px'}}></div>
        </Zlayout.Zbody>
    </div>
));
