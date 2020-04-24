package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 订单提交
 * @author: tangkun
 * @date: 2017年10月11日 上午10:27:21
 */
public class OrderDTO implements Serializable {
	private static final long serialVersionUID = -8965416745360041997L;
	/**
	 * 订单明细
	 */
	private List<OrderItemDTO> items;
	/**
	 * 城市ID
	 */
	private Integer cityId;
	/**
	 * 仓库ID
	 */
	private Integer warehouseId;
	/**
	 * 仓库类型
	 */
	private Integer warehouseType;
	/**
	 * 订单ID
	 */
	private Long orderId;
	/**
	 * 创建时间
	 */
	private Date createTime;
	/**
	 * 创建人
	 */
	private Integer createUserId;
	/**
	 * 客户默认0
	 */
	private Integer customerId;
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 订单类型
	 */
	private Byte orderType;
	/**
	 * 酒批订单类型
	 */
	private Byte jiupiOrderType;
	/**
	 * 酒批订单来源
	 */
	private Byte jiupiOrderSource;
	/**
	 * 下单时间
	 */
	private Date orderCreateTime;
	/**
	 * 订单状态
	 */
	private Short state;
	/**
	 * 支付方式
	 */
	private Byte payType;
	/**
	 * 收款方
	 */
	private Byte payee;
	/**
	 * 配送方式
	 */
	private Byte deliveryMode;
	/**
	 * 是否预售
	 */
	private Boolean isPreSale;
	/**
	 * 用户ID
	 */
	private Integer userId;
	/**
	 * 店铺名称
	 */
	private String userCompanyName;
	/**
	 * 客户名称
	 */
	private String userName;
	/**
	 * 用户标签
	 */
	private String userRemark;
	/**
	 * 用户类型
	 */
	private String userClassName;
	/**
	 * 收货地址经度
	 */
	private Float latitude;
	/**
	 * 收货地址纬度
	 */
	private Float longitude;
	/**
	 * 客户电话
	 */
	private String userMobileNo;
	/**
	 * 送货地址
	 */
	private String detailAddress;
	/**
	 * 订单配送地址
	 */
	private Integer addressId;
	/**
	 * 省
	 */
	private String province;
	/**
	 * 市
	 */
	private String city;
	/**
	 * 区县
	 */
	private String county;
	/**
	 * 街道
	 */
	private String street;
	/**
	 * 经纪人ID
	 */
	private Integer salesmanId;
	/**
	 * 经纪人名称
	 */
	private String salesmanName;
	/**
	 * 用户备注
	 */
	private String remarkUser;
	/**
	 * 取货方
	 */
	private Byte pickupType;
	/**
	 * 收货人
	 */
	private String contact;
	/**
	 * 收货人电话
	 */
	private String phone;
	/**
	 * 合作商ID
	 */
	private Long parterId;
	/**
	 * 合作商名称
	 */
	private String parterName;
	/**
	 * 关联合作商ID
	 */
	private Long partnerOrderId;
	/**
	 * 最后修改人
	 */
	private Integer lastUpdateUserId;
	/**
	 * 系统备注
	 */
	private String sysRemark;
	/**
	 * 赠送的优惠券总金额
	 */
	private BigDecimal giveCouponAmount;
	/**
	 * 赠送的红包总金额
	 */
	private BigDecimal giveBonusAmount;
	/**
	 * 赠送酒币
	 */
	private BigDecimal giveWineScore;
	/**
	 * 花费酒币
	 */
	private BigDecimal costWineScore;
	/**
	 * 下单金额
	 */
	private BigDecimal orderAmount;
	/**
	 * 订单满减
	 */
	private BigDecimal reduceAmount;
	/**
	 * 红包使用金额
	 */
	private BigDecimal useBonusAmount;
	/**
	 * 立减合计
	 */
	private BigDecimal productReduceAmount;
	/**
	 * 优惠券使用金额
	 */
	private BigDecimal useCouponAmount;
	/**
	 * 上次零头结余金额
	 */
	private BigDecimal lastOddBalanceAmount;
	/**
	 * 本次零头结余金额
	 */
	private BigDecimal newOddBalanceAmount;
	/**
	 * 本次订单抹零金额
	 */
	private BigDecimal firstOddAmount;
	/**
	 * 部分配送时：本次订单抹零金额（系统自动计算的）
	 */
	private BigDecimal twiceOddAmount;
	/**
	 * 部分配送是：本次订单抹零金额（人工修正的）
	 */
	private BigDecimal twiceOddCorrectAmount;
	/**
	 * 最终的订单抹零金额
	 */
	private BigDecimal oddAmount;
	/**
	 * 定金金额
	 */
	private BigDecimal depositAmount;
	/**
	 * 应付金额
	 */
	private BigDecimal payableAmount;
	/**
	 * 取货仓库ID.
	 */
	private Integer pickupWarehouseId;
	/**
	 * 店铺Id.
	 */
	private Integer shopId;
	/**
	 * 店铺名称.
	 */
	private String shopName;

