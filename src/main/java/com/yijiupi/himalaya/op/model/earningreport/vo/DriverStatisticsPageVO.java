package com.yijiupi.himalaya.op.model.earningreport.vo;

import com.yijiupi.himalaya.op.util.ExcelColumn;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author liushuang 2017/11/23
 */
public class DriverStatisticsPageVO implements Serializable {
    private Integer city_Id;
    @ExcelColumn(name = "城市", sort = 3)
    private String cityName;
    /**
     * 日期
     */
    @ExcelColumn(name = "月份", sort = 0)
    private Integer dateTime;
    /**
     * 司机
     */
    @ExcelColumn(name = "司机", sort = 1)
    private String deliveryUserName;
    /**
     * 电话
     */
    @ExcelColumn(name = "手机号", sort = 2)
    private String deliveryUserMobileNo;
    /**
     * 配送件数
     */
    @ExcelColumn(name = "配送件数", sort = 5)
    private BigDecimal deliveryQuantity;
    private BigDecimal deliveryAmount;
    /**
     * 配送金额
     */
    @ExcelColumn(name = "配送金额", sort = 4)
    private BigDecimal orderAmount;
    /**
     * 退货件数
     */
    @ExcelColumn(name = "退货件数", sort = 7)
    private BigDecimal returnQuantity;


    private BigDecimal returnAmount;
    /**
     * 退货金额
     */
    @ExcelColumn(name = "退货金额", sort = 6)
    private BigDecimal returnOrderAmount;
    /**
     * 评价金额
     */
    @ExcelColumn(name = "客户评价补贴", sort = 9)
    private BigDecimal evaluationAmount;
    /**
     * 司机确认金额
     */
    @ExcelColumn(name = "司机确认补贴", sort = 8)
    private BigDecimal driverConfirmAmount;

    /**
     * 获取
     *
     * @return city_Id
     */
    public Integer getCity_Id() {
        return this.city_Id;
    }

    /**
     * 设置
     *
     * @param city_Id
     */
    public void setCity_Id(Integer city_Id) {
        this.city_Id = city_Id;
    }

    /**
     * 获取
     *
     * @return cityName
     */
    public String getCityName() {
        return this.cityName;
    }

    /**
     * 设置
     *
     * @param cityName
     */
    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    /**
     * 获取 日期
     *
     * @return dateTime 日期
     */
    public Integer getDateTime() {
        return this.dateTime;
    }

    /**
     * 设置 日期
     *
     * @param dateTime 日期
     */
    public void setDateTime(Integer dateTime) {
        this.dateTime = dateTime;
    }

    /**
     * 获取 司机
     *
     * @return deliveryUserName 司机
     */
    public String getDeliveryUserName() {
        return this.deliveryUserName;
    }

    /**
     * 设置 司机
     *
     * @param deliveryUserName 司机
     */
    public void setDeliveryUserName(String deliveryUserName) {
        this.deliveryUserName = deliveryUserName;
    }

    /**
     * 获取 电话
     *
     * @return deliveryUserMobileNo 电话
     */
    public String getDeliveryUserMobileNo() {
        return this.deliveryUserMobileNo;
    }

    /**
     * 设置 电话
     *
     * @param deliveryUserMobileNo 电话
     */
    public void setDeliveryUserMobileNo(String deliveryUserMobileNo) {
        this.deliveryUserMobileNo = deliveryUserMobileNo;
    }

    /**
     * 获取 配送件数
     *
     * @return deliveryQuantity 配送件数
     */
    public BigDecimal getDeliveryQuantity() {
        return this.deliveryQuantity;
    }

    /**
     * 设置 配送件数
     *
     * @param deliveryQuantity 配送件数
     */
    public void setDeliveryQuantity(BigDecimal deliveryQuantity) {
        this.deliveryQuantity = deliveryQuantity;
    }

    /**
     * 获取 配送金额
     *
     * @return deliveryAmount 配送金额
     */
    public BigDecimal getDeliveryAmount() {
        return this.deliveryAmount;
    }

    /**
     * 设置 配送金额
     *
     * @param deliveryAmount 配送金额
     */
    public void setDeliveryAmount(BigDecimal deliveryAmount) {
        this.deliveryAmount = deliveryAmount;
    }

    /**
     * 获取
     *
     * @return orderAmount
     */
    public BigDecimal getOrderAmount() {
        return this.orderAmount;
    }

    /**
     * 设置
     *
     * @param orderAmount
     */
    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }

    /**
     * 获取 退货件数
     *
     * @return returnQuantity 退货件数
     */
    public BigDecimal getReturnQuantity() {
        return this.returnQuantity;
    }

    /**
     * 设置 退货件数
     *
     * @param returnQuantity 退货件数
     */
    public void setReturnQuantity(BigDecimal returnQuantity) {
        this.returnQuantity = returnQuantity;
    }

    /**
     * 获取 退货金额
     *
     * @return returnAmount 退货金额
     */
    public BigDecimal getReturnAmount() {
        return this.returnAmount;
    }

    /**
     * 设置 退货金额
     *
     * @param returnAmount 退货金额
     */
    public void setReturnAmount(BigDecimal returnAmount) {
        this.returnAmount = returnAmount;
    }

    /**
     * 获取
     *
     * @return returnOrderAmount
     */
    public BigDecimal getReturnOrderAmount() {
        return this.returnOrderAmount;
    }

    /**
     * 设置
     *
     * @param returnOrderAmount
     */
    public void setReturnOrderAmount(BigDecimal returnOrderAmount) {
        this.returnOrderAmount = returnOrderAmount;
    }

    /**
     * 获取 评价金额
     *
     * @return evaluationAmount 评价金额
     */
    public BigDecimal getEvaluationAmount() {
        return this.evaluationAmount;
    }

    /**
     * 设置 评价金额
     *
     * @param evaluationAmount 评价金额
     */
    public void setEvaluationAmount(BigDecimal evaluationAmount) {
        this.evaluationAmount = evaluationAmount;
    }

    /**
     * 获取 司机确认金额
     *
     * @return driverConfirmAmount 司机确认金额
     */
    public BigDecimal getDriverConfirmAmount() {
        return this.driverConfirmAmount;
    }

    /**
     * 设置 司机确认金额
     *
     * @param driverConfirmAmount 司机确认金额
     */
    public void setDriverConfirmAmount(BigDecimal driverConfirmAmount) {
        this.driverConfirmAmount = driverConfirmAmount;
    }
}
