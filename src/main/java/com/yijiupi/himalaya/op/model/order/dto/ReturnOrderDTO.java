package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;


public class ReturnOrderDTO implements Serializable {
	private static final long serialVersionUID = -2939302336768488848L;
	/**
	 * 明细
	 */
	private List<ReturnOrderItemDTO> items;
	/**
	 * 退货单ID.
	 */
	private Long orderId;
	/**
	 * 订单状态
	 */
	private Short state;
	/**
	 * 退货单号.
	 */
	private String orderNo;
	/**
	 * 退货原因.
	 */
	private String reason;
	/**
	 * 用户备注.
	 */
	private String remarkUser;
	/**
	 * 客服备注.
	 */
	private String remarkService;
	/**
	 * 退款金额.
	 */
	private BigDecimal returnAmount;
	/**
	 * 退货返还红包金额.
	 */
	private BigDecimal returnBonusAmount;
	/**
	 * 酒币增/减数量.
	 */
	private BigDecimal scoreAmount;
	/**
	 * 对应订单(不包含订单项).
	 */
	private OrderDTO relOrder;

	public List<ReturnOrderItemDTO> getItems() {
		return items;
	}

	public void setItems(List<ReturnOrderItemDTO> items) {
		this.items = items;
	}

	public Short getState() {
		return state;
	}

	public void setState(Short state) {
		this.state = state;
	}

	/**
	 * 获取 退货单ID.
	 */
	public Long getOrderId() {
		return orderId;
	}

	/**
	 * 设置 退货单ID.
	 */
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	/**
	 * 获取 退货单号.
	 */
	public String getOrderNo() {
		return orderNo;
	}

	/**
	 * 设置 退货单号.
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * 获取 退货原因.
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * 设置 退货原因.
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * 获取 用户备注.
	 */
	public String getRemarkUser() {
		return remarkUser;
	}

	/**
	 * 设置 用户备注.
	 */
	public void setRemarkUser(String remarkUser) {
		this.remarkUser = remarkUser;
	}

	/**
	 * 获取 客服备注.
	 */
	public String getRemarkService() {
		return remarkService;
	}

	/**
	 * 设置 客服备注.
	 */
	public void setRemarkService(String remarkService) {
		this.remarkService = remarkService;
	}

	/**
	 * 获取 退款金额.
	 */
	public BigDecimal getReturnAmount() {
		return returnAmount;
	}

	/**
	 * 设置 退款金额.
	 */
	public void setReturnAmount(BigDecimal returnAmount) {
		this.returnAmount = returnAmount;
	}

	/**
	 * 获取 退货返还红包金额.
	 */
	public BigDecimal getReturnBonusAmount() {
		return returnBonusAmount;
	}

	/**
	 * 设置 退货返还红包金额.
	 */
	public void setReturnBonusAmount(BigDecimal returnBonusAmount) {
		this.returnBonusAmount = returnBonusAmount;
	}

	/**
	 * 获取 酒币增/减数量.
	 */
	public BigDecimal getScoreAmount() {
		return scoreAmount;
	}

	/**
	 * 设置 酒币增/减数量.
	 */
	public void setScoreAmount(BigDecimal scoreAmount) {
		this.scoreAmount = scoreAmount;
	}

	/**
	 * 获取 对应订单(不包含订单项).
	 */
	public OrderDTO getRelOrder() {
		return relOrder;
	}

	/**
	 * 设置 对应订单(不包含订单项).
	 */
	public void setRelOrder(OrderDTO relOrder) {
		this.relOrder = relOrder;
	}
}
