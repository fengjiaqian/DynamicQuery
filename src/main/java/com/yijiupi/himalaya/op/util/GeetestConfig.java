package com.yijiupi.himalaya.op.util;


/**
 * GeetestWeb配置文件
 * 
 *
 */
public class GeetestConfig {

	// 填入自己的captcha_id和private_key
	private static final String geetest_id = "1d48576e78cc610a967b587296b71659";
	private static final String geetest_key = "6dd06aa5b279722c7c98f44bf77deda1";
	private static final boolean newfailback = true;

	public static final String getGeetest_id() {
		return geetest_id;
	}

	public static final String getGeetest_key() {
		return geetest_key;
	}
	
	public static final boolean isnewfailback() {
		return newfailback;
	}

}
