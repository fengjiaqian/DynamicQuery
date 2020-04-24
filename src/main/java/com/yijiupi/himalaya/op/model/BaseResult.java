package com.yijiupi.himalaya.op.model;

import com.yijiupi.himalaya.op.WebConstants;

/**
 * 返回类
 * @date: 2017年8月24日 上午11:32:51
 */
public class BaseResult implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 887559612721200240L;
	/**
	 * 返回消息内容
	 */
	private String message;
	/**
	 * 处理成功与否标志success/fail/error
	 */
	private String result;
	/**
	 * 错误消息详细内容
	 */
	private String detailMessage;
	/**
	 * 条目数
	 */
	private Integer totalCount;
	/**
	 * 每页条数
	 */
	private Integer pageSize;
	/**
	 * 页码
	 */
	private Integer currentPage;
	/**
	 * TOKEN认证
	 */
	private Integer tokenStatus = WebConstants.SUCCESS_CODE;
	/**
	 * 失败，错误码
	 */
	private Integer messageCode;
	/**
	 * 成功标识
	 */
	private Boolean success;

	/**
	 * 默认构造
	 */
	public BaseResult() {
	}

	public BaseResult(String result, String message) {
		this.result = result;
		this.message = message;
	}

	/**
	 * 异常构造方法
	 * @param exception
	 */
	public BaseResult(Exception exception) {
		this.result = WebConstants.RESULT_FAILED;
		this.message = exception.getMessage();
		this.detailMessage = exception.getMessage();
	}

	/**
	 * 异常构造方法
	 * @param exception
	 */
	public BaseResult(String message, Exception exception) {
		this(exception);
		this.message = message;
	}

	/**
	 * 异常构造方法
	 * @param exception
	 */
	public BaseResult(String message, Exception exception, Boolean success) {
		this(exception);
		this.message = message;
		this.success = success;
	}

	/**
	 * 异常构造方法
	 * @param exception
	 */
	public BaseResult(String message, Exception exception, Integer code) {
		this(exception);
		this.message = message;
		this.tokenStatus = code;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getDetailMessage() {
		return detailMessage;
	}

	public void setDetailMessage(String detailMessage) {
		this.detailMessage = detailMessage;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public Integer getTokenStatus() {
		return tokenStatus;
	}

	public void setTokenStatus(Integer tokenStatus) {
		this.tokenStatus = tokenStatus;
	}

	public Integer getMessageCode() {
		return messageCode;
	}

	public void setMessageCode(Integer messageCode) {
		this.messageCode = messageCode;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public static BaseResult getSuccessResult() {
		return new BaseResult("success", WebConstants.RESULT_SUCCESS);
	}

	public static BaseResult getFailedResult(String message) {
		return new BaseResult(message, WebConstants.RESULT_FAILED);
	}

	public static BaseResult getErrorResult(String message) {
		return new BaseResult(message, WebConstants.RESULT_ERROR);
	}
}
