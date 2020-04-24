package com.yijiupi.himalaya.op.model.earningreport.vo;

import java.io.Serializable;
import java.math.BigDecimal;

import com.yijiupi.himalaya.op.util.ExcelColumn;

public class OrderPageVO implements Serializable {
	/**
	 * 下单城市名称
	 */
	@ExcelColumn(name = "下单城市", sort = 0)
	private String fromCityName;
	/**
	 * 单据类型名称
	 */
	@ExcelColumn(name = "订单类型", sort = 1)
	private String orderTypeName;
	/**
	 * 业务单据号
	 */
	@ExcelColumn(name = "订单编号", sort = 2)
	private String businessNo;
	/**
	 * 单据状态
	 */
	@ExcelColumn(name = "订单状态", sort = 3)
	private String stateName;
	/**
	 * 下单时间
	 */
	@ExcelColumn(name = "下单时间", sort = 4)
	private String orderCreateTime;
	/**
	 * 
	 */
	@ExcelColumn(name = "订单金额", sort = 5)
	private BigDecimal payableAmount;

	/**
	 * 完成时间
	 */
	/*
	 * @ExcelColumn(name = "完成时间", sort = 4) private String orderCompleteTime;
	 *//**
		 * 配送时间
		 *//*
		 * @ExcelColumn(name = "发货时间", sort = 5) private String deliveryTime;
		 * @ExcelColumn(name = "经纪人", sort = 8) private String salesManName;
		 * @ExcelColumn(name = "收货人姓名", sort = 9) private String contact;
		 * @ExcelColumn(name = "收货人手机", sort = 10) private String contactPhone;
		 * @ExcelColumn(name = "收货人公司", sort = 11) private String contactCompanyName;
		 * @ExcelColumn(name = "司机应收金额", sort = 13) private BigDecimal driverOrderAmount;
		 * @ExcelColumn(name = "收货人地址", sort = 14) private String detailAddress; //
		 * @ExcelColumn(name = "产品名称", sort = 15) private String productName;
		 * @ExcelColumn(name = "规格", sort = 16) private String productSaleSpec;
		 * @ExcelColumn(name = "应付金额/元", sort = 17) private BigDecimal itemPayableAmount;
		 * @ExcelColumn(name = "销售数量", sort = 18) private BigDecimal saleCount;
		 * @ExcelColumn(name = "单价/元", sort = 19) private BigDecimal sellPrice;
		 */
	public String getBusinessNo() {
		return businessNo;
	}

	public void setBusinessNo(String businessNo) {
		this.businessNo = businessNo;
	}

	public String getOrderTypeName() {
		return orderTypeName;
	}

	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
	}

	public String getOrderCreateTime() {
		return orderCreateTime;
	}

	public void setOrderCreateTime(String orderCreateTime) {
		this.orderCreateTime = orderCreateTime;
	}

	public String getFromCityName() {
		return fromCityName;
	}

	public void setFromCityName(String fromCityName) {
		this.fromCityName = fromCityName;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public BigDecimal getPayableAmount() {
		return payableAmount;
	}

	public void setPayableAmount(BigDecimal payableAmount) {
		this.payableAmount = payableAmount;
	}
}
