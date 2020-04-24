package com.yijiupi.himalaya.op.model.earningreport.vo;

import com.yijiupi.himalaya.op.util.ExcelColumn;

import java.math.BigDecimal;
import java.util.Date;

public class StatisticsOrderPageVO {
	private static final long serialVersionUID = 6168459040124943873L;
	/**
	 * 订单ID
	 */
	private Long order_Id;
	/**
	 * 订单号
	 */
	@ExcelColumn(name = "订单号", sort = 0)
	private String orderNo;
	/**
	 * 订单完成时间
	 */
	@ExcelColumn(name = "订单完成时间", sort = 1)
	private Date orderCompleteTime;
	/**
	 * 是否退货单
	 */
	@ExcelColumn(name = "是否退货单", sort = 2)
	private String isReturnOrder;
	/**
	 * 产品名称
	 */
	@ExcelColumn(name = "产品名称", sort = 3)
	private String productName;
	/**
	 * 销售规格
	 */
	@ExcelColumn(name = "销售规格", sort = 4)
	private String productSaleSpec;
	/**
	 * 配送系数
	 */
	@ExcelColumn(name = "配送系数", sort = 11)
	private BigDecimal distributionPercent;
	/**
	 * 单件配送费用
	 */
	@ExcelColumn(name = "单件配送费用", sort = 12)
	private BigDecimal deliveryUnitprice;
	/**
	 * 配送件数
	 */
	@ExcelColumn(name = "配送件数", sort = 6)
	private BigDecimal deliveryQuantity;
	/**
	 * 配送金额
	 */
	@ExcelColumn(name = "配送金额", sort = 7)
	private BigDecimal deliveryAmount;
	/**
	 * 配送退货件数
	 */
	@ExcelColumn(name = "配送退货件数", sort = 9)
	private BigDecimal returnQuantity;
	/**
	 * 配送退货金额
	 */
	@ExcelColumn(name = "配送退货金额", sort = 10)
	private BigDecimal returnAmount;
	/**
	 * 订单数量
	 */
	@ExcelColumn(name = "产品数量", sort = 5)
	private Integer saleCount;
	/**
	 * 退货订单数量
	 */
	@ExcelColumn(name = "退货产品数量", sort = 8)
	private Integer returnCount;

	public Long getOrder_Id() {
		return order_Id;
	}

	public void setOrder_Id(Long order_Id) {
		this.order_Id = order_Id;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Date getOrderCompleteTime() {
		return orderCompleteTime;
	}

	public void setOrderCompleteTime(Date orderCompleteTime) {
		this.orderCompleteTime = orderCompleteTime;
	}

	public String getIsReturnOrder() {
		return isReturnOrder;
	}

	public void setIsReturnOrder(String isReturnOrder) {
		this.isReturnOrder = isReturnOrder;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductSaleSpec() {
		return productSaleSpec;
	}

	public void setProductSaleSpec(String productSaleSpec) {
		this.productSaleSpec = productSaleSpec;
	}

	public BigDecimal getDistributionPercent() {
		return distributionPercent;
	}

	public void setDistributionPercent(BigDecimal distributionPercent) {
		this.distributionPercent = distributionPercent;
	}

	public BigDecimal getDeliveryUnitprice() {
		return deliveryUnitprice;
	}

	public void setDeliveryUnitprice(BigDecimal deliveryUnitprice) {
		this.deliveryUnitprice = deliveryUnitprice;
	}

	public BigDecimal getDeliveryQuantity() {
		return deliveryQuantity;
	}

	public void setDeliveryQuantity(BigDecimal deliveryQuantity) {
		this.deliveryQuantity = deliveryQuantity;
	}

	public BigDecimal getDeliveryAmount() {
		return deliveryAmount;
	}

	public void setDeliveryAmount(BigDecimal deliveryAmount) {
		this.deliveryAmount = deliveryAmount;
	}

	public BigDecimal getReturnQuantity() {
		return returnQuantity;
	}

	public void setReturnQuantity(BigDecimal returnQuantity) {
		this.returnQuantity = returnQuantity;
	}

	public BigDecimal getReturnAmount() {
		return returnAmount;
	}

	public void setReturnAmount(BigDecimal returnAmount) {
		this.returnAmount = returnAmount;
	}

	public Integer getSaleCount() {
		return saleCount;
	}

	public void setSaleCount(Integer saleCount) {
		this.saleCount = saleCount;
	}

	public Integer getReturnCount() {
		return returnCount;
	}

	public void setReturnCount(Integer returnCount) {
		this.returnCount = returnCount;
	}
}
