/**
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.util;

/**
 * redis键值生成 工具类<br>
 * 针对各业务系统 ，设置固定的前缀关键字
 *
 * @author bjw
 * @since 2016年11月30日 下午12:09:20
 */
public class RedisKeyHelper {

    /**
     * 生成用户会话标识关键字
     *
     * @param sessionID cookie中的会话标识
     * @return String 生成键值
     */
    public static String buildUserInfoKey(String sessionID) {
        return "supc:user:login:" + sessionID;
    }

	/**
	 * 生成用户角色标记关键字
	 */
	public static String buildAdminRole(Integer userId) {
        return "supc:user:role:" + userId;
	}

	/**
     * 生成登录校验图片值关键字
     *
     * @param sessionID cookie中的会话标识
     * @return String 生成键值
     */
    public static String buildVerifyCodeKey(String sessionID) {
        return "supc:user:vcode:" + sessionID;
    }
}
