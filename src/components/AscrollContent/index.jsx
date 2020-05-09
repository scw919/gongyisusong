import React from 'react';
import ZpureComponent from 'zerod/components/ZpureComponent';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import 'zerod/zero-icon/iconfont.css';
import { BuildScroll, listenDivSizeChange, addClass, removeClass, once } from './create.js';
import debounce from 'lodash/debounce';
export class AscrollContent extends ZpureComponent {
    static propTypes = {
        showBack: PropTypes.bool, //是否展示返回顶部
        className: PropTypes.string,
        scroll: PropTypes.bool,
        getScrollInstance: PropTypes.func,
        getWrapperEl: PropTypes.func, //获取最外层包裹元素
        insertToScrollWraper: PropTypes.any,
        useCustomScroll: PropTypes.bool,
        hideLoading: PropTypes.func, // 加载完隐藏loading
    };
    static defaultProps = {
        showBack: true
    }
    state = {
        scrollAreaStyle: {},
        scrollAreaClassName: ''
    };
    hasNext = true;
    isLoading = true;
    hasShowToTop = false;
    backToTop = () => {
        this.scroollInstance.scroll.scrollTo(0, 0, 200);
    };
    showIsLoading = () => {
        if (Math.abs(this.scroollInstance.scroll.y) > this.scroollInstance.scroll.maxScrollY - 50) {
            this.props.loadmore && typeof (this.props.ref_component[this.props.loadmore]) == 'function' && this.props.ref_component[this.props.loadmore]();
            // if (!this.isLoading && this.hasNext) {
            //     addClass(this.loadingEl, 'is-animate-start');
            //     removeClass(this.loadingEl, 'is-hide');
            //     this.isLoading = true;
            //     this.props.loadmore && typeof (this.props[this.props.loadmore].getData) == 'function' && this.props[this.props.loadmore].getData().then(res => {
            //         console.log(res);
            //         if (res) {
            //             addClass(this.loadingEl, `is-hide`);
            //         } else {
            //             this.hasNext = false;
            //             removeClass(this.hasNextEl, 'is-hide');
            //         }
            //     });
            // }
        }
    }
    showBackToTop = () => {
        const { showBack } = this.props;
        if (showBack) {
            if (this.scroollInstance.scroll && this.scroollInstance.scroll.y < -100) {
                if (!this.hasShowToTop) {
                    addClass(this.toTopBtnEl, 'is-animate-start');
                    removeClass(this.toTopBtnEl, 'is-hide');
                    this.hasShowToTop = true;
                    setTimeout(() => {
                        addClass(this.toTopBtnEl, `fadeIn-to-down-enter`);
                        once(this.toTopBtnEl, 'animationend', () => {
                            addClass(this.toTopBtnEl, 'is-opacity');
                            removeClass(this.toTopBtnEl, `fadeIn-to-down-enter is-animate-start`);
                        });
                    }, 10);
                }
            } else {
                if (this.hasShowToTop) {
                    removeClass(this.toTopBtnEl, 'is-opacity');
                    addClass(this.toTopBtnEl, 'is-hide');
                    this.hasShowToTop = false;
                }
            }
        }
    };
    createScroll = () => {
        if (this.scroollInstance) {
            this.scroollInstance.scroll.destroy();
            this.scroollInstance = null;
        }
        Array.prototype.slice.call(this.bodyEl.querySelectorAll('.resize-sensor')).forEach((el) => {
            if (el.parentElement == this.bodyEl) this.bodyEl.removeChild(el);
        });
        if (this.props.scroll) {
            this.scroollInstance = new BuildScroll(this.bodyEl, {
                children: this._contentEl,
                scrollbars: 'custom',
                disablePointer: false,
                disableMouse: false,
                useCustomScroll: this.props.useCustomScroll
            });
            listenDivSizeChange(this._contentEl, this.scroollInstance.refresh, {
                useCustomScroll: this.props.useCustomScroll
            });
            listenDivSizeChange(this.bodyEl, this.scroollInstance.refresh, {
                useCustomScroll: this.props.useCustomScroll
            });
            this.scroollInstance.scroll.on('scrollEnd', () => {
                this.showBackToTop();
                this.showIsLoading();
                // if (Math.abs(this.scroollInstance.scroll.y) > this.scroollInstance.scroll.maxScrollY - 50) {
                //     this.props.loadmore && typeof (this.props[this.props.loadmore].getData) == 'function' && this.props[this.props.loadmore].getData();
                // }
                // console.log(this.scroollInstance.scroll.y, this.scroollInstance.scroll.maxScrollY);
            });
            this.props.getScrollInstance && this.props.getScrollInstance(this.scroollInstance);
            this._initEvents();
        }
    };
    disbleEvent = false;
    _initEvents = () => {
        this.scroollInstance && this.scroollInstance.scroll._initEvents(!this.disbleEvent);
        this.disbleEvent = !this.disbleEvent;
        this._contentEl.style.cursor = !this.disbleEvent ? 'grab' : 'default';
    };
    metods = {
        setScrollAreaStyle: (style, callback) => {
            if (typeof style !== 'object') return;
            delete style.height;
            if (Object.keys(style).length) {
                this.setState(
                    {
                        scrollAreaStyle: { ...this.state.scrollAreaStyle, ...style }
                    },
                    callback
                );
            }
        },
        setScrollAreaClassName: (className) => {
            if (typeof className !== 'string') return;
            this.setState({
                scrollAreaClassName: className
            });
        },
        resetScrollArea: () => {
            this.setState({
                scrollAreaStyle: {},
                scrollAreaClassName: ''
            });
            this.otherHeight = 0;
            this.metods.initScrollAreaSize();
        },
        initScrollAreaSize: debounce((otherHeight = 0) => {
            if (!this.wrapperEl) return;
            if (otherHeight > 0) {
                this.otherHeight = otherHeight;
            }
            const newStyle = {
                ...this.state.scrollAreaStyle
            };
            if (this.pageHeaderBoxEl.scrollHeight > 0 || this.otherHeight > 0) {
                const scrollh = `calc(100% - ${this.pageHeaderBoxEl.scrollHeight + this.otherHeight}px)`;
                newStyle.height = scrollh;
            } else {
                newStyle.height = '100%';
            }
            this.setState({ scrollAreaStyle: newStyle });
        }, 60)
    };
    otherHeight = 0;
    componentDidMount() {
        this.createScroll();
        this.props.getWrapperEl && this.props.getWrapperEl(this.wrapperEl, this.metods);
        listenDivSizeChange(
            this.pageHeaderBoxEl,
            () => {
                this.metods.initScrollAreaSize();
            },
            { useCustomScroll: true }
        );
        this.metods.initScrollAreaSize();
        // this.bodyEl.onscroll = () => {
        // 	if (this.bodyEl.scrollTop > 0) {
        // 		this.bodyEl.scrollTop = 0;
        // 	}
        // };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.scroll != this.props.scroll) {
            this.createScroll();
        }
    }
    componentWillUnmount() {
        if (this.scroollInstance) {
            this.scroollInstance.scroll.off('scrollEnd', this.showBackToTop);
            this.scroollInstance.scroll.destroy();
            this.scroollInstance = null;
        }
    }
    render() {
        const {
            scroll,
            className,
            children,
            insertToScrollWraper,
            getScrollInstance,
            getWrapperEl,
            useCustomScroll,
            showBack,
            ...others
        } = this.props;
        return (
            <section
                className="relative"
                {...others}
                className={`z-layout-body ${className ? className : ''}`}
                ref={(el) => (this.wrapperEl = el)}>
                <div ref={(el) => (this.pageHeaderBoxEl = el)} style={{ position: 'relative', zIndex: 9 }}>
                    <div id="ZpageHeaderBox"></div>
                </div>
                <section
                    style={this.state.scrollAreaStyle}
                    className={`z-body-scroll z-scroll-color ${this.state.scrollAreaClassName}`}
                    ref={(el) => (this.bodyEl = el)}>
                    {scroll ? (
                        <div ref={(el) => (this._contentEl = el)}>
                            <section>{children}</section>
                        </div>
                    ) : (
                            children
                        )}
                </section>
                {typeof insertToScrollWraper === 'function' ? insertToScrollWraper() : insertToScrollWraper}
                <i
                    className={`z-to-top ${this.hasShowToTop && showBack ? '' : 'is-hide'} z-toTop-btn zero-icon zerod-top`}
                    ref={(el) => (this.toTopBtnEl = el)}
                    onClick={this.backToTop}
                />
                {/* <span style={{ position: 'absolute', bottom: '20px', left: 'calc( 50%  )', transform: 'translateX(-50%)' }} ref={(el) => (this.loadingEl = el)} className={`z-loading ${this.isLoading ? 'is-hide' : ''}`}>
                    <Spin tip="加载中..."></Spin>
                </span> */}
            </section >
        );
    }
}
export default {
    name: 'AscrollContent',
    component: AscrollContent,
}