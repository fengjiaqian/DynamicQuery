package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;

import com.yijiupi.himalaya.op.util.ExcelColumn;

public class RequestErrorTrackingPageExcelVO implements Serializable {
	private static final long serialVersionUID = -9068070684106322527L;
	/**
	 * 请求类型名称
	 */
	@ExcelColumn(name = "请求类型名称", sort = 0)
	private String requestType;
	/**
	 * 请求内容
	 */
	@ExcelColumn(name = "请求内容", sort = 1)
	private String requestContent;
	/**
	 * 响应内容
	 */
	@ExcelColumn(name = "响应内容", sort = 2)
	private String responseContent;

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getRequestContent() {
		return requestContent;
	}

	public void setRequestContent(String requestContent) {
		this.requestContent = requestContent;
	}

	public String getResponseContent() {
		return responseContent;
	}

	public void setResponseContent(String responseContent) {
		this.responseContent = responseContent;
	}
}
