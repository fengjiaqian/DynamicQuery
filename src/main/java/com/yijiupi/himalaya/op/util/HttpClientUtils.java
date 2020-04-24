/**   
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import java.util.Map;


/**
 * @Title: HttpClientUtils.java
 * @Package com.yijiupi.himalaya.api.supplychain.util
 * @Description:
 * @author wangran
 * @date 2017年10月23日 下午5:29:10
 * @version
 */
public class HttpClientUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(HttpClientUtils.class);

	/**
	 * post请求
	 * 
	 * @param url
	 * @param formParams
	 * @return
	 */
	public static String doPost(String url, String body) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Accept", "application/json");
			headers.add("Accpet-Encoding", "gzip");
			headers.add("Content-Encoding", "UTF-8");
			headers.add("Content-Type", "application/json; charset=UTF-8");
			HttpEntity<String> formEntity = new HttpEntity<>(body, headers);
			return RestClient.getClient().postForObject(url, formEntity, String.class);
		} catch (Exception e) {
			LOGGER.error("POST请求出错,url:" + url + "参数：" + body, e);
		}

		return null;
	}

	/**
	 * post请求
	 * 
	 * @param url
	 * @param formParams
	 * @return
	 */
	// public static String doPost(String url, Map<String, String> formParams) {
	// try {
	// MultiValueMap<String, String> requestEntity = new
	// LinkedMultiValueMap<>();
	// formParams.keySet().stream().forEach(key -> requestEntity.add(key,
	// MapUtils.getString(formParams, key, "")));
	// return RestClient.getClient().postForObject(url, requestEntity,
	// String.class);
	// } catch (Exception e) {
	// LOGGER.error("POST请求出错：{}", url, e);
	// }
	// return null;
	// }

	/**
	 * post请求
	 * 
	 * @param url
	 * @return
	 */
	public static String doPost(String url) {
		try {
			return RestClient.getClient().postForObject(url, HttpEntity.EMPTY, String.class);
		} catch (Exception e) {
			LOGGER.error("POST请求出错：{}", url, e);
		}

		return null;
	}

	/**
	 * get请求
	 * 
	 * @param url
	 * @return
	 */
	public static String doGet(String url) {
		try {
			return RestClient.getClient().getForObject(url, String.class);
		} catch (Exception e) {
			LOGGER.error("GET请求出错,url:" + url, e);
		}

		return null;
	}

	public static String doGetMap(String url, Map<String, ?> params) {
		try {
			String result = RestClient.getClient().getForObject(url, String.class, params);
			return result;
		} catch (Exception e) {
			LOGGER.error("GET请求出错,url:" + url + ",参数:" + params, e);
		}

		return null;
	}

}
