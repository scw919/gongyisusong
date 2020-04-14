import React, { useState, useEffect } from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
// import compnents from '@/components/load-components.js';
// const { AseamlessScroll } = compnents;
import { Icon, Button, Radio, Select } from 'antd';
const { Option } = Select;
// const { Search } = Input;
//引入基本模板
const echarts = require('echarts/lib/echarts');
import { Zlayout } from 'zerod';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// 样式类
import './style.scss';
// 通用工具
import { zTool } from "zerod";

const mapStateToProps = (state, ownProps) => {
    return ({
        userName: state.userName,
        collapsed: state.collapsed,
        menuIndex: state.menuIndex
    });
}
// state 是 {userList: [{id: 0, name: '王二'}]}

let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {

    }
    // part-1
    iconLists = [
        { type: 'find', name: '发现公益诉讼线索', counts: 23955, unit: '条' },
        { type: 'main-body', name: '涉及涉事主体', counts: 23955, unit: '个' },
        { type: 'unit', name: '涉及行政机关', counts: 23955, unit: '个' },
        { type: 'collect-counts', name: '线索收录量', counts: 23955, unit: '条' },
        { type: 'deal-counts', name: '线索处置量', counts: 23955, unit: '条' },
        { type: 'check', name: '调查取证中的线索量', counts: 23955, unit: '条' },
        { type: 'register-ing', name: '呈请立案中的线索量', counts: 23955, unit: '条' },
        { type: 'register-ed', name: '已立案的线索量', counts: 23955, unit: '条' },
        { type: 'unpass', name: '立案审批未通过的线索量', counts: 23955, unit: '条' },
    ]
    // part-2
    echartOptions = {
        'part-1': {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                top: '35%',
                right: 100,
                // padding: [10, 0],
                itemGap: 20,
                data: ['广州市生态环境局', '广州市市场监管局', '其他']
            },
            color: ['#37B8FF', '#1FD6C1', '#8342FE'],
            series: [
                {
                    name: '检察建议情况',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    center: [ ////距离左右，上下距离的百分比
                        '30%', '50%'
                    ],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: '广州市生态环境局' },
                        { value: 310, name: '广州市市场监管局' },
                        { value: 234, name: '其他' },
                    ]
                }
            ]
        },
        'part-2': {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                top: '25%',
                left: '60%',
                // padding: [10, 0],
                itemGap: 20,
                data: ['生态资源', '食药安全', '国有财产', '国有土地', '英烈权益', '疫情相关', '其他']
            },
            color: ['#8B5DFF', '#5155FB', '#F9658E', '#42B6FF', '#FF9554', '#17CFB7', '#FFC732'],
            series: [
                {
                    name: '线索收录情况',
                    type: 'pie',
                    radius: '60%',
                    roseType: 'angle',
                    center: [ ////距离左右，上下距离的百分比
                        '30%', '50%'
                    ],
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    itemStyle: {

                    },
                    data: [
                        { value: 235, name: '生态资源' },
                        { value: 274, name: '食药安全' },
                        { value: 310, name: '国有财产' },
                        { value: 335, name: '国有土地' },
                        { value: 400, name: '英烈权益' },
                        { value: 335, name: '疫情相关' },
                        { value: 400, name: '其他' }
                    ]
                }
            ]
        },
        'part-3': {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#27A6FF', '#1DDFC8', '#784EFF', '#FF9554'],
            series: [
                {
                    name: '线索处置情况',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 40,
                            lineStyle: {
                                color: '#ABBED9'
                            }
                        }
                    },
                    label: {
                        formatter: '{b|{b} }{c|{c}}{x|件}',
                        align: 'center',
                        rich: {
                            b: {
                                color: '#A2AAB5',
                                fontSize: 12,
                                lineHeight: 20,
                                align: 'center',

                            },
                            c: {
                                color: '#565A60',
                                align: 'center',
                                fontSize: 16,
                                lineHeight: 20,

                            },
                            x: {
                                color: '#565A60',
                                align: 'left',
                                fontSize: 16,
                                lineHeight: 24
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#fff',
                        }
                    },
                    data: [
                        { value: 335, name: '调查取证中' },
                        { value: 310, name: '呈请立案中' },
                        { value: 310, name: '已立案' },
                        { value: 234, name: '立案审批未通过' },
                    ]
                }
            ]
        },
        'part-4': {
            legend: {
                right: 50,
                top: 20,
            },
            color: ['#4395FF', '#B75DFF', '#1ED6C2'],
            tooltip: {},
            // dataset: {
            //     source: [
            //         ['clueType', '线索采集', '线索收录', '线索处置'],
            //         ['1月', 43.3, 85.8, 93.7],
            //         ['2月', 83.1, 73.4, 55.1],
            //         ['3月', 86.4, 65.2, 82.5],
            //         ['4月', 72.4, 53.9, 39.1],
            //         ['5月', 43.3, 85.8, 93.7],
            //         ['6月', 83.1, 73.4, 55.1],
            //         ['7月', 86.4, 65.2, 82.5],
            //         ['8月', 72.4, 53.9, 39.1],
            //         ['9月', 43.3, 85.8, 93.7],
            //         ['10月', 83.1, 73.4, 55.1],
            //         ['11月', 86.4, 65.2, 82.5],
            //         ['12月', 72.4, 53.9, 39.1],
            //     ]
            // },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {
                    name: '线索采集',
                    type: 'bar',
                    barWidth: 14,//柱图宽度
                    barGap: '100%',//柱图间距
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                },
                {
                    name: '线索收录',
                    type: 'bar',
                    barWidth: 14,//柱图宽度
                    barGap: '100%',//柱图间距
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                }
                ,
                {
                    name: '线索处置',
                    type: 'bar',
                    barWidth: 14,//柱图宽度
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                }
            ]
        }
    }
    componentDidMount() {
        if (window.innerWidth < 1920) {
            var devicewidth = document.documentElement.clientWidth;
            var scale = devicewidth / 1920; // 分母——设计稿的尺寸
            // document.body.style.zoom = scale;
            var $body = document.body;
            var $html = document.getElementsByTagName('html')[0];
            $body.style.setProperty('transform', 'scale(' + scale + ')');
            $body.style.setProperty('transform-origin', '0 0');
            $body.style.setProperty('width', window.innerWidth / scale + 'px');
            $body.style.setProperty('height', window.innerHeight / scale + 'px');
            $body.style.zoom = 1;
        }
        let chart_1 = document.getElementById('data-charts-1');
        console.log(chart_1.offsetWidth, chart_1.offsetHeight);

        let myChart_1 = echarts.init(document.getElementById('data-charts-1'));
        myChart_1.setOption(this.echartOptions['part-1']);

        let myChart_2 = echarts.init(document.getElementById('data-charts-2'));
        myChart_2.setOption(this.echartOptions['part-2']);

        let myChart_3 = echarts.init(document.getElementById('data-charts-3'));
        myChart_3.setOption(this.echartOptions['part-3']);

        let myChart_4 = echarts.init(document.getElementById('data-charts-4'));
        myChart_4.setOption(this.echartOptions['part-4']);


    }
    componentWillUnmount() {
        if (window.innerWidth < 1920) {
            var devicewidth = document.documentElement.clientWidth;
            var scale = devicewidth / 1920; // 分母——设计稿的尺寸
            // document.body.style.zoom = scale;
            var $body = document.body;
            var $html = document.getElementsByTagName('html')[0];
            $body.style.setProperty('transform', 'scale(' + 1 + ')');
            $body.style.setProperty('transform-origin', '0 0');
            $body.style.setProperty('width', '1920px');
            $body.style.setProperty('height', '100%');
            $body.style.zoom = scale;
        }
    }
    render() {
        const { history } = this.props;
        const { newVisible, relatedVisible } = this.state;
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="index-container" style={{ height: '100%' }}>

                    {/* part-1 */}
                    <div className="flex" styleName="col-div-box part-1">
                        {
                            this.iconLists.map((item, index) => {
                                return (
                                    <div key={index} className="flex align-item-center ft-16" styleName="col-div">
                                        <div styleName={this.renderIcon(item.type)}></div>
                                        <div className="flex" styleName="desc">
                                            <p>{item.name}</p>
                                            <p>
                                                <span className="ft-24 mar-r-5" styleName="counts">{item.counts}</span>
                                                <span className="ft-14" styleName="unit">{item.unit}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* part-2 */}
                    <div className="flex ft-16" styleName="col-div-box part-2">
                        <div className="flex flex-col" styleName="col-div">
                            <div className="flex align-item-center flex-between" styleName="col-div-head">
                                <span className="relative" styleName="head-tit">检察建议情况</span>
                                <Button type="link" icon="upload">
                                    导出
                                </Button>
                            </div>
                            <div className="flex-1" styleName="col-div-content">
                                <div className="flex flex-end" styleName="data-type">
                                    <div styleName="data-type-handle">
                                        <Radio.Group defaultValue="a" size="small" buttonStyle="solid">
                                            <Radio.Button value="a">行政机关</Radio.Button>
                                            <Radio.Button value="b">领域</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div id="data-charts-1" className="flex" styleName="data-charts">

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col" styleName="col-div">
                            <div className="flex align-item-center flex-between" styleName="col-div-head">
                                <span className="relative" styleName="head-tit">线索收录情况</span>
                                <Button type="link" icon="upload">
                                    导出
                                </Button>
                            </div>
                            <div className="flex-1" styleName="col-div-content">
                                <div className="flex flex-end" styleName="data-type">
                                    <div styleName="data-type-handle">
                                        <Radio.Group defaultValue="a" size="small" buttonStyle="solid">
                                            <Radio.Button value="a">领域</Radio.Button>
                                            <Radio.Button value="b">来源</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div id="data-charts-2" className="flex" styleName="data-charts">

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col" styleName="col-div">
                            <div className="flex align-item-center flex-between" styleName="col-div-head">
                                <span className="relative" styleName="head-tit">线索处置情况</span>
                                <Button type="link" icon="upload">
                                    导出
                                </Button>
                            </div>
                            <div className="flex-1" styleName="col-div-content">
                                <div className="flex flex-end" styleName="data-type">
                                    <div styleName="data-type-handle">
                                        <Radio.Group defaultValue="a" size="small" buttonStyle="solid">
                                            <Radio.Button value="a">处置阶段</Radio.Button>
                                            <Radio.Button value="b">领域</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div id="data-charts-3" className="flex" styleName="data-charts">

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* part-3 */}
                    <div className="ft-16 relative" styleName="col-div-box part-3">
                        <div className="flex flex-col" styleName="col-div">
                            <div className="flex align-item-center flex-between" styleName="col-div-head">
                                <span className="relative" styleName="head-tit">公益诉讼线索总体趋势</span>
                                <Button type="link" icon="upload">
                                    导出
                                </Button>
                            </div>
                            <div className="flex-1" styleName="col-div-content">
                                <div className="absolute" style={{ top: '85px', left: '160px', zIndex: 1000000 }}>
                                    <Select
                                        defaultValue="lucy"
                                        style={{ width: 90 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        suffixIcon={
                                            <Icon type="caret-down" />
                                        }
                                    >
                                        <Option value="jack">2018</Option>
                                        <Option value="lucy">2019</Option>
                                        <Option value="Yiminghe">2020</Option>
                                    </Select>
                                </div>
                                <div id="data-charts-4" className="flex" styleName="data-charts">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Zlayout.Zbody>
        )
    }
    getCalendarContainer = (triggerNode) => {
        // console.log(e);
        return triggerNode => triggerNode.parentNode;
    }
    handleChange = (value) => {
        console.log(value);
    }
    renderIcon = (type) => {
        return `icon icon-${type}`;
    }
}
export default connect(mapStateToProps)(withRouter(ClueDiscovery));