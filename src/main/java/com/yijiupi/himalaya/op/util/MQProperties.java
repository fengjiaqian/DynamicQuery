package com.yijiupi.himalaya.op.util;

/**
 * Created by 余明 on 2017-11-21.
 */
public class MQProperties {
    /**
     * 兑奖订单
     */
    public static final String AWARD_ORDER_QUEUE = "mq.supplychain.op.AwardOrder";
    /**
     * 快速下单消息
     */
    public static final String QUICK_ORDER_QUEUE = "mq.supplychain.op.OrderCreate";
    /**
     * 退货订单
     */
    public static final String RETURN_ORDER_QUEUE = "mq.supplychain.op.ReturnOrder";
}
