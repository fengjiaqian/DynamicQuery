package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 订单、退货单同步新增
 * @author: tangkun
 * @date: 2017年10月11日 上午10:30:47
 */
public class OrderItemDTO implements Serializable {
	private static final long serialVersionUID = -8965416745360041997L;
	/**
	 * 订单明细ID
	 */
	private Long orderItemId;
	/**
	 * SKU
	 */
	private Long productSkuId;
	/**
	 * SKU名称
	 */
	private String productName;
	/**
	 * 销售规格名称
	 */
	private String productSaleSpec;
	/**
	 * 包装规格名称
	 */
	private String productSpec;
	/**
	 * 销售规格系数
	 */
	private Integer saleSpecQuantity;
	/**
	 * 包装规格系数
	 */
	private Integer specQuantity;
	/**
	 * 品牌
	 */
	private String productBrand;
	/**
	 * 产品统计分类
	 */
	private Integer productStatisticsClass;
	/**
	 * 统计类目
	 */
	private String statisticsCategoryName;
	/**
	 * 条形码
	 */
	private String boxCode;
	/**
	 * 销售数量
	 */
	private Integer saleCount;
	/**
	 * 销售数量小单位
	 */
	private Integer minUnitTotalCount;
	/**
	 * 销售单价
	 */
	private BigDecimal sellPrice;
	/**
	 * 销售价格单位
	 */
	private String sellPriceUnit;
	/**
	 * 活动来源ID
	 */
	private Byte sourceType;
	/**
	 * 订单项来源,XX活动
	 */
	private String sourceId;
	/**
	 * 活动名称
	 */
	private String sourceName;
	/**
	 * 普通商品(0),赠送商品(1),限时惠商品(2),加价购商品(3)
	 */
	private Byte productType;
	/**
	 * 大单位
	 */
	private String packageName;
	/**
	 * 小单位
	 */
	private String unitName;
	/**
	 * 销售模式
	 */
	private Byte saleMode;
	/**
	 * 销售单位
	 */
	private String sellUnit;
	/**
	 * 供应商ID
	 */
	private Integer supplierId;
	/**
	 * 产品总价
	 */
	private BigDecimal totalAmount;
	/**
	 * 总价立减
	 */
	private BigDecimal reduceProductAmount;
	/**
	 * 订单满减
	 */
	private BigDecimal reduceOrderAmount;
	/**
	 * 优惠券
	 */
	private BigDecimal reduceCouponAmount;
	/**
	 * 红包
	 */
	private BigDecimal reduceBonusAmount;
	/**
	 * 自提优惠金额.
	 */
	private BigDecimal reduceSelfPickUp;
	/**
	 * 合计优惠金额
	 */
	private BigDecimal reduceTotal;
	/**
	 * 定金金额
	 */
	private BigDecimal depositAmount;
	/**
	 * 应付金额
	 */
	private BigDecimal payAmount;
	/**
	 * 产品业务类型
	 */
	private Byte productBusinessClass;

	public Byte getProductBusinessClass() {
		return productBusinessClass;
	}

	public void setProductBusinessClass(Byte productBusinessClass) {
		this.productBusinessClass = productBusinessClass;
	}

	/**
	 * 获取 订单明细ID
	 */
	public Long getOrderItemId() {
		return orderItemId;
	}

	/**
	 * 设置 订单明细ID
	 */
	public void setOrderItemId(Long orderItemId) {
		this.orderItemId = orderItemId;
	}

	/**
	 * 获取 SKU
	 */
	public Long getProductSkuId() {
		return productSkuId;
	}

	/**
	 * 设置 SKU
	 */
	public void setProductSkuId(Long productSkuId) {
		this.productSkuId = productSkuId;
	}

	/**
	 * 获取 SKU名称
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * 设置 SKU名称
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * 获取 销售规格名称
	 */
	public String getProductSaleSpec() {
		return productSaleSpec;
	}

	/**
	 * 设置 销售规格名称
	 */
	public void setProductSaleSpec(String productSaleSpec) {
		this.productSaleSpec = productSaleSpec;
	}

