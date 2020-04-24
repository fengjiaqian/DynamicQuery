/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

/**
 *
 */
package com.yijiupi.himalaya.op.util;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;

import java.beans.IntrospectionException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 * @author Administrator
 *
 */
public class ExcelUtils {

	@SuppressWarnings("unused")
	public static HSSFWorkbook getReflectInfo(Class<?> c,List<?> voList,String type)
			throws IntrospectionException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {

		HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet(type);
        HSSFRow row = sheet.createRow((int) 0); //表头

        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCellStyle cellStyle = wb.createCellStyle();    //创建一个样式
        cellStyle.setFillForegroundColor(HSSFColor.YELLOW.index);    //设置颜色为红色
        cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFFont font = wb.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 11);//设置字体大小
        style.setFont(font);
        cellStyle.setFont(font);

        //循环设置表头
        Map<Field, ExcelColumn> fieldAnnos = new HashMap<>();
		Field[] fields = c.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			ExcelColumn excelColumns = field.getAnnotation(ExcelColumn.class);
			if (excelColumns != null ) {
				HSSFCell cell = row.createCell(excelColumns.sort());
				sheet.setColumnWidth(i, excelColumns.columnWidth());
				cell.setCellValue(excelColumns.name());
			    cell.setCellStyle(cellStyle);
			    fieldAnnos.put(field, excelColumns);
			}
		}
		//设置内容
		for (int i = 0; i < voList.size(); i++) {
			row = sheet.createRow(i + 1);
			row.setRowStyle(style);
			Object vo = voList.get(i);
			Set<Entry<Field, ExcelColumn>> fieldEntry = fieldAnnos.entrySet();
			for (Entry<Field, ExcelColumn> entry : fieldEntry) {
				Object result = PropertyUtils.getProperty(vo, entry.getKey().getName());
				ExcelColumn col = entry.getValue();
				if(result == null){
					row.createCell(col.sort()).setCellValue("");
				} else if(result instanceof Date){
					row.createCell(entry.getValue().sort()).setCellValue(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(result));
				} else {
					row.createCell(entry.getValue().sort()).setCellValue(String.valueOf(result));
				}
			}
		}

		return wb;
	}

}
