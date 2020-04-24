/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

package com.yijiupi.himalaya.op.util;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.document.AbstractXlsView;


@Component(XlsView.VIEW_NAME)
public class XlsView extends AbstractXlsView {

	public static final String VIEW_NAME = "XlsExportView";

    private static final DateFormat DATE_FORMAT = DateFormat.getDateInstance(DateFormat.SHORT);

    @Override
    protected void buildExcelDocument(Map<String, Object> model,
                                      Workbook workbook,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<?> voList = (List<?>) model.get("dataList");
        Class<?> c = (Class<?>) model.get("FlectClass");
        String fileName = (String) model.get("fileName");
        // create excel xls sheet
        Sheet sheet = workbook.createSheet(fileName);

        HSSFCellStyle style = (HSSFCellStyle) workbook.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCellStyle cellStyle = (HSSFCellStyle) workbook.createCellStyle();    //创建一个样式
        cellStyle.setFillForegroundColor(HSSFColor.YELLOW.index);    //设置颜色为红色
        cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFFont font = (HSSFFont) workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 11);//设置字体大小
        style.setFont(font);
        cellStyle.setFont(font);
        // create header row
        Row header = sheet.createRow(0);

        //循环设置表头
        Map<Field, ExcelColumn> fieldAnnos = new HashMap<>();
		Field[] fields = c.getDeclaredFields();
        int index = 0;
        for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			ExcelColumn excelColumns = field.getAnnotation(ExcelColumn.class);
			if (excelColumns != null ) {
				HSSFCell cell = (HSSFCell) header.createCell(excelColumns.sort());
				sheet.setColumnWidth(index++ , excelColumns.columnWidth());
				cell.setCellValue(excelColumns.name());
			    cell.setCellStyle(cellStyle);
			    fieldAnnos.put(field, excelColumns);
			}
		}

		//设置内容
		for (int i = 0; i < voList.size(); i++) {
			Row row = sheet.createRow(i + 1);
			row.setRowStyle(style);
			Object vo = voList.get(i);
			Set<Entry<Field, ExcelColumn>> fieldEntry = fieldAnnos.entrySet();
			for (Entry<Field, ExcelColumn> entry : fieldEntry) {
				Object result = PropertyUtils.getProperty(vo, entry.getKey().getName());
				ExcelColumn col = entry.getValue();
				if(result == null){
					row.createCell(col.sort()).setCellValue("");
				} else {
					Cell createCell = row.createCell(entry.getValue().sort());
					createCell.setCellStyle(style);
					if(result instanceof Date){
						createCell.setCellValue(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(result));
					} else if(result instanceof BigDecimal){
						createCell.setCellValue((((BigDecimal)result).setScale(2,BigDecimal.ROUND_HALF_UP)).doubleValue());
					}else {
						createCell.setCellValue(String.valueOf(result));
					}
				}
			}
		}

		response.setHeader("Content-Disposition", "attachment; filename="+new String(fileName.getBytes(), "ISO8859-1"));
    }
}