	/**
	 * 获取 包装规格名称
	 */
	public String getProductSpec() {
		return productSpec;
	}

	/**
	 * 设置 包装规格名称
	 */
	public void setProductSpec(String productSpec) {
		this.productSpec = productSpec;
	}

	/**
	 * 获取 销售规格系数
	 */
	public Integer getSaleSpecQuantity() {
		return saleSpecQuantity;
	}

	/**
	 * 设置 销售规格系数
	 */
	public void setSaleSpecQuantity(Integer saleSpecQuantity) {
		this.saleSpecQuantity = saleSpecQuantity;
	}

	/**
	 * 获取 包装规格系数
	 */
	public Integer getSpecQuantity() {
		return specQuantity;
	}

	/**
	 * 设置 包装规格系数
	 */
	public void setSpecQuantity(Integer specQuantity) {
		this.specQuantity = specQuantity;
	}

	/**
	 * 获取 销售数量
	 */
	public Integer getSaleCount() {
		return saleCount;
	}

	/**
	 * 设置 销售数量
	 */
	public void setSaleCount(Integer saleCount) {
		this.saleCount = saleCount;
	}

	/**
	 * 获取 销售数量小单位
	 */
	public Integer getMinUnitTotalCount() {
		return minUnitTotalCount;
	}

	/**
	 * 设置 销售数量小单位
	 */
	public void setMinUnitTotalCount(Integer minUnitTotalCount) {
		this.minUnitTotalCount = minUnitTotalCount;
	}

	/**
	 * 获取 销售单价
	 */
	public BigDecimal getSellPrice() {
		return sellPrice;
	}

	/**
	 * 设置 销售单价
	 */
	public void setSellPrice(BigDecimal sellPrice) {
		this.sellPrice = sellPrice;
	}

	/**
	 * 获取 销售价格单位
	 */
	public String getSellPriceUnit() {
		return sellPriceUnit;
	}

	/**
	 * 设置 销售价格单位
	 */
	public void setSellPriceUnit(String sellPriceUnit) {
		this.sellPriceUnit = sellPriceUnit;
	}

	/**
	 * 获取 活动来源ID
	 */
	public Byte getSourceType() {
		return sourceType;
	}

	/**
	 * 设置 活动来源ID
	 */
	public void setSourceType(Byte sourceType) {
		this.sourceType = sourceType;
	}

	/**
	 * 获取 订单项来源,XX活动
	 */
	public String getSourceId() {
		return sourceId;
	}

