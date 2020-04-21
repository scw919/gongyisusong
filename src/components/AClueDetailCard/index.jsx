import React from 'react';
// import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
import { Acollect } from '../Acollect';
import SelfCarousel from './CarouselSelf';
import detailInfo from '@/assets/images/detail/detail-info.jpg';
// 工具
import { zTool } from "zerod";

function itemRender(route, params, routes, paths) {
    return !route.link ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
}
class AClueDetailCard extends React.PureComponent {
    static propTypes = {
        penaltyCategory1: PropTypes.object,
        penaltyCategory2: PropTypes.object,
    };
    static defaultProps = {
        penaltyCategory1: {
            desc: ''
        },
        penaltyCategory2: {
            desc: ''
        }
    }
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
    }
    initialIndex = 0;
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.snapshot !== this.props.snapshot
    // }
    componentDidMount() {

    }
    render() {
        const {
            id, //线索id
            caseName, // 案件名
            lables, // 标签
            source, //来源
            documentDecisionNumber, //行政处罚决定书文号
            siteLink, //网站链接
            penaltyCategory1, //处罚类别1:1-罚款,2-其他,可用值:OTHER_CASE,ADMINISTRATIVE_SANCTION
            penaltyCategory2, //处罚类别2:1-暂定,可用值:OTHER_CASE,ADMINISTRATIVE_SANCTION
            partyName, //行政相对人/当事人名称
            unifiedSocialCreditCode, //统一社会信用代码
            legalRepresentativeName, //法定代表人姓名,
            addressConcerned, //涉事地址
            typesSubjectsInvolved, //涉事主体类型,可用值:ENTERPRISE_SUBJECT,NATURE_PERSON,SOCIAL_ORG,OTHER_SUBJECT
            punishmentOrganization, //处罚机关
            penaltyDecisionDate, //处罚决定日期
            snapshot, //快照
            isIncluded, //是否收录
        } = this.props;
        const snapShots = snapshot && snapshot.length > 0 && snapshot.split(',') || [];
        const hasCollected = Boolean(isIncluded);
        console.log(hasCollected, snapShots, 'AclueDetailCard');
        return (
            <div className="flex" styleName="card-box">
                <SelfCarousel files={snapShots} />
                <div className="flex-1" styleName="card-box-right">
                    {/* 标题 */}
                    <div className="relative" styleName="title">
                        {/* 收录按钮 */}
                        <div styleName="collect-btn" className="absolute">
                            <Acollect hasCollected={hasCollected} id={Number(id)} />
                        </div>
                        <p className="ft-24">{caseName}</p>
                        <div>
                            {
                                lables ? Object.keys(lables).map(key => {
                                    return <span key={key} className={`tags-self ${lables[key]}`}>{key}</span>
                                }) : null
                            }
                        </div>
                    </div>
                    {/* 简介 */}
                    <div className="flex ft-16" styleName="info">
                        <div>
                            <p>线索来源：{source}</p>
                            <p>行政处罚决定文书号：{documentDecisionNumber}</p>
                            <p>处罚类别一：{penaltyCategory1 && penaltyCategory1.desc || null}</p>
                            <p>行政相对人名称：{partyName}</p>
                            <p>违法企业法定代表人姓名：{legalRepresentativeName}</p>
                            <p>行政处罚机关：{punishmentOrganization}</p>
                        </div>
                        <div>
                            <p>网站链接：
                                <a href={siteLink}>{siteLink}</a>
                            </p>
                            <p>涉事主体类型：{typesSubjectsInvolved && typesSubjectsInvolved.desc || null}</p>
                            <p>处罚类别二：{penaltyCategory2 && penaltyCategory2.desc || null}</p>
                            <p>统一社会信用代码：{unifiedSocialCreditCode}</p>
                            <p>地址：{addressConcerned}</p>
                            <p>处罚日期：{penaltyDecisionDate}</p>
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
        // this.setState({
        //     initialIndex: index
        // });
        this.initialIndex = index;
        this.refs.swipeBigPic.goTo(index);
    }
    // 自动切换 更新下方小图的index
    carouselChange = (index) => {
        // console.log(index);
        // this.setState({
        //     initialIndex: index
        // });
        this.initialIndex = index;
    }
}

export default {
    name: 'AClueDetailCard',
    component: AClueDetailCard,
};
