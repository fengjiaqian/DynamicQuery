package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;

import com.yijiupi.himalaya.op.util.ExcelColumn;

public class DeliveryExceptionResultVO implements Serializable {
	private static final long serialVersionUID = -9068070684106322527L;
	@ExcelColumn(name = "城市", sort = 0)
	private String orgName;
	@ExcelColumn(name = "仓库", sort = 1)
	private String warehouseName;
	/**
	 * 司机
	 */
	@ExcelColumn(name = "司机", sort = 2)
	private String deliveryUserName;
	/**
	 * 收货人
	 */
	@ExcelColumn(name = "收货人", sort = 3)
	private String contact;
	/**
	 * 单号
	 */
	@ExcelColumn(name = "单号", sort = 4)
	private String businessNo;
	/**
	 * 标记状态
	 */
	@ExcelColumn(name = "标记状态", sort = 5)
	private String deliveryMarkStateName;
	/**
	 * 出库时间
	 */
	@ExcelColumn(name = "出库时间", sort = 6)
	private String orderTurnOutTime;
	/**
	 * 产品名称
	 */
	@ExcelColumn(name = "产品名称", sort = 7)
	private String productName;
	/**
	 * 用户反馈
	 */
	@ExcelColumn(name = "用户反馈", sort = 8)
	private String userMarkTypeName;
	/**
	 * 用户反馈备注
	 */
	@ExcelColumn(name = "反馈备注", sort = 9)
	private String userMarkMemo;

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getBusinessNo() {
		return businessNo;
	}

	public void setBusinessNo(String businessNo) {
		this.businessNo = businessNo;
	}

	public String getDeliveryUserName() {
		return deliveryUserName;
	}

	public void setDeliveryUserName(String deliveryUserName) {
		this.deliveryUserName = deliveryUserName;
	}

	public String getDeliveryMarkStateName() {
		return deliveryMarkStateName;
	}

	public void setDeliveryMarkStateName(String deliveryMarkStateName) {
		this.deliveryMarkStateName = deliveryMarkStateName;
	}

	public String getOrderTurnOutTime() {
		return orderTurnOutTime;
	}

	public void setOrderTurnOutTime(String orderTurnOutTime) {
		this.orderTurnOutTime = orderTurnOutTime;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getUserMarkTypeName() {
		return userMarkTypeName;
	}

	public void setUserMarkTypeName(String userMarkTypeName) {
		this.userMarkTypeName = userMarkTypeName;
	}

	public String getUserMarkMemo() {
		return userMarkMemo;
	}

	public void setUserMarkMemo(String userMarkMemo) {
		this.userMarkMemo = userMarkMemo;
	}
}
