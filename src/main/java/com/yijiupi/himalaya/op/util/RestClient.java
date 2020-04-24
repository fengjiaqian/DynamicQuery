/**   
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.util;

import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

/**
 * @Title: RestClient.java
 * @Package com.yijiupi.himalaya.api.supplychain.util
 * @Description:
 * @author wangran
 * @date 2017年10月23日 下午5:25:08
 * @version
 */
public class RestClient {

	private static final Logger LOGGER = LoggerFactory.getLogger(RestClient.class);

	private static RestTemplate restTemplate;

	private final static Object syncLock = new Object();

	private static void initRestTemplate() {
		// 长连接保持30秒
		PoolingHttpClientConnectionManager pollingConnectionManager = new PoolingHttpClientConnectionManager();
		// 总连接数
		pollingConnectionManager.setMaxTotal(1000);
		// 同路由的并发数
		pollingConnectionManager.setDefaultMaxPerRoute(1000);

		HttpClientBuilder httpClientBuilder = HttpClients.custom();
		httpClientBuilder.setConnectionManager(pollingConnectionManager);
		// 重试次数，默认是3次，没有开启
		httpClientBuilder.setRetryHandler(new DefaultHttpRequestRetryHandler(2, true));
		// 保持长连接配置，需要在头添加Keep-Alive
		// httpClientBuilder.setKeepAliveStrategy(new
		// DefaultConnectionKeepAliveStrategy());

		RequestConfig.Builder builder = RequestConfig.custom();
		builder.setConnectionRequestTimeout(15000);
		builder.setConnectTimeout(15000);
		builder.setSocketTimeout(15000);
		
		RequestConfig requestConfig = builder.build();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);

		// List<Header> headers = new ArrayList<>();
		// headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT
		// 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16
		// Safari/537.36"));
		// headers.add(new BasicHeader("Accept-Encoding", "gzip,deflate"));
		// headers.add(new BasicHeader("Accept-Language", "zh-CN"));
		// headers.add(new BasicHeader("Connection", "Keep-Alive"));
		// headers.add(new BasicHeader("Accept", "application/json"));
		// headers.add(new BasicHeader("Accpet-Encoding", "gzip"));
		// headers.add(new BasicHeader("Content-Encoding", "UTF-8"));
		// headers.add(new BasicHeader("Content-Type", "application/json;
		// charset=UTF-8"));

		// httpClientBuilder.setDefaultHeaders(headers);

		HttpClient httpClient = httpClientBuilder.build();

		// httpClient连接配置，底层是配置RequestConfig
		HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(
				httpClient);
		// 连接超时
		clientHttpRequestFactory.setConnectTimeout(15000);
		// 数据读取超时时间，即SocketTimeout
		clientHttpRequestFactory.setReadTimeout(15000);
		// 连接不够用的等待时间，不宜过长，必须设置，比如连接不够用时，时间过长将是灾难性的
		clientHttpRequestFactory.setConnectionRequestTimeout(200);
		// 缓冲请求数据，默认值是true。通过POST或者PUT大量发送数据时，建议将此属性更改为false，以免耗尽内存。
		// clientHttpRequestFactory.setBufferRequestBody(false);

		// 添加内容转换器
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
		messageConverters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
		// messageConverters.add(new FormHttpMessageConverter());
		messageConverters.add(new MappingJackson2HttpMessageConverter());

		restTemplate = new RestTemplate(messageConverters);
		restTemplate.setRequestFactory(clientHttpRequestFactory);
		restTemplate.setErrorHandler(new DefaultResponseErrorHandler());

		LOGGER.info("RestClient初始化完成");
	}

	private RestClient() {
	}

	public static RestTemplate getClient() {
		if (restTemplate == null) {
			synchronized (syncLock) {
				if (restTemplate == null) {
					initRestTemplate();
				}
			}
		}
		return restTemplate;
	}

}
