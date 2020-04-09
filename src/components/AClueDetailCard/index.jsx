import React from 'react';
// import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
import { Acollect } from '../Acollect';
import detailInfo from '@/assets/images/detail/detail-info.jpg';
// 工具
import { zTool } from "zerod";

function itemRender(route, params, routes, paths) {
    return !route.link ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
}
class AClueDetailCard extends React.Component {
    static propTypes = {
        trademark: PropTypes.any, //图标|图示
        title: PropTypes.any, // 标题
        content: PropTypes.any, //描述说明...
        rightMoreContent: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]), // 标题列的右边可添加更多内容
        breadcrumbParams: PropTypes.any, // 面包屑路由参数
        breadcrumbRoutes: PropTypes.arrayOf(PropTypes.object), // 面包屑routes
        children: PropTypes.any,
    };
    state = {
        isCollected: false,
        swiperImg: [
            {
                src: detailInfo,
                id: 1
            },
            {
                src: detailInfo,
                id: 2
            },
            {
                src: detailInfo,
                id: 3
            },
            {
                src: detailInfo,
                id: 4
            },
            {
                src: detailInfo,
                id: 5
            }
        ],
        initialIndex: 1
    }
    componentDidMount() {
        let maxWidth = this.bodyEl.offsetWidth;
        let contentWidth = this._contentEl.scrollWidth;
        let counterWidth = 80 * this.state.swiperImg.length + 30;
        let overflow = counterWidth > maxWidth + 30;
        if (overflow) {
            this._contentEl.style.width = counterWidth + 'px';
            this.scroollInstance = new zTool.BuildScroll(this.bodyEl, { scrollbars: "custom", scrollY: false });
            zTool.listenDivSizeChange(this.bodyEl, this.scroollInstance.refresh);
            zTool.listenDivSizeChange(this._contentEl, this.scroollInstance.refresh);
        }
    }
    render() {
        const {
            children, trademark,
            rightMoreContent,
            title,
            content,
            breadcrumbParams,
            breadcrumbRoutes,
        } = this.props;
        const mb = 'bottom-16';
        return (
            <div className="flex" styleName="card-box">
                <div styleName="card-box-left">
                    <Carousel
                        ref="swipeBigPic"
                        afterChange={this.carouselChange}
                        autoplay
                        initialSlide={this.state.initialIndex}
                        dots={false}>
                        {
                            this.state.swiperImg.map((item, index) => {
                                return (
                                    <div key={index} className="flex align-item-center" styleName="carousel-img-box">
                                        <img src={item.src} alt={item.id} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <section styleName="carousel-dots-box" ref={el => (this.bodyEl = el)}>
                        <div ref={el => (this._contentEl = el)} styleName="carousel-dots">
                            {
                                this.state.swiperImg.map((item, index) => {
                                    return (
                                        <div styleName={this.state.initialIndex == index ? 'active' : ''} key={index} onClick={() => { this.changeCurImg(index) }}>
                                            <img src={item.src} alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>

                </div>
                <div className="flex-1" styleName="card-box-right">
                    {/* 标题 */}
                    <div className="relative" styleName="title">
                        {/* 收录按钮 */}
                        <div styleName="collect-btn" className="absolute">
                            <Acollect isCollected={true} onClick={this.handleCollected} />
                        </div>
                        <p className="ft-24">番禺南丰塑料制品有限公司行政处罚案</p>
                        <div>
                            <span className="tags-self tag-green">资源环境</span>
                            <span className="tags-self tag-yellow">其他案件</span>
                            <span className="tags-self tag-red">罚款</span>
                        </div>
                    </div>
                    {/* 简介 */}
                    <div className="flex ft-16" styleName="info">
                        <div>
                            <p>线索来源：互联网爬虫</p>
                            <p>行政处罚决定文书号：穗环法罚【2019】50号</p>
                            <p>处罚类别一：罚款</p>
                            <p>行政相对人名称：番禺南丰塑料制品有限公司</p>
                            <p>违法企业法定代表人姓名：刘志军</p>
                            <p>行政处罚机关：广州市环保局</p>
                        </div>
                        <div>
                            <p>网站链接：
                                <a href="http://sthjj.gz.gov.cn/zwgk/xyxxsgs/">http://sthjj.gz.gov.cn/zwgk/xyxxsgs/</a>
                            </p>
                            <p>涉事主体类型：企业</p>
                            <p>处罚类别二：罚款</p>
                            <p>统一社会信用代码：91440115618712245T</p>
                            <p>地址：广州市南沙区南沙街广生路12号</p>
                            <p>处罚日期：2020-02-13</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 收录 / 取消收录
    handleCollected = (value) => {
        console.log(value)
        this.setState({
            isCollected: value
        });
    }
    // 切换展示图片
    changeCurImg = (index) => {
        // console.log(index);
        this.setState({
            initialIndex: index
        });
        this.refs.swipeBigPic.goTo(index);
    }
    // 自动切换 更新下方小图的index
    carouselChange = (index) => {
        // console.log(index);
        this.setState({
            initialIndex: index
        });
    }
}

export default {
    name: 'AClueDetailCard',
    component: AClueDetailCard,
};
