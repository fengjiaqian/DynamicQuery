/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

/**
 * 
 */
package com.yijiupi.himalaya.op.util;

import java.lang.annotation.*;

/**
 * @author Administrator
 *
 */
@Documented
@Inherited
@Target({ElementType.METHOD,ElementType.FIELD})  
@Retention(RetentionPolicy.RUNTIME) 
public @interface ExcelColumn {
	
	 String name();
	 int sort() default 0;
	 String color() default ""; 
	 String fontname() default "宋体";
	 int fontHeight() default 14;
	 int columnWidth() default 5000;
	 String format() default "";
}
