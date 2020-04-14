import React from 'react';
import { Form, Row, Col, Pagination } from 'antd';
import { Zlayout } from 'zerod';
import SearchForm from './SearchForm';
import ListItem from './ListItem';
// 样式
import './style.scss';

class ClueHandle extends React.Component {
    state = {
        resultList: [
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
        ]
    }
    render() {
        const { history } = this.props;
        const { resultList } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 15 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="main-rt-con-detail" style={{ height: '100%' }}>
                    <div styleName="search-box">
                        <div>
                            <SearchForm submit={this.submit} />
                        </div>
                    </div >
                    <div styleName="result-box">
                        <Row>
                            {
                                resultList.map((item, index) => {
                                    return (
                                        <Col key={index} span={6}>
                                            <ListItem {...item} history = {history}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <div className="text-right">
                        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                    </div>
                </div>
            </Zlayout.Zbody >
        )
    }
    // 子组件触发 查询
    submit = (options) => {
        console.log(options);
    }
}
export default ClueHandle;