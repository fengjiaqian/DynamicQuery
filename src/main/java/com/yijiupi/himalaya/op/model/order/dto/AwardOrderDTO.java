package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 兑奖订单
 * @author: tangkun
 * @date: 2017年11月13日 下午2:38:46
 */
public class AwardOrderDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 订单明细
	 */
	private List<AwardOrderItemDTO> items;
	/**
	 * 城市ID
	 */
	private Integer cityId;
	/**
	 * 仓库ID
	 */
	private Integer warehouseId;
	/**
	 * 订单ID
	 */
	private Long orderId;
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 下单时间
	 */
	private Date orderCreateTime;
	/**
	 * 订单状态 1 待打印; 2 待收取; 3 待审核 4 审核通过; 5 已取消; 6 已拒绝
	 */
	private Short state;
	/**
	 * 创建人
	 */
	private Integer createUserId;
	/**
	 * 创建时间
	 */
	private Date createTime;
	/**
	 * 客户默认0
	 */
	private Integer customerId;
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
	 * 收货人
	 */
	private String contact;
	/**
	 * 收货人电话
	 */
	private String phone;
	/**
	 * 系统备注
	 */
	private String sysRemark;

	public List<AwardOrderItemDTO> getItems() {
		return items;
	}

	public void setItems(List<AwardOrderItemDTO> items) {
		this.items = items;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Date getOrderCreateTime() {
		return orderCreateTime;
	}

	public void setOrderCreateTime(Date orderCreateTime) {
		this.orderCreateTime = orderCreateTime;
	}

	public Short getState() {
		return state;
	}

	public void setState(Short state) {
		this.state = state;
	}

	public Integer getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserCompanyName() {
		return userCompanyName;
	}

	public void setUserCompanyName(String userCompanyName) {
		this.userCompanyName = userCompanyName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

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

	public String getUserMobileNo() {
		return userMobileNo;
	}

	public void setUserMobileNo(String userMobileNo) {
		this.userMobileNo = userMobileNo;
	}

	public String getDetailAddress() {
		return detailAddress;
	}

	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public Integer getSalesmanId() {
		return salesmanId;
	}

	public void setSalesmanId(Integer salesmanId) {
		this.salesmanId = salesmanId;
	}

	public String getSalesmanName() {
		return salesmanName;
	}

	public void setSalesmanName(String salesmanName) {
		this.salesmanName = salesmanName;
	}

	public String getRemarkUser() {
		return remarkUser;
	}

	public void setRemarkUser(String remarkUser) {
		this.remarkUser = remarkUser;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSysRemark() {
		return sysRemark;
	}

	public void setSysRemark(String sysRemark) {
		this.sysRemark = sysRemark;
	}
}
