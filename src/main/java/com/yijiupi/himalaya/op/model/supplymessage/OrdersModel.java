package com.yijiupi.himalaya.op.model.supplymessage;

/**
 * orders接受参数模型
 *
 * @author liushuang 2017/9/13
 */
public class OrdersModel {
    /**
     * 用户在前台输入的订单号字符串
     */
    private String orderNos;
    /**
     * 是否是退货订单
     */
    private Boolean hasReturnOrder;

    /**
     * 获取 用户在前台输入的订单号字符串
     *
     * @return orderNos 用户在前台输入的订单号字符串
     */
    public String getOrderNos() {
        return this.orderNos;
    }

    /**
     * 设置 用户在前台输入的订单号字符串
     *
     * @param orderNos 用户在前台输入的订单号字符串
     */
    public void setOrderNos(String orderNos) {
        this.orderNos = orderNos;
    }

    /**
     * 获取 是否是退货订单
     *
     * @return hasReturnOrder 是否是退货订单
     */
    public Boolean getHasReturnOrder() {
        return this.hasReturnOrder;
    }

    /**
     * 设置 是否是退货订单
     *
     * @param hasReturnOrder 是否是退货订单
     */
    public void setHasReturnOrder(Boolean hasReturnOrder) {
        this.hasReturnOrder = hasReturnOrder;
    }

    @Override
    public String toString() {
        return "OrdersModel{" +
                "orderNos='" + orderNos + '\'' +
                ", hasReturnOrder=" + hasReturnOrder +
                '}';
    }
}
