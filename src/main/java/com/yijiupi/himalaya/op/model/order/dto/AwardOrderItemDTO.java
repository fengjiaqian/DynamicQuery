package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;

/**
 * 兑奖订单明细
 * @author: tangkun
 * @date: 2017年11月13日 下午3:23:36
 */
public class AwardOrderItemDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 兑奖订单ID
	 */
	private Long orderId;
	/**
	 * 订单明细ID
	 */
	private Long orderItemId;
	/**
	 * 兑奖订单名称
	 */
	private String awardName;
	/**
	 * 申请兑奖数量
	 */
	private Integer applyAwardCount;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(Long orderItemId) {
		this.orderItemId = orderItemId;
	}

	public String getAwardName() {
		return awardName;
	}

	public void setAwardName(String awardName) {
		this.awardName = awardName;
	}

	public Integer getApplyAwardCount() {
		return applyAwardCount;
	}

	public void setApplyAwardCount(Integer applyAwardCount) {
		this.applyAwardCount = applyAwardCount;
	}
}
