/**   
 * Copyright © 2017 北京易久批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.util;

import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * radis缓存封装
 * @author: zengwentao
 * @date: 2017年2月3日 下午6:50:31
 */
@Service
@Repository
public class RedisOperations {
	private static final String SLIDEVERIFICATION = "SLIDEVERIFICATION";
	@Autowired
	RedisTemplate<Object, Object> redisTemplate;
	@SuppressWarnings("rawtypes")
	ValueOperations submitRequestVO;

	@PostConstruct
	public void init() {
		this.redisTemplate.setKeySerializer(new GenericJackson2JsonRedisSerializer());
		submitRequestVO = redisTemplate.opsForValue();
	}

	/**
	 * 将滑动验证码相关参数放到缓存中
	 */
	@SuppressWarnings("unchecked")
	public void putSlideVerification(String verification, Integer data) {
		submitRequestVO.set(SLIDEVERIFICATION + verification, data, 1, TimeUnit.DAYS);
	}

	public Integer getSlideVerification(String verification) {
		String key = SLIDEVERIFICATION + verification;
		Integer result = (Integer) submitRequestVO.get(key);
		return result;
	}
}
