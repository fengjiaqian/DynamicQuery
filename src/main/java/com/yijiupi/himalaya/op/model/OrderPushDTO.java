package com.yijiupi.himalaya.op.model;
public class OrderPushDTO {
	private Boolean isModify;
	private String orderIds;
	private Boolean isStockIn;
	private Boolean isPush;
	private Boolean isModifyXY;
	private Boolean isResend;
	/**
	 * 是否重新设置成本价
	 */
	private Boolean isReSetCostPrice;
	/**
	 * 是否重发微知消息
	 */
	private Boolean isRetryWeizhiSync;

	public Boolean getIsModifyXY() {
		return isModifyXY;
	}

	public void setIsModifyXY(Boolean isModifyXY) {
		this.isModifyXY = isModifyXY;
	}

	public Boolean getIsPush() {
		return isPush;
	}

	public void setIsPush(Boolean isPush) {
		this.isPush = isPush;
	}

	public Boolean getIsStockIn() {
		return isStockIn;
	}

	public void setIsStockIn(Boolean isStockIn) {
		this.isStockIn = isStockIn;
	}

	public Boolean getIsModify() {
		return isModify;
	}

	public void setIsModify(Boolean isModify) {
		this.isModify = isModify;
	}

	public String getOrderIds() {
		return orderIds;
	}

	public void setOrderIds(String orderIds) {
		this.orderIds = orderIds;
	}

	/**
	 * 获取isResend
	 * @return isResend isResend
	 */
	public Boolean getIsResend() {
		return isResend;
	}

	/**
	 * 设置isResend
	 * @param isResend isResend
	 */
	public void setIsResend(Boolean isResend) {
		this.isResend = isResend;
	}

	/**
	 * 获取isReSetCostPrice
	 * @return isReSetCostPrice isReSetCostPrice
	 */
	public Boolean getIsReSetCostPrice() {
		return isReSetCostPrice;
	}

	/**
	 * 设置isReSetCostPrice
	 * @param isReSetCostPrice isReSetCostPrice
	 */
	public void setIsReSetCostPrice(Boolean isReSetCostPrice) {
		this.isReSetCostPrice = isReSetCostPrice;
	}

	/**
	 * 获取isRetryWeizhiSync
	 * @return isRetryWeizhiSync isRetryWeizhiSync
	 */
	public Boolean getIsRetryWeizhiSync() {
		return isRetryWeizhiSync;
	}

	/**
	 * 设置isRetryWeizhiSync
	 * @param isRetryWeizhiSync isRetryWeizhiSync
	 */
	public void setIsRetryWeizhiSync(Boolean isRetryWeizhiSync) {
		this.isRetryWeizhiSync = isRetryWeizhiSync;
	}
}
