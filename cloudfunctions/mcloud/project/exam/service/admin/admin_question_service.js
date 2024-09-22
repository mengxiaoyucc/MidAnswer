/**
 * Notes:  问答后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-08-15 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const cloudBase = require('../../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const util = require('../../../../framework/utils/util.js');
const QuestionModel = require('../../model/question_model.js');
const AnswerModel = require('../../model/answer_model.js');
const QuestionService = require('../question_service.js');

class AdminQuestionService extends BaseProjectAdminService {

	checkQuestion(obj) {
		if (!obj) return;

		// 中间项不能为空
		if (obj.optionh && !obj.optiong) this.AppError('选项G不能为空');
		if (obj.optiong && !obj.optionf) this.AppError('选项F不能为空');
		if (obj.optionf && !obj.optione) this.AppError('选项E不能为空');
		if (obj.optione && !obj.optiond) this.AppError('选项D不能为空');
		if (obj.optiond && !obj.optionc) this.AppError('选项C不能为空');
		if (obj.optionc && !obj.optionb) this.AppError('选项B不能为空');
		if (obj.optionb && !obj.optiona) this.AppError('选项A不能为空');

		// 选项不为空的个数
		let cnt = 0;
		if (obj.optiona) cnt++;
		if (obj.optionb) cnt++;
		if (obj.optionc) cnt++;
		if (obj.optiond) cnt++;
		if (obj.optione) cnt++;
		if (obj.optionf) cnt++;
		if (obj.optiong) cnt++;
		if (obj.optionh) cnt++;


		let answer = obj.answer.toUpperCase();

		if (answer.length != new Set(answer).size) {
			this.AppError('答案不能有重复字符');
		}

		switch (obj.type) {
			case '单选题': {
				if (cnt < 2) this.AppError('单选题至少2个选项');
				if (answer.length != 1) this.AppError('单选题答案只有一位');

				break;
			}
			case '多选题': {
				if (cnt < 3) this.AppError('多选题至少3个选项');
				if (answer.length == 1) this.AppError('多选题答案至少两位');
				if (answer.length > cnt) this.AppError('本多选题答案不能超过' + cnt + '位');
				break;
			}
			/*
			case '不定项选择题': {
				if (cnt < 2) this.AppError('不定项选择题至少2个选项');
				break;
			}*/
		}

		let reg = /^[A-H]+$/;
		if (cnt == 2) reg = /^[A-B]+$/;
		else if (cnt == 3) reg = /^[A-C]+$/;
		else if (cnt == 4) reg = /^[A-D]+$/;
		else if (cnt == 5) reg = /^[A-E]+$/;
		else if (cnt == 6) reg = /^[A-F]+$/;
		else if (cnt == 7) reg = /^[A-G]+$/;
		else if (cnt == 8) reg = /^[A-H]+$/;

		if (!reg.test(answer) && cnt == 1)
			this.AppError('答案的范围须为A');
		else if (!reg.test(answer) && cnt == 2)
			this.AppError('答案的范围须为A~B');
		else if (!reg.test(answer) && cnt == 3)
			this.AppError('答案的范围须为A~C');
		else if (!reg.test(answer) && cnt == 4)
			this.AppError('答案的范围须为A~D');
		else if (!reg.test(answer) && cnt == 5)
			this.AppError('答案的范围须为A~E');
		else if (!reg.test(answer) && cnt == 6)
			this.AppError('答案的范围须为A~F');
		else if (!reg.test(answer) && cnt == 7)
			this.AppError('答案的范围须为A~G');
		else if (!reg.test(answer) && cnt == 8)
			this.AppError('答案的范围须为A~H');

		obj.answer = answer;
	}

	// 修正值
	fixForms(forms) {

		return forms;
	}

	/**添加 */
	async insertQuestion({

	}) {


		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delQuestion(id) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async delAnswer(id) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取信息 */
	async getQuestionDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let question = await QuestionModel.getOne(where, fields);
		if (!question) return null;

		return question;
	}

	// 更新forms信息
	async updateQuestionForms({
		id,
		hasImageForms
	}) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**更新数据 */
	async editQuestion({

	}) {

		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得分页列表 */
	async getAdminQuestionList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'QUESTION_ORDER': 'asc',
			'QUESTION_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {

		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ QUESTION_TITLE: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.QUESTION_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.QUESTION_STATUS = Number(sortVal);
					break
				}
				case 'type': {
					where.and['QUESTION_OBJ.type'] = String(sortVal);
					break
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'QUESTION_ADD_TIME');
					break;
				}
			}
		}

		return await QuestionModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**取得分页列表 */
	async getAdminAnswerList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ANSWER_ORDER': 'asc',
			'ANSWER_ADD_TIME': 'desc'
		};
		let fields = 'user.USER_NAME,user.USER_MOBILE,ANSWER_CNT,ANSWER_SUCC_CNT,ANSWER_START,ANSWER_TYPE,ANSWER_PER,ANSWER_DAY,ANSWER_DURATION,ANSWER_END,ANSWER_USER_ID,ANSWER_ADD_TIME,ANSWER_CATE_NAME,ANSWER_SCORE';

		let where = {};
		where.and = {
			ANSWER_TYPE: 1
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'user.USER_MOBILE': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.ANSWER_CATE_ID = String(sortVal);
					break;
				}
				case 'type': {
					where.and['ANSWER_TYPE'] = Number(sortVal);
					break
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ANSWER_ADD_TIME');
					break;
				}
			}
		}

		let UserModel = require('../../model/user_model.js');
		let joinParams = {
			from: UserModel.CL,
			localField: 'ANSWER_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await AnswerModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**修改状态 */
	async statusQuestion(id, status) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	async clearQuestion(cateId) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	//******************导入 */
	async importQuestion({ cloudId, cateId, cateName }) {
		this.AppError('[学科答题]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

}

module.exports = AdminQuestionService;