import React, { useState, useEffect, useRef } from 'react';
// import compnents from '@/components/load-components.js';
import { Input, Tag, Icon, Button } from 'antd';
const { Search } = Input;
import SelectItem from './SelectItem';
// 样式类
import './style.scss';
import { useStore } from 'react-redux';


export default (props) => {
	let childDiyu = useRef(null), childLingyu = useRef(null), childLeibie = useRef(null), childTimer = useRef(null);

	const timerSeparator = [{ name: '全部', counts: 1124 }, { name: '近1年', counts: 1124 }, { name: '1-3年', counts: 1124 }, { name: '3-5年', counts: 1124 }, { name: '其他', counts: 1124 }];
	const areasDiyu = [{ name: '全部', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }];
	const areasLingyu = [{ name: '全部', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }];
	const areasLeibie = [{ name: '全部', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }, { name: '天河区', counts: 1124 }, { name: '越秀区', counts: 1124 }];
	// 已选条件数组
	const [tags, setTags] = useState([
		// {name: '全部',counts: 123, type: 'diyu'},{name: '天河区', counts: 222, type: 'lingyu'}
	]);
	// 已选条件对象
	const [searchOptions, setSearchOptions] = useState({});
	// 地域
	const [areaDiyu, setAreaDiyu] = useState(areasDiyu);
	// 领域
	const [areaLingyu, setAreaLingyu] = useState(areasLingyu);
	// 类别
	const [areaLeibie, setAreaLeibie] = useState(areasLeibie);
	// 搜索框 输入值
	const [keyWord, setKeyWord] = useState(null);
	// 搜索条件框 显示/隐藏
	const [isCollapse, setIsCollapse] = useState(false);
	// 关闭单个已选条件
	function handleClose(removedTag) {
		const newTags = tags.filter(tag => tag !== removedTag);
		setTags(newTags);
		if (removedTag.type == 'diyu') {
			childDiyu.current.setSelectedAreaIndex(null);
		} else if (removedTag.type == 'lingyu') {
			childLingyu.current.setSelectedAreaIndex(null);
		} else {
			childLeibie.current.setSelectedAreaIndex(null);
		}
	};
	// 清除所有已选条件
	function clearTags() {
		setTags([]);
		childDiyu.current.setSelectedAreaIndex(null);
		childLingyu.current.setSelectedAreaIndex(null);
		childLeibie.current.setSelectedAreaIndex(null);
	}
	// 子组件传值
	function changeSel(newTag, isDel) {
		// console.log(newTag);
		const newTags = tags.filter(tag => tag.type != newTag.type);
		isDel ? null : newTags.push(newTag);
		setTags(newTags);
	}
	// 更新搜索条件
	function updateSearchOptions(keyWord) {
		let newSearchOptions = {};
		tags.forEach(item => {
			debugger
			newSearchOptions[item.type] = item.counts;
		})
		newSearchOptions.keyWord = keyWord;
		setSearchOptions(newSearchOptions);
		props.searchResult(newSearchOptions);
		// console.log(newSearchOptions,searchOptions);
	}
	// 点击搜索
	function searchResult(value) {
		setKeyWord(value);
		updateSearchOptions(value);
	}
	function toggleSlide() {
		console.log(isCollapse);
		setIsCollapse(!isCollapse);
	}
	return (
		<div styleName="search-box" className="flex align-item-center just-con-center flex-col">
			<div styleName="search-top-ipt" className="flex align-item-center">
				<Search className="search-ipt" size="large" placeholder="请输入关键字进行查询" onSearch={value => searchResult(value)} enterButton />
			</div>
			<div className="flex flex-between" styleName="border-box search-center-check">
				<div className="flex align-item-center">
					已选条件<span className="separator"></span>
					<div>
						{tags.map((tagObj, index) => {
							const tag = `${tagObj.name}(${tagObj.counts})`;
							const isLongTag = tag.length > 20;
							const tagElem = (
								<Tag className="border-tag" key={index} closable onClose={() => handleClose(tagObj)}>
									{isLongTag ? `${tag.slice(0, 20)}...` : tag}
								</Tag>
							);
							return isLongTag ? (
								<Tooltip title={tag} key={index}>
									{tagElem}
								</Tooltip>
							) : (
									tagElem
								);
						})}
					</div>
				</div>
				<div className="primary_self">
					<Button type="link" icon="delete" block onClick={clearTags}>
						清空全部
                    </Button>
				</div>
			</div>
			<div styleName="border-box search-bottom-check" styleName={isCollapse ? 'collapse' : 'extend'}>
				<div styleName="slide-box">
					<SelectItem ref={childDiyu} areas={areaDiyu} selName={'地域'} type={'diyu'} selectedChange={changeSel} />
					<SelectItem ref={childLingyu} areas={areaLingyu} selName={'领域'} type={'lingyu'} selectedChange={changeSel} />
					<SelectItem ref={childLeibie} areas={areaLeibie} selName={'类别'} type={'leibie'} selectedChange={changeSel} />
					<SelectItem ref={childTimer} areas={timerSeparator} selName={'时间'} type={'timer'} selectedChange={changeSel}>
						<Button className="dashed_self" type="dashed" icon="plus">自定义时间段</Button>
					</SelectItem>
				</div>
				<div onClick={() => { toggleSlide() }} styleName="slide-btn down" className="flex just-con-center">
					<span className="pointer">
						<Icon styleName="slide-icon" type="double-left" />
						{isCollapse ? '展开' : '收起'}
					</span>
				</div>
			</div>
		</div>
	)
};
