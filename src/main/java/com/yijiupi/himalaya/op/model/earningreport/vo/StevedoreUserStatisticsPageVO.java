package com.yijiupi.himalaya.op.model.earningreport.vo;

import com.yijiupi.himalaya.op.util.ExcelColumn;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 搬运工业绩报表VO
 * @author liushuang 2017/12/7
 */
public class StevedoreUserStatisticsPageVO implements Serializable {
    private Integer city_Id;
    @ExcelColumn(name = "城市", sort = 3)
    private String cityName;
    /**
     * 日期
     */
    @ExcelColumn(name = "月份", sort = 0)
    private Integer statisticsClass;
    private Integer stevedoreUser_Id;
    /**
     * 搬运工
     */
    @ExcelColumn(name = "搬运工", sort = 1)
    private String stevedoreUserName;
    /**
     * 电话
     */
    @ExcelColumn(name = "手机号", sort = 2)
    private String stevedoreUserMobileNo;
    /**
     * 配送件数
     */
    @ExcelColumn(name = "产品件数", sort = 5)
    private BigDecimal deliveryQuantity;
    /**
     * 配送金额
     */
    private BigDecimal deliveryAmount;
    /**
     * 订单金额
     */
    @ExcelColumn(name = "产品金额", sort = 4)
    private BigDecimal orderAmount;
    /**
     * 退货件数
     */
    @ExcelColumn(name = "退货件数", sort = 9)
    private BigDecimal returnQuantity;
    /**
     * 退货金额
     */
    private BigDecimal returnAmount;
    /**
     * 退货金额
     */
    @ExcelColumn(name = "退货金额", sort = 8)
    private BigDecimal returnOrderAmount;
    /**
     * 配送件数(酒类)
     */
    @ExcelColumn(name = "酒类件数", sort = 6)
    private BigDecimal deliveryQuantityLiquor;
    /**
     * 配送件数(非酒类)
     */
    @ExcelColumn(name = "非酒类件数", sort = 7)
    private BigDecimal deliveryQuantityUnLiquor;
    /**
     * 退货件数(酒类)
     */
    @ExcelColumn(name = "退货件数(酒类)", sort = 10)
    private BigDecimal returnQuantityLiquor;
    /**
     * 退货件数(非酒类)
     */
    @ExcelColumn(name = "退货件数(非酒类)", sort = 11)
    private BigDecimal returnQuantityUnLiquor;


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
     * @return statisticsClass 日期
     */
    public Integer getStatisticsClass() {
        return this.statisticsClass;
    }

    /**
     * 设置 日期
     *
     * @param statisticsClass 日期
     */
    public void setStatisticsClass(Integer statisticsClass) {
        this.statisticsClass = statisticsClass;
    }

    /**
     * 获取
     *
     * @return stevedoreUser_Id
     */
    public Integer getStevedoreUser_Id() {
        return this.stevedoreUser_Id;
    }

    /**
     * 设置
     *
     * @param stevedoreUser_Id
     */
    public void setStevedoreUser_Id(Integer stevedoreUser_Id) {
        this.stevedoreUser_Id = stevedoreUser_Id;
    }

    /**
     * 获取 司机
     *
     * @return stevedoreUserName 司机
     */
    public String getStevedoreUserName() {
        return this.stevedoreUserName;
    }

    /**
     * 设置 司机
     *
     * @param stevedoreUserName 司机
     */
    public void setStevedoreUserName(String stevedoreUserName) {
        this.stevedoreUserName = stevedoreUserName;
    }

    /**
     * 获取 电话
     *
     * @return stevedoreUserMobileNo 电话
     */
    public String getStevedoreUserMobileNo() {
        return this.stevedoreUserMobileNo;
    }

    /**
     * 设置 电话
     *
     * @param stevedoreUserMobileNo 电话
     */
    public void setStevedoreUserMobileNo(String stevedoreUserMobileNo) {
        this.stevedoreUserMobileNo = stevedoreUserMobileNo;
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
     * 获取 订单金额
     *
     * @return orderAmount 订单金额
     */
    public BigDecimal getOrderAmount() {
        return this.orderAmount;
    }

    /**
     * 设置 订单金额
     *
     * @param orderAmount 订单金额
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
     * 获取 退货金额
     *
     * @return returnOrderAmount 退货金额
     */
    public BigDecimal getReturnOrderAmount() {
        return this.returnOrderAmount;
    }

    /**
     * 设置 退货金额
     *
     * @param returnOrderAmount 退货金额
     */
    public void setReturnOrderAmount(BigDecimal returnOrderAmount) {
        this.returnOrderAmount = returnOrderAmount;
    }

    /**
     * 获取 配送件数(酒类)
     *
     * @return deliveryQuantityLiquor 配送件数(酒类)
     */
    public BigDecimal getDeliveryQuantityLiquor() {
        return this.deliveryQuantityLiquor;
    }

    /**
     * 设置 配送件数(酒类)
     *
     * @param deliveryQuantityLiquor 配送件数(酒类)
     */
    public void setDeliveryQuantityLiquor(BigDecimal deliveryQuantityLiquor) {
        this.deliveryQuantityLiquor = deliveryQuantityLiquor;
    }

    /**
     * 获取 配送件数(非酒类)
     *
     * @return deliveryQuantityUnLiquor 配送件数(非酒类)
     */
    public BigDecimal getDeliveryQuantityUnLiquor() {
        return this.deliveryQuantityUnLiquor;
    }

    /**
     * 设置 配送件数(非酒类)
     *
     * @param deliveryQuantityUnLiquor 配送件数(非酒类)
     */
    public void setDeliveryQuantityUnLiquor(BigDecimal deliveryQuantityUnLiquor) {
        this.deliveryQuantityUnLiquor = deliveryQuantityUnLiquor;
    }

    /**
     * 获取 退货件数(酒类)
     *
     * @return returnQuantityLiquor 退货件数(酒类)
     */
    public BigDecimal getReturnQuantityLiquor() {
        return this.returnQuantityLiquor;
    }

    /**
     * 设置 退货件数(酒类)
     *
     * @param returnQuantityLiquor 退货件数(酒类)
     */
    public void setReturnQuantityLiquor(BigDecimal returnQuantityLiquor) {
        this.returnQuantityLiquor = returnQuantityLiquor;
    }

    /**
     * 获取 退货件数(非酒类)
     *
     * @return returnQuantityUnLiquor 退货件数(非酒类)
     */
    public BigDecimal getReturnQuantityUnLiquor() {
        return this.returnQuantityUnLiquor;
    }

    /**
     * 设置 退货件数(非酒类)
     *
     * @param returnQuantityUnLiquor 退货件数(非酒类)
     */
    public void setReturnQuantityUnLiquor(BigDecimal returnQuantityUnLiquor) {
        this.returnQuantityUnLiquor = returnQuantityUnLiquor;
    }
}
