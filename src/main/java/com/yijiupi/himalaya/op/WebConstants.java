/**
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op;

/**
 * @author bjw
 * @since 2016年11月9日 上午11:58:36
 */
public class WebConstants {
	/**
	 * 响应结果标识符：success
	 */
	public static final String RESULT_SUCCESS = "success";
	/**
	 * 响应结果标识符：success
	 */
	public static final String RESULT_FAILED = "fail";
	/**
	 * 响应结果标识符：success
	 */
	public static final String RESULT_ERROR = "error";
	/**
	 * Cookie中，用户信息关键字
	 */
	public static final String COOKIE_USERINFO = "YJP_OP_UserInfo";
	/**
	 * Cookie中，错误信息关键字
	 */
	public static final String COOKIE_ERROR_KEY = "error";
	public static final String RESULT_AUTH_FAIL = "failure";
	/**
	 * cookie 中存放自定义会话信息的标识名
	 */
	public final static String YJP_COOKIE_ID = "YJPID";
	/**
	 * 活动复制到当前月
	 */
	public static final int NOW_MONTH = 0;
	/**
	 * 活动复制到下个月
	 */
	public static final int NEXT_MONTH = 1;
	// Token验证成功(Token验证成功，可能业务逻辑执行失败，但不影响此Code)
	public static final Integer SUCCESS_CODE = 1;
}
