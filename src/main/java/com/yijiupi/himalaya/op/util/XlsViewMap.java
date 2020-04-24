/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

package com.yijiupi.himalaya.op.util;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


@Component(XlsViewMap.VIEW_NAME)
public class XlsViewMap extends AbstractXlsView {

	public static final String VIEW_NAME = "XlsExportViewMap";

//    private static final DateFormat DATE_FORMAT = DateFormat.getDateInstance(DateFormat.SHORT);

    @Override
    protected void buildExcelDocument(Map<String, Object> model,
                                      Workbook workbook,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        @SuppressWarnings({ "unchecked", "rawtypes" })
		List<Map> voList = (List<Map>) model.get("dataList");
        String field =  (String) model.get("Fields");
        String[] fields = field.split(",");
        String displayName =  (String) model.get("DisplayNames");
        String[] displayNames = displayName.split(",");
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
//        Map<Field, ExcelColumn> fieldAnnos = new HashMap<>();

        //int index = 0;
        for (int i = 0; i < displayNames.length; i++) {
			HSSFCell cell = (HSSFCell) header.createCell(i);
			//sheet.setColumnWidth(index++ , excelColumns.columnWidth());
			cell.setCellValue(displayNames[i].trim());
		    cell.setCellStyle(cellStyle);
		}

		//设置内容
		for (int i = 0; i < voList.size(); i++) {
			Row row = sheet.createRow(i + 1);
			row.setRowStyle(style);
			@SuppressWarnings("rawtypes")
			Map map = voList.get(i);
			for (int j = 0; j < fields.length; j++) {
				Object result = map.get(fields[j].trim());
				if(result == null){
					row.createCell(j+1).setCellValue("");
				} else {
					Cell createCell = row.createCell(j);
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