	public String getUserRemark() {
		return userRemark;
	}

	public void setUserRemark(String userRemark) {
		this.userRemark = userRemark;
	}

	public String getUserClassName() {
		return userClassName;
	}

	public void setUserClassName(String userClassName) {
		this.userClassName = userClassName;
	}

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public Integer getPickupWarehouseId() {
		return pickupWarehouseId;
	}

	public void setPickupWarehouseId(Integer pickupWarehouseId) {
		this.pickupWarehouseId = pickupWarehouseId;
	}

	public Integer getShopId() {
		return shopId;
	}

	public void setShopId(Integer shopId) {
		this.shopId = shopId;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	/**
	 * 获取 订单明细
	 */
	public List<OrderItemDTO> getItems() {
		return items;
	}

	/**
	 * 设置 订单明细
	 */
	public void setItems(List<OrderItemDTO> items) {
		this.items = items;
	}

	/**
	 * 获取 城市ID
	 */
	public Integer getCityId() {
		return cityId;
	}

	/**
	 * 设置 城市ID
	 */
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	/**
	 * 获取 仓库ID
	 */
	public Integer getWarehouseId() {
		return warehouseId;
	}

	/**
	 * 设置 仓库ID
	 */
	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}

	/**
	 * 获取 订单ID
	 */
	public Long getOrderId() {
		return orderId;
	}

	/**
	 * 设置 订单ID
	 */
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	/**
	 * 获取 创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * 设置 创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取 创建人
	 */
	public Integer getCreateUserId() {
		return createUserId;
	}

