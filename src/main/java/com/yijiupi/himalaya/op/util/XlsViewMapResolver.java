/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

/**
 *
 */
package com.yijiupi.himalaya.op.util;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.BeanNameViewResolver;

/**
 * @author Administrator
 *
 */
@Component
public class XlsViewMapResolver extends BeanNameViewResolver {

	@Override
	public int getOrder() {
		  return Integer.MIN_VALUE;
	}

	@Override
	public View resolveViewName(String viewName, Locale locale) throws BeansException {
		if (!XlsViewMap.VIEW_NAME.equals(viewName)) {
			return null;
		}
		return super.resolveViewName(viewName, locale);
	}

}
