import React from 'react';
import { Form, Row, Col, Pagination } from 'antd';
import { Zlayout } from 'zerod';
import SearchForm from './SearchForm';
import ListItem from './ListItem';
// 样式
import './style.scss';
// 接口
import apis from '@/App.api.js';

class ClueHandle extends React.Component {
    state = {
        query: {
            pageNum: 1,
            pageSize: 12,
            pages: 1,
            total: 0,
        },
        resultList: [
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
            { status: 0 }, { status: 1 }, { status: 2 }, { status: 3 },
        ]
    }
    render() {
        const { history } = this.props;
        const { resultList, query } = this.state;
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
                                            <ListItem refresh={this.submit} {...item} history={history} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <div className="text-right">
                        <Pagination size="small" defaultPageSize={12} pageSizeOptions={["8", "12", "16", "20"]} current={query.pageNum} showSizeChanger showQuickJumper total={query.total} onShowSizeChange={this.onShowSizeChange} onChange={this.pageChange} />
                    </div>
                </div>
            </Zlayout.Zbody >
        )
    }
    // 子组件触发 查询
    submit = (options) => {
        console.log(options);
        let query = Object.assign({}, this.state.query, options);
        apis.main.getClueCollection(query).then(res => {
            let data = res.data;
            query.pages = data.pages;
            query.total = data.total;
            this.setState({
                query: query,
                resultList: data.list
            });
        })
    }
    // 分页
    pageChange = (page, pageSize) => {
        let query = this.state.query;
        query.pageNum = page;
        query.pageSize = pageSize;
        this.setState({
            query: query
        })
        this.submit();
        // this.query.pageNum = page;
        // this.query.pageSize = pageSize;
        // this.submit();
    }
    onShowSizeChange = (current, size) => {
        let query = this.state.query;
        query.pageSize = size;
        this.submit();
    }
}
export default ClueHandle;