	/**
	 * 设置 订单项来源,XX活动
	 */
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}

	/**
	 * 获取 活动名称
	 */
	public String getSourceName() {
		return sourceName;
	}

	/**
	 * 设置 活动名称
	 */
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}

	/**
	 * 获取 普通商品(0),赠送商品(1),限时惠商品(2),加价购商品(3)
	 */
	public Byte getProductType() {
		return productType;
	}

	/**
	 * 设置 普通商品(0),赠送商品(1),限时惠商品(2),加价购商品(3)
	 */
	public void setProductType(Byte productType) {
		this.productType = productType;
	}

	/**
	 * 获取 大单位
	 */
	public String getPackageName() {
		return packageName;
	}

	/**
	 * 设置 大单位
	 */
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	/**
	 * 获取 小单位
	 */
	public String getUnitName() {
		return unitName;
	}

	/**
	 * 设置 小单位
	 */
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	/**
	 * 获取 销售模式
	 */
	public Byte getSaleMode() {
		return saleMode;
	}

	/**
	 * 设置 销售模式
	 */
	public void setSaleMode(Byte saleMode) {
		this.saleMode = saleMode;
	}

	/**
	 * 获取 销售单位
	 */
	public String getSellUnit() {
		return sellUnit;
	}

	/**
	 * 设置 销售单位
	 */
	public void setSellUnit(String sellUnit) {
		this.sellUnit = sellUnit;
	}

	/**
	 * 获取 供应商ID
	 */
	public Integer getSupplierId() {
		return supplierId;
	}

	/**
	 * 设置 供应商ID
	 */
	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}

	/**
	 * 获取 产品总价
	 */
	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	/**
	 * 设置 产品总价
	 */
	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	/**
	 * 获取 总价立减
	 */
	public BigDecimal getReduceProductAmount() {
		return reduceProductAmount;
	}

	/**
	 * 设置 总价立减
	 */
	public void setReduceProductAmount(BigDecimal reduceProductAmount) {
		this.reduceProductAmount = reduceProductAmount;
	}

	/**
	 * 获取 订单满减
	 */
	public BigDecimal getReduceOrderAmount() {
		return reduceOrderAmount;
	}

	/**
	 * 设置 订单满减
	 */
	public void setReduceOrderAmount(BigDecimal reduceOrderAmount) {
		this.reduceOrderAmount = reduceOrderAmount;
	}

	/**
	 * 获取 优惠券
	 */
	public BigDecimal getReduceCouponAmount() {
		return reduceCouponAmount;
	}

	/**
	 * 设置 优惠券
	 */
	public void setReduceCouponAmount(BigDecimal reduceCouponAmount) {
		this.reduceCouponAmount = reduceCouponAmount;
	}

	/**
	 * 获取 红包
	 */
	public BigDecimal getReduceBonusAmount() {
		return reduceBonusAmount;
	}

	/**
	 * 设置 红包
	 */
	public void setReduceBonusAmount(BigDecimal reduceBonusAmount) {
		this.reduceBonusAmount = reduceBonusAmount;
	}

	/**
	 * 获取 自提优惠金额.
	 */
	public BigDecimal getReduceSelfPickUp() {
		return reduceSelfPickUp;
	}

	/**
	 * 设置 自提优惠金额.
	 */
	public void setReduceSelfPickUp(BigDecimal reduceSelfPickUp) {
		this.reduceSelfPickUp = reduceSelfPickUp;
	}

	/**
	 * 获取 合计优惠金额
	 */
	public BigDecimal getReduceTotal() {
		return reduceTotal;
	}

	/**
	 * 设置 合计优惠金额
	 */
	public void setReduceTotal(BigDecimal reduceTotal) {
		this.reduceTotal = reduceTotal;
	}

	/**
	 * 获取 定金金额
	 */
	public BigDecimal getDepositAmount() {
		return depositAmount;
	}

	/**
	 * 设置 定金金额
	 */
	public void setDepositAmount(BigDecimal depositAmount) {
		this.depositAmount = depositAmount;
	}

	/**
	 * 获取 应付金额
	 */
	public BigDecimal getPayAmount() {
		return payAmount;
	}

	/**
	 * 设置 应付金额
	 */
	public void setPayAmount(BigDecimal payAmount) {
		this.payAmount = payAmount;
	}

	/**
	 * 获取 品牌
	 */
	public String getProductBrand() {
		return productBrand;
	}

	/**
	 * 设置 品牌
	 */
	public void setProductBrand(String productBrand) {
		this.productBrand = productBrand;
	}

	/**
	 * 获取 产品统计分类
	 */
	public Integer getProductStatisticsClass() {
		return productStatisticsClass;
	}

	/**
	 * 设置 产品统计分类
	 */
	public void setProductStatisticsClass(Integer productStatisticsClass) {
		this.productStatisticsClass = productStatisticsClass;
	}

	/**
	 * 获取 统计类目
	 */
	public String getStatisticsCategoryName() {
		return statisticsCategoryName;
	}

	/**
	 * 设置 统计类目
	 */
	public void setStatisticsCategoryName(String statisticsCategoryName) {
		this.statisticsCategoryName = statisticsCategoryName;
	}

	/**
	 * 获取 条形码
	 */
	public String getBoxCode() {
		return boxCode;
	}

	/**
	 * 设置 条形码
	 */
	public void setBoxCode(String boxCode) {
		this.boxCode = boxCode;
	}
}
