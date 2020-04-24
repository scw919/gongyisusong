import React, { useState, useEffect } from 'react';
// import ZpureComponent from 'zerod/components/ZpureComponent';
// import compnents from '@/components/load-components.js';
// const { AseamlessScroll } = compnents;
// actions
import { changetabs_part_2 } from '@/store/actions';
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
// import { zTool } from "zerod";
// 接口
import apis from '@/App.api.js';


const mapStateToProps = (state, ownProps) => {
    return ({
        collapsed: state.collapsed,
        menuIndex: state.menuIndex,
        firstSurvey: state.part_1_data_index,
        secondSurvey: state.part_2_data_index,
        part_2_tabs: state.part_2_tabs,
    });
}
const mapDispatchToProps = (dispatch) => ({
    changetabs_part_2: (...args) => dispatch(changetabs_part_2(...args)),
});
// state 是 {userList: [{id: 0, name: '王二'}]}

// let isLoading = false;
class ClueDiscovery extends React.Component {
    state = {
        // firstSurvey: {}
        yearsList: new Array(10).fill(2020).map((item, index) => { return item - index }),
        defaultYears: 2020,
        echartOptions: {
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
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // },
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
    }
    // part-1
    iconLists = [
        { type: 'allClue', name: '发现公益诉讼线索', counts: 23955, unit: '条' },
        { type: 'subjectInvolved', name: '涉及涉事主体', counts: 23955, unit: '个' },
        { type: 'administrativeOrgan', name: '涉及行政机关', counts: 23955, unit: '个' },
        { type: 'clueIncluded', name: '线索收录量', counts: 23955, unit: '条' },
        { type: 'clueDisposal', name: '线索处置量', counts: 23955, unit: '条' },
        { type: 'evidenceColl', name: '调查取证中的线索量', counts: 23955, unit: '条' },
        { type: 'filing', name: '呈请立案中的线索量', counts: 23955, unit: '条' },
        { type: 'registered', name: '已立案的线索量', counts: 23955, unit: '条' },
        { type: 'failedFiling', name: '立案审批未通过的线索量', counts: 23955, unit: '条' },
    ]
    // 保存第二部分图表数据
    part_2_data = {
        domainVos: [], //领域
        sourceVos: [], //来源
    };
    part_3_data = {
        domainVos: [], //领域
        stageVos: [], //阶段
    };

    // echarts options
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
                    // emphasis: {
                    //     label: {
                    //         show: true,
                    //         fontSize: '30',
                    //         fontWeight: 'bold'
                    //     }
                    // },
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
                data: ['环境资源', '食药安全', '国有财产', '国有土地', '英烈权益', '疫情相关', '其他']
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
                        // { value: 235, name: '环境资源' },
                        // { value: 274, name: '食药安全' },
                        // { value: 310, name: '国有财产' },
                        // { value: 335, name: '国有土地' },
                        // { value: 400, name: '英烈权益' },
                        // { value: 335, name: '疫情相关' },
                        // { value: 400, name: '其他' }
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
                            length2: 30,
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
                        // { value: 335, name: '调查取证中' },
                        // { value: 310, name: '呈请立案中' },
                        // { value: 310, name: '已立案' },
                        // { value: 234, name: '立案审批未通过' },
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
    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.secondSurvey) {
            this.resetSecondSurvey(nextProps.secondSurvey);
        }
    }
    componentDidMount() {
        const { secondSurvey } = this.props;
        let chart_1 = document.getElementById('data-charts-1');
        let chart_2 = document.getElementById('data-charts-2');
        let chart_3 = document.getElementById('data-charts-3');
        let chart_4 = document.getElementById('data-charts-4');
        if (window.innerWidth < 1920) {
            var devicewidth = document.documentElement.clientWidth;
            var scale = devicewidth / 1920; // 分母——设计稿的尺寸
            this.reset_echarts_size(chart_1, scale);
            this.reset_echarts_size(chart_2, scale);
            this.reset_echarts_size(chart_3, scale);
            this.reset_echarts_size(chart_4, scale);
        }
        this.myChart_1 = echarts.init(chart_1);
        this.myChart_2 = echarts.init(chart_2);
        this.myChart_3 = echarts.init(chart_3);
        this.myChart_4 = echarts.init(chart_4);

        this.myChart_1.setOption(this.echartOptions['part-1']);
        // this.myChart_2.setOption(this.echartOptions['part-2']);
        // this.myChart_3.setOption(this.echartOptions['part-3']);
        // this.myChart_4.setOption(this.echartOptions['part-4']);
        this.resetSecondSurvey(secondSurvey);
        this.changeYears(2020);  // part-4 图表渲染
    }
    render() {
        const { history, firstSurvey, part_2_tabs } = this.props;
        const { defaultYears, yearsList } = this.state;
        // console.log(part_2_tabs);
        // const {  } = this.state;
        return (
            <Zlayout.Zbody scroll={true}>
                <div styleName="index-container" style={{ height: '100%' }}>

                    {/* part-1 */}
                    <div styleName="col-div-box part-1">
                        <div styleName="col-div-box-child">
                            {
                                this.iconLists.map((item, index) => {
                                    return (
                                        <div key={index} className="flex align-item-center ft-16" styleName="col-div">
                                            <div styleName={this.renderIcon(item.type)}></div>
                                            <div className="flex" styleName="desc">
                                                <p>{item.name}</p>
                                                <p>
                                                    <span className="ft-24 mar-r-5" styleName="counts">{firstSurvey[item.type] || 0}</span>
                                                    <span className="ft-14" styleName="unit">{item.unit}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                                        <Radio.Group onChange={(e) => { this.changeTabs(e, 'proAdvise') }} defaultValue={part_2_tabs.proAdvise} size="small" buttonStyle="solid">
                                            <Radio.Button value="0">行政机关</Radio.Button>
                                            <Radio.Button value="1">领域</Radio.Button>
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
                                        <Radio.Group onChange={(e) => { this.changeTabs(e, 'clueIncluded') }} defaultValue={part_2_tabs.clueIncluded} size="small" buttonStyle="solid">
                                            <Radio.Button value="domainVos">领域</Radio.Button>
                                            <Radio.Button value="sourceVos">来源</Radio.Button>
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
                                        <Radio.Group onChange={(e) => { this.changeTabs(e, 'clueDispose') }} defaultValue={part_2_tabs.clueDispose} size="small" buttonStyle="solid">
                                            <Radio.Button value="stageVos">处置阶段</Radio.Button>
                                            <Radio.Button value="domainVos">领域</Radio.Button>
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
                                <div className="absolute" style={{ top: '40px', left: '160px', zIndex: 1000000 }}>
                                    <Select
                                        defaultValue={defaultYears}
                                        style={{ width: 90 }}
                                        onChange={this.changeYears}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        suffixIcon={
                                            <Icon type="caret-down" />
                                        }
                                    >
                                        {
                                            yearsList.map((item, index) => {
                                                return <Option key={index} value={item}>{item}</Option>
                                            })
                                        }
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
    // 页面缩放导致鼠标悬停错位处理
    reset_echarts_size = (container, scale) => {
        let container_height = container.offsetHeight;
        let container_width = container.offsetWidth;
        container.style.zoom = 1 / scale;
        // let transform_scale = 
        container.style.setProperty('transform', 'scale(' + scale + ')');
        container.style.setProperty('transform-origin', '0 0');
        container.style.setProperty('width', container_width + 'px');
        container.style.setProperty('height', container_height + 'px');
    }
    // icon渲染
    renderIcon = (type) => {
        return `icon ${type}`;
    }
    // 第一部分 数据获取
    getFirstSurvey = (query) => {
        getFirstSurvey(query).then(res => {
            console.log(res)
        })
    }
    // part-1 part-2 part-3  radio 切换
    changeTabs = (e, type) => {
        const { part_2_tabs, changetabs_part_2 } = this.props;
        let obj = {};
        obj[type] = e.target.value;
        console.log(obj);
        changetabs_part_2(obj);
        switch(type){
            case 'clueIncluded':
                this.echartOptions['part-2'].series[0]['data'] = this.part_2_data[e.target.value];
                this.myChart_2.setOption(this.echartOptions['part-2']);
                break;
            case 'clueDispose':
                this.echartOptions['part-3'].series[0]['data'] = this.part_3_data[e.target.value];
                this.myChart_3.setOption(this.echartOptions['part-3']);
                break;
        }
    }
    // part-1-2-3 三个图表数据处理
    resetSecondSurvey = (data) => {
        const { part_2_tabs } = this.props;
        // console.log(this.props.part_2_tabs)
        if (data.clueIncludedVo) {
            let domainVos = data.clueIncludedVo.domainVos || [];
            let sourceVos = data.clueIncludedVo.sourceVos || [];
            let part_2_domainVos = [], // 领域
                part_2_sourceVos = []; // 来源
            domainVos.map(item => {
                if (item.domainEnum) {
                    let index = item.domainEnum.code,
                        name = item.domainEnum.desc,
                        cnt = item.domainCnt;
                    let newItem = { name: name, value: cnt }
                    part_2_domainVos[index] = newItem;
                }
            })
            sourceVos.map(item => {
                if (item.sourceEnum) {
                    let index = item.sourceEnum.code,
                        name = item.sourceEnum.desc,
                        cnt = item.sourceCnt;
                    let newItem = { name: name, value: cnt }
                    part_2_sourceVos[index] = newItem;
                }
            })
            this.part_2_data = {
                domainVos: part_2_domainVos,
                sourceVos: part_2_sourceVos
            }
            this.echartOptions['part-2'].series[0]['data'] = this.part_2_data[part_2_tabs.clueIncluded];
            this.myChart_2.setOption(this.echartOptions['part-2']);
        }
        if (data.clueDisposeVo) {
            let domainVos = data.clueDisposeVo.domainVos || [];
            let stageVos = data.clueDisposeVo.stageVos || [];
            let part_3_domainVos = [], // 领域
                part_3_stageVos = []; // 阶段
            domainVos.map(item => {
                if (item.domainEnum) {
                    let index = item.domainEnum.code,
                        name = item.domainEnum.desc,
                        cnt = item.cnt;
                    let newItem = { name: name, value: cnt }
                    part_3_domainVos[index] = newItem;
                }
            })
            stageVos.map(item => {
                if (item.collStageEnum) {
                    let index = item.collStageEnum.code,
                        name = item.collStageEnum.desc,
                        cnt = item.cnt;
                    let newItem = { name: name, value: cnt }
                    part_3_stageVos[index] = newItem;
                }
            })
            this.part_3_data = {
                domainVos: part_3_domainVos,
                stageVos: part_3_stageVos
            }
            this.echartOptions['part-3'].series[0]['data'] = this.part_3_data[part_2_tabs.clueDispose];
            this.myChart_3.setOption(this.echartOptions['part-3']);
        }
    }
    // part-4
    // 数据重组
    resetEchartsData_part_4 = (data) => { //clueCludedTrendVos -线索收录 clueCollectTrendVos - 线索采集 clueDisposeTrendVos- 线索处置
        // console.log(data);
        let clueCludedTrendVos = Array(12), // 线索收录
            clueCollectTrendVos = Array(12), // 线索采集
            clueDisposeTrendVos = Array(12); // 线索采集
        data.clueCludedTrendVos.map(item => {
            let month = Number(item.date);
            clueCludedTrendVos[month] = item.cnt;
        });
        data.clueCollectTrendVos.map(item => {
            let month = Number(item.date);
            clueCollectTrendVos[month] = item.cnt;
        });
        data.clueDisposeTrendVos.map(item => {
            let month = Number(item.date);
            clueDisposeTrendVos[month] = item.cnt;
        });
        this.echartOptions['part-4']['series'][0]['data'] = clueCludedTrendVos;
        this.echartOptions['part-4']['series'][1]['data'] = clueCollectTrendVos;
        this.echartOptions['part-4']['series'][2]['data'] = clueDisposeTrendVos;
        this.myChart_4.setOption(this.echartOptions['part-4'])
    }
    changeYears = (value) => {
        let query = {
            "year": value
        }
        apis.index.getClueGeneralTrend(query).then(res => {
            //axios返回的数据是用response.data包括的，和jquery不一样
            this.resetEchartsData_part_4(res.data);
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClueDiscovery));