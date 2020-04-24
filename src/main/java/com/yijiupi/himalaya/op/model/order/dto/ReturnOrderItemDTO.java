package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * 退货单项.
 */
public class ReturnOrderItemDTO implements Serializable {
	private static final long serialVersionUID = 4090052424554892706L;
	/**
	 * 对应订单项.
	 */
	private OrderItemDTO relOrderItemDTO;
	/**
	 * 退货单项ID.
	 */
	private Long orderItemId;
	/**
	 * 退货数量.
	 */
	private Integer returnCount;
	/**
	 * 退货数量(小单位).
	 */
	private Integer returnMinUnitCount;
	/**
	 * 退款金额.
	 */
	private BigDecimal returnAmount;
	/**
	 * 退货返还红包金额
	 */
	private BigDecimal returnBonusAmount;

	/**
	 * 获取 对应订单项.
	 */
	public OrderItemDTO getRelOrderItemDTO() {
		return relOrderItemDTO;
	}

	/**
	 * 设置 对应订单项.
	 */
	public void setRelOrderItemDTO(OrderItemDTO relOrderItemDTO) {
		this.relOrderItemDTO = relOrderItemDTO;
	}

	/**
	 * 获取 退货单项ID.
	 */
	public Long getOrderItemId() {
		return orderItemId;
	}

	/**
	 * 设置 退货单项ID.
	 */
	public void setOrderItemId(Long orderItemId) {
		this.orderItemId = orderItemId;
	}

	/**
	 * 获取 退货数量.
	 */
	public Integer getReturnCount() {
		return returnCount;
	}

	/**
	 * 设置 退货数量.
	 */
	public void setReturnCount(Integer returnCount) {
		this.returnCount = returnCount;
	}

	/**
	 * 获取 退货数量(小单位).
	 */
	public Integer getReturnMinUnitCount() {
		return returnMinUnitCount;
	}

	/**
	 * 设置 退货数量(小单位).
	 */
	public void setReturnMinUnitCount(Integer returnMinUnitCount) {
		this.returnMinUnitCount = returnMinUnitCount;
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
	 * 获取 退货返还红包金额
	 */
	public BigDecimal getReturnBonusAmount() {
		return returnBonusAmount;
	}

	/**
	 * 设置 退货返还红包金额
	 */
	public void setReturnBonusAmount(BigDecimal returnBonusAmount) {
		this.returnBonusAmount = returnBonusAmount;
	}
}