	/**
	 * 设置 创建人
	 */
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}

	/**
	 * 获取 客户默认0
	 */
	public Integer getCustomerId() {
		return customerId;
	}

	/**
	 * 设置 客户默认0
	 */
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	/**
	 * 获取 订单号
	 */
	public String getOrderNo() {
		return orderNo;
	}

	/**
	 * 设置 订单号
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * 获取 订单类型
	 */
	public Byte getOrderType() {
		return orderType;
	}

	/**
	 * 设置 订单类型
	 */
	public void setOrderType(Byte orderType) {
		this.orderType = orderType;
	}

	/**
	 * 获取 酒批订单类型
	 */
	public Byte getJiupiOrderType() {
		return jiupiOrderType;
	}

	/**
	 * 设置 酒批订单类型
	 */
	public void setJiupiOrderType(Byte jiupiOrderType) {
		this.jiupiOrderType = jiupiOrderType;
	}

	/**
	 * 获取 酒批订单来源
	 */
	public Byte getJiupiOrderSource() {
		return jiupiOrderSource;
	}

	/**
	 * 设置 酒批订单来源
	 */
	public void setJiupiOrderSource(Byte jiupiOrderSource) {
		this.jiupiOrderSource = jiupiOrderSource;
	}

	/**
	 * 获取 下单时间
	 */
	public Date getOrderCreateTime() {
		return orderCreateTime;
	}

	/**
	 * 设置 下单时间
	 */
	public void setOrderCreateTime(Date orderCreateTime) {
		this.orderCreateTime = orderCreateTime;
	}

	/**
	 * 获取 订单状态
	 */
	public Short getState() {
		return state;
	}

	/**
	 * 设置 订单状态
	 */
	public void setState(Short state) {
		this.state = state;
	}

	/**
	 * 获取 支付方式
	 */
	public Byte getPayType() {
		return payType;
	}

	/**
	 * 设置 支付方式
	 */
	public void setPayType(Byte payType) {
		this.payType = payType;
	}

	/**
	 * 获取 收款方
	 */
	public Byte getPayee() {
		return payee;
	}

	/**
	 * 设置 收款方
	 */
	public void setPayee(Byte payee) {
		this.payee = payee;
	}

	/**
	 * 获取 配送方式
	 */
	public Byte getDeliveryMode() {
		return deliveryMode;
	}

	/**
	 * 设置 配送方式
	 */
	public void setDeliveryMode(Byte deliveryMode) {
		this.deliveryMode = deliveryMode;
	}

	/**
	 * 获取 是否预售
	 */
	public Boolean getIsPreSale() {
		return isPreSale;
	}

	/**
	 * 设置 是否预售
	 */
	public void setIsPreSale(Boolean isPreSale) {
		this.isPreSale = isPreSale;
	}

	/**
	 * 获取 用户ID
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * 设置 用户ID
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * 获取 店铺名称
	 */
	public String getUserCompanyName() {
		return userCompanyName;
	}

	/**
	 * 设置 店铺名称
	 */
	public void setUserCompanyName(String userCompanyName) {
		this.userCompanyName = userCompanyName;
	}

	/**
	 * 获取 客户名称
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * 设置 客户名称
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 获取 客户电话
	 */
	public String getUserMobileNo() {
		return userMobileNo;
	}

	/**
	 * 设置 客户电话
	 */
	public void setUserMobileNo(String userMobileNo) {
		this.userMobileNo = userMobileNo;
	}

	/**
	 * 获取 送货地址
	 */
	public String getDetailAddress() {
		return detailAddress;
	}

	/**
	 * 设置 送货地址
	 */
	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
	}

	/**
	 * 获取 订单配送地址
	 */
	public Integer getAddressId() {
		return addressId;
	}

	/**
	 * 设置 订单配送地址
	 */
	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public Integer getWarehouseType() {
		return warehouseType;
	}

	public void setWarehouseType(Integer warehouseType) {
		this.warehouseType = warehouseType;
	}

	/**
	 * 获取 省
	 */
	public String getProvince() {
		return province;
	}

	/**
	 * 设置 省
	 */
	public void setProvince(String province) {
		this.province = province;
	}

	/**
	 * 获取 市
	 */
	public String getCity() {
		return city;
	}

	/**
	 * 设置 市
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * 获取 区县
	 */
	public String getCounty() {
		return county;
	}

	/**
	 * 设置 区县
	 */
	public void setCounty(String county) {
		this.county = county;
	}

	/**
	 * 获取 街道
	 */
	public String getStreet() {
		return street;
	}

	/**
	 * 设置 街道
	 */
	public void setStreet(String street) {
		this.street = street;
	}

	/**
	 * 获取 经纪人ID
	 */
	public Integer getSalesmanId() {
		return salesmanId;
	}

	/**
	 * 设置 经纪人ID
	 */
	public void setSalesmanId(Integer salesmanId) {
		this.salesmanId = salesmanId;
	}

	/**
	 * 获取 经纪人名称
	 */
	public String getSalesmanName() {
		return salesmanName;
	}

	/**
	 * 设置 经纪人名称
	 */
	public void setSalesmanName(String salesmanName) {
		this.salesmanName = salesmanName;
	}

	/**
	 * 获取 用户备注
	 */
	public String getRemarkUser() {
		return remarkUser;
	}

	/**
	 * 设置 用户备注
	 */
	public void setRemarkUser(String remarkUser) {
		this.remarkUser = remarkUser;
	}

	/**
	 * 获取 取货方
	 */
	public Byte getPickupType() {
		return pickupType;
	}

	/**
	 * 设置 取货方
	 */
	public void setPickupType(Byte pickupType) {
		this.pickupType = pickupType;
	}

	/**
	 * 获取 收货人
	 */
	public String getContact() {
		return contact;
	}

	/**
	 * 设置 收货人
	 */
	public void setContact(String contact) {
		this.contact = contact;
	}

	/**
	 * 获取 收货人电话
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * 设置 收货人电话
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * 获取 合作商ID
	 */
	public Long getParterId() {
		return parterId;
	}

	/**
	 * 设置 合作商ID
	 */
	public void setParterId(Long parterId) {
		this.parterId = parterId;
	}

	/**
	 * 获取 合作商名称
	 */
	public String getParterName() {
		return parterName;
	}

	/**
	 * 设置 合作商名称
	 */
	public void setParterName(String parterName) {
		this.parterName = parterName;
	}

	/**
	 * 获取 关联合作商ID
	 */
	public Long getPartnerOrderId() {
		return partnerOrderId;
	}

	/**
	 * 设置 关联合作商ID
	 */
	public void setPartnerOrderId(Long partnerOrderId) {
		this.partnerOrderId = partnerOrderId;
	}

	/**
	 * 获取 最后修改人
	 */
	public Integer getLastUpdateUserId() {
		return lastUpdateUserId;
	}

	/**
	 * 设置 最后修改人
	 */
	public void setLastUpdateUserId(Integer lastUpdateUserId) {
		this.lastUpdateUserId = lastUpdateUserId;
	}

	/**
	 * 获取 系统备注
	 */
	public String getSysRemark() {
		return sysRemark;
	}

	/**
	 * 设置 系统备注
	 */
	public void setSysRemark(String sysRemark) {
		this.sysRemark = sysRemark;
	}

	/**
	 * 获取 赠送的优惠券总金额
	 */
	public BigDecimal getGiveCouponAmount() {
		return giveCouponAmount;
	}

	/**
	 * 设置 赠送的优惠券总金额
	 */
	public void setGiveCouponAmount(BigDecimal giveCouponAmount) {
		this.giveCouponAmount = giveCouponAmount;
	}

	/**
	 * 获取 赠送的红包总金额
	 */
	public BigDecimal getGiveBonusAmount() {
		return giveBonusAmount;
	}

	/**
	 * 设置 赠送的红包总金额
	 */
	public void setGiveBonusAmount(BigDecimal giveBonusAmount) {
		this.giveBonusAmount = giveBonusAmount;
	}

	/**
	 * 获取 赠送酒币
	 */
	public BigDecimal getGiveWineScore() {
		return giveWineScore;
	}

	/**
	 * 设置 赠送酒币
	 */
	public void setGiveWineScore(BigDecimal giveWineScore) {
		this.giveWineScore = giveWineScore;
	}

	/**
	 * 获取 花费酒币
	 */
	public BigDecimal getCostWineScore() {
		return costWineScore;
	}

	/**
	 * 设置 花费酒币
	 */
	public void setCostWineScore(BigDecimal costWineScore) {
		this.costWineScore = costWineScore;
	}

	/**
	 * 获取 下单金额
	 */
	public BigDecimal getOrderAmount() {
		return orderAmount;
	}

	/**
	 * 设置 下单金额
	 */
	public void setOrderAmount(BigDecimal orderAmount) {
		this.orderAmount = orderAmount;
	}

	/**
	 * 获取 订单满减
	 */
	public BigDecimal getReduceAmount() {
		return reduceAmount;
	}

	/**
	 * 设置 订单满减
	 */
	public void setReduceAmount(BigDecimal reduceAmount) {
		this.reduceAmount = reduceAmount;
	}

	/**
	 * 获取 红包使用金额
	 */
	public BigDecimal getUseBonusAmount() {
		return useBonusAmount;
	}

	/**
	 * 设置 红包使用金额
	 */
	public void setUseBonusAmount(BigDecimal useBonusAmount) {
		this.useBonusAmount = useBonusAmount;
	}

	/**
	 * 获取 立减合计
	 */
	public BigDecimal getProductReduceAmount() {
		return productReduceAmount;
	}

	/**
	 * 设置 立减合计
	 */
	public void setProductReduceAmount(BigDecimal productReduceAmount) {
		this.productReduceAmount = productReduceAmount;
	}

	/**
	 * 获取 优惠券使用金额
	 */
	public BigDecimal getUseCouponAmount() {
		return useCouponAmount;
	}

	/**
	 * 设置 优惠券使用金额
	 */
	public void setUseCouponAmount(BigDecimal useCouponAmount) {
		this.useCouponAmount = useCouponAmount;
	}

	/**
	 * 获取 上次零头结余金额
	 */
	public BigDecimal getLastOddBalanceAmount() {
		return lastOddBalanceAmount;
	}

	/**
	 * 设置 上次零头结余金额
	 */
	public void setLastOddBalanceAmount(BigDecimal lastOddBalanceAmount) {
		this.lastOddBalanceAmount = lastOddBalanceAmount;
	}

	/**
	 * 获取 本次零头结余金额
	 */
	public BigDecimal getNewOddBalanceAmount() {
		return newOddBalanceAmount;
	}

	/**
	 * 设置 本次零头结余金额
	 */
	public void setNewOddBalanceAmount(BigDecimal newOddBalanceAmount) {
		this.newOddBalanceAmount = newOddBalanceAmount;
	}

	/**
	 * 获取 本次订单抹零金额
	 */
	public BigDecimal getFirstOddAmount() {
		return firstOddAmount;
	}

	/**
	 * 设置 本次订单抹零金额
	 */
	public void setFirstOddAmount(BigDecimal firstOddAmount) {
		this.firstOddAmount = firstOddAmount;
	}

	/**
	 * 获取 部分配送时：本次订单抹零金额（系统自动计算的）
	 */
	public BigDecimal getTwiceOddAmount() {
		return twiceOddAmount;
	}

	/**
	 * 设置 部分配送时：本次订单抹零金额（系统自动计算的）
	 */
	public void setTwiceOddAmount(BigDecimal twiceOddAmount) {
		this.twiceOddAmount = twiceOddAmount;
	}

	/**
	 * 获取 部分配送是：本次订单抹零金额（人工修正的）
	 */
	public BigDecimal getTwiceOddCorrectAmount() {
		return twiceOddCorrectAmount;
	}

	/**
	 * 设置 部分配送是：本次订单抹零金额（人工修正的）
	 */
	public void setTwiceOddCorrectAmount(BigDecimal twiceOddCorrectAmount) {
		this.twiceOddCorrectAmount = twiceOddCorrectAmount;
	}

	/**
	 * 获取 最终的订单抹零金额
	 */
	public BigDecimal getOddAmount() {
		return oddAmount;
	}

	/**
	 * 设置 最终的订单抹零金额
	 */
	public void setOddAmount(BigDecimal oddAmount) {
		this.oddAmount = oddAmount;
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
	public BigDecimal getPayableAmount() {
		return payableAmount;
	}

	/**
	 * 设置 应付金额
	 */
	public void setPayableAmount(BigDecimal payableAmount) {
		this.payableAmount = payableAmount;
	}
}
