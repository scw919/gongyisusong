import React from 'react';
// import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
// import detailInfo from '@/assets/images/detail/detail-info.jpg';
// 工具
import { zTool } from "zerod";

class CarouselSelf extends React.PureComponent {
    static propTypes = {
        files: PropTypes.array
    };
    static defaultProps = {
        files: []
    }
    state = {
        initialIndex: 0
    }
    componentDidMount() {
        let maxWidth = this.bodyEl.offsetWidth;
        let contentWidth = this._contentEl.scrollWidth;
        let counterWidth = 80 * this.props.files.length + 30;
        let overflow = counterWidth > maxWidth + 30;
        if (overflow) {
            this._contentEl.style.width = counterWidth + 'px';
            this.scroollInstance = new zTool.BuildScroll(this.bodyEl, { scrollbars: "custom", scrollY: false });
            zTool.listenDivSizeChange(this.bodyEl, this.scroollInstance.refresh);
            zTool.listenDivSizeChange(this._contentEl, this.scroollInstance.refresh);
        }
    }
    render() {
        const { files, defaultFiles } = this.props;
        return (
            <div styleName="card-box-left">
                <Carousel
                    ref="swipeBigPic"
                    afterChange={this.carouselChange}
                    autoplay
                    initialSlide={this.state.initialIndex}
                    dots={false}>
                    {
                        files.length > 0 ? (
                            files.map((item, index) => {
                                return (
                                    <div key={index} className="flex align-item-center" styleName="carousel-img-box">
                                        <img src={item} alt={item} />
                                    </div>
                                )
                            })
                        ) : (
                                <div className="flex align-item-center" styleName="carousel-img-box">
                                    <img src={defaultFiles[0]} alt={defaultFiles[0]} />
                                </div>
                            )
                    }
                </Carousel>
                <section styleName="carousel-dots-box" ref={el => (this.bodyEl = el)}>
                    <div ref={el => (this._contentEl = el)} styleName="carousel-dots">
                        {
                            files.length > 0 ? (
                                files.map((item, index) => {
                                    return (
                                        <div styleName={this.state.initialIndex == index ? 'active' : ''} key={index} onClick={() => { this.changeCurImg(index) }}>
                                            <img src={item} alt="" />
                                        </div>
                                    )
                                })
                            ) : (
                                    <div>
                                        <img src={defaultFiles[1]} alt="" />
                                    </div>
                                )

                        }
                    </div>
                </section>
            </div>
        );
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
        this.initialIndex = index;
    }
}

export default CarouselSelf;
