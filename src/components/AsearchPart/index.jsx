import React, { useState, useEffect, useRef } from 'react';
// import compnents from '@/components/load-components.js';
import { Input, Tag, Icon, Button, Tooltip } from 'antd';
const { Search } = Input;
import SelectItem from './SelectItem';
import SelfTimer from './SelfTimer';
// 样式类
import './style.scss';
// 接口
import apis from '@/App.api.js';
// 通用工具
import { zTool } from "zerod";
export const AsearchPart = (props) => {
	let childDiyu = useRef(null), childLingyu = useRef(null), childLeibie = useRef(null), childTimer = useRef(null);
	// 已选条件数组
	const [tags, setTags] = useState([
		// {name: '全部',counts: 123, type: 'diyu'},{name: '天河区', counts: 222, type: 'lingyu'}
	]);
	// 已选条件对象
	const [searchOptions, setSearchOptions] = useState({});
	// 地域
	const [areaDiyu, setAreaDiyu] = useState({});
	// 领域
	const [areaLingyu, setAreaLingyu] = useState({});
	// 类别
	const [areaLeibie, setAreaLeibie] = useState({});
	// 时间
	const [areaTime, setAreaTime] = useState({});
	// 自定义时间端弹窗 状态
	const [modalVisible, setModalVisible] = useState(false);
	// 搜索框 输入值
	const [keyWord, setKeyWord] = useState(null);
	// 搜索条件框 显示/隐藏
	const [isCollapse, setIsCollapse] = useState(false);
	// 搜索框输入联想后台数据
	const [clueSuggestion, setClueSuggestion] = useState([]);
	// 搜索框输入联想 显示隐藏
	const [clueSuggestionVisible, setClueSuggestionVisible] = useState(false);
	// 模糊查询搜索建议
	async function getClueSuggestion(e) {
		let value = e.target.value;
		setKeyWord(value);
		if (value && value.length > 0) {
			let query = {
				"prefix": value,
				"size": 5
			}
			const clueSuggestions = await apis.main.clueSuggestion(query).then(res => {
				// setClueSuggestion(res.data);
				return res.data;
			});
			setClueSuggestion(clueSuggestions);
		} else {
			setClueSuggestion([])
		}
	}
	// 获取条件筛选列表数据
	async function getClueParamsInit() {
		await apis.main.clueParams().then(res => {
			let data = res.data;
			data.forEach((item, index) => {
				switch (item.dimension) {
					case 'region':
						setAreaDiyu(item)
						break;
					case 'domain':
						setAreaLingyu(item)
						break;
					case 'clue_type':
						setAreaLeibie(item)
						break;
					case 'time':
						setAreaTime(item)
						break;
				}
			})
		});
		// 初始化搜索
		props.searchResult([])
	}
	useEffect(() => {
		// getClueSuggestion();
		getClueParamsInit();
	}, [])
	useEffect(() => {
		// getClueSuggestion();
		updateSearchOptions(keyWord)
	}, [tags])
	// 关闭单个已选条件
	function handleClose(removedTag) {
		const newTags = tags.filter(tag => tag !== removedTag);
		console.log(removedTag, newTags, 'removed tags');
		setTags(newTags);
		if (removedTag.dimension == 'region') {
			childDiyu.current.setSelectedAreaIndex(null);
		} else if (removedTag.dimension == 'domain') {
			childLingyu.current.setSelectedAreaIndex(null);
		} else if (removedTag.dimension == 'clue_type') {
			childLeibie.current.setSelectedAreaIndex(null);
		} else {
			childTimer.current.setSelectedAreaIndex(null);
		}
	};
	// 清除所有已选条件
	function clearTags() {
		setTags([]);
		childDiyu.current.setSelectedAreaIndex(null);
		childLingyu.current.setSelectedAreaIndex(null);
		childLeibie.current.setSelectedAreaIndex(null);
		childTimer.current.setSelectedAreaIndex(null);
	}
	// 子组件传值
	function changeSel(newTag, isDel) {
		// console.log(newTag, '子组件传值');
		const newTags = tags.filter(tag => tag.dimension != newTag.dimension);
		isDel ? null : newTags.push(newTag);
		setTags(newTags);
	}
	// 更新搜索条件
	function updateSearchOptions(keyWord) {
		console.log(tags);
		let newSearchOptions = [];
		tags.forEach(item => {
			let option = {
				dimension: item.dimension,
				paramValue: item.value
			};
			newSearchOptions.push(option);
		})
		keyWord && keyWord.length > 0 ? newSearchOptions.push({
			dimension: 'keyword',
			paramValue: keyWord
		}) : null;
		// setSearchOptions(newSearchOptions);
		props.searchResult(newSearchOptions);
		// console.log(newSearchOptions,searchOptions);
	}
	// 点击搜索
	function searchResult(value) {
		// setKeyWord(value);
		setClueSuggestionVisible(false);
		setClueSuggestion([]);
		updateSearchOptions(value);
	}
	// 展开/收起 搜索框
	function toggleSlide() {
		console.log(isCollapse);
		setIsCollapse(!isCollapse);
	}
	// 自定义时间段
	function addSelfTimer() {
		setModalVisible(true);
	}
	function onOk(timeRanger) {
		console.log(timeRanger);
		let newAreaTime = zTool.deepCopy(areaTime);
		let tag = {
			count: null,
			label: timeRanger,
			value: timeRanger
		}
		newAreaTime.result.push(tag);
		setAreaTime(newAreaTime);
		setModalVisible(false);
	}
	function onCancel() {
		setModalVisible(false);
	}
	return (
		<div styleName="search-box" className="flex align-item-center just-con-center flex-col">
			<div styleName="search-top-ipt" className="flex align-item-center">
				<Search
					className="search-ipt"
					size="large"
					placeholder="请输入关键字进行查询"
					value={keyWord}
					onChange={(e) => { getClueSuggestion(e) }}
					onSearch={value => searchResult(value)}
					onFocus={() => { setClueSuggestionVisible(true) }}
					enterButton
				/>
				<div styleName="input-relate" style={{ display: clueSuggestion.length > 0 && clueSuggestionVisible ? 'block' : 'none' }}>
					{clueSuggestion.map((item, index) => {
						return <p onClick={() => { setKeyWord(item); setClueSuggestionVisible(false) }} key={index}>{item}</p>
					})}
				</div>
			</div>
			<div className="flex flex-between" styleName="border-box search-center-check">
				<div className="flex align-item-center">
					已选条件<span className="separator"></span>
					<div>
						{tags.map((tagObj, index) => {
							const tag = `${tagObj.label}${tagObj.count ? (tagObj.count) : ''} `;
							const isLongTag = tag.length > 20;
							const tagElem = (
								<Tag className="border-tag" key={index} visible={true} closable onClose={() => handleClose(tagObj)}>
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
				<div>
					<Button type="link" icon="delete" block onClick={clearTags}>
						清空全部
                    </Button>
				</div>
			</div>
			<div styleName="border-box search-bottom-check" styleName={isCollapse ? 'collapse' : 'extend'}>
				<div styleName="slide-box">
					<SelectItem ref={childDiyu} {...areaDiyu} selectedChange={changeSel} />
					<SelectItem ref={childLingyu} {...areaLingyu} selectedChange={changeSel} />
					<SelectItem ref={childLeibie} {...areaLeibie} selectedChange={changeSel} />
					<SelectItem ref={childTimer} {...areaTime} selectedChange={changeSel}>
						<Button className="dashed_self" type="dashed" icon="plus" onClick={() => { addSelfTimer() }}>自定义时间段</Button>
					</SelectItem>
				</div>
				<div onClick={() => { toggleSlide() }} styleName="slide-btn down" className="flex just-con-center">
					<span className="pointer">
						<Icon styleName="slide-icon" type="double-left" />
						{isCollapse ? '展开搜索条件' : '收起'}
					</span>
				</div>
			</div>
			{/* 自定义时间段 弹窗 */}
			<SelfTimer visible={modalVisible} onOk={onOk} onCancel={onCancel} />
		</div>
	)
};
export default {
	name: 'AsearchPart',
	component: AsearchPart
}