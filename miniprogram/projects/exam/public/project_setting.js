module.exports = { // exam
	PROJECT_COLOR: '#EB5757',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#EB5757',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '答题规则', key: 'SETUP_CONTENT_RULE' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
	],

	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftpic' },
	],
	NEWS_FIELDS: [

	],

	QUESTION_NAME: '问答',
	QUESTION_CATE: [
		{ id: 1, title: '初中历史' }, 
		{ id: 2, title: '初中物理' }, 
		{ id: 3, title: '初中地理' }, 
		{ id: 4, title: '高中生物' }, 
	],
	QUESTION_FIELDS: [
		{ mark: 'type', title: '题型', type: 'select', selectOptions: ['单选题', '多选题'], def: '单选题', must: true },

		{ mark: 'optiona', title: '选项A', type: 'text', must: false },
		{ mark: 'optionb', title: '选项B', type: 'text', must: false },
		{ mark: 'optionc', title: '选项C', type: 'text', must: false },
		{ mark: 'optiond', title: '选项D', type: 'text', must: false },
		{ mark: 'optione', title: '选项E', type: 'text', must: false },
		{ mark: 'optionf', title: '选项F', type: 'text', must: false },
		{ mark: 'optiong', title: '选项G', type: 'text', must: false },
		{ mark: 'optionh', title: '选项H', type: 'text', must: false },

		{ mark: 'answer', title: '正确答案', type: 'text', must: true, max: 8 },
		{ mark: 'desc', title: '答案解析', type: 'textarea', must: false },

		{ mark: 'img', title: '图片', type: 'image', max: 1, must: false },
	],

	QUESTION_SETUP_FIELDS: [
		{ mark: 'open', title: '竞赛是否开始', type: 'switch', must: true },
		{ mark: 'daycnt', title: '每天可答题次数', type: 'int', def: 3, min: 1, max: 2, must: true },
		{ mark: 'score', title: '每题积分', type: 'int', def: 2, min: 1, max: 2, must: true },
		{ mark: 'size', title: '每次答题数目', type: 'int', def: 20, min: 1, max: 2, must: true },
		{ mark: 'maxtime', title: '每次答题时限(分钟)', type: 'int', def: 5, min: 1, max: 3, must: true },
	],

}