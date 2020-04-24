package com.yijiupi.himalaya.op.model.earningreport.vo;

import com.yijiupi.himalaya.op.util.ExcelColumn;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 仓管业绩报表
 * @author liushuang 2017/12/7
 */
public class StoreManageStatisticsPageVO implements Serializable{
    private Integer city_Id;
    /**
     * 城市
     */
    @ExcelColumn(name = "城市", sort = 2)
    private String cityName;
    private Integer warehouse_Id;
    /**
     * 仓库
     */
    @ExcelColumn(name = "仓库", sort = 1)
    private String warehouseName;
    /**
     * 日期
     */
    @ExcelColumn(name = "月份", sort = 0)
    private Integer statisticsClass;
    /**
     * 配送件数
     */
    @ExcelColumn(name = "产品件数", sort = 4)
    private BigDecimal deliveryQuantity;
    /**
     * 配送金额
     */
    private BigDecimal deliveryAmount;
    /**
     * 订单金额
     */
    @ExcelColumn(name = "产品金额", sort =3)
    private BigDecimal orderAmount;
    /**
     * 退货件数
     */
    @ExcelColumn(name = "退货件数", sort = 8)
    private BigDecimal returnQuantity;
    /**
     * 配送退货金额
     */
    private BigDecimal returnAmount;
    /**
     * 退货单金额
     */
    @ExcelColumn(name = "退货金额", sort = 7)
    private BigDecimal returnOrderAmount;
    /**
     * 配送件数(酒类)
     */
    @ExcelColumn(name = "酒类件数", sort = 5)
    private BigDecimal deliveryQuantityLiquor;
    /**
     * 配送件数(非酒类)
     */
    @ExcelColumn(name = "非酒类件数", sort = 6)
    private BigDecimal deliveryQuantityUnLiquor;
    /**
     * 退货件数(酒类)
     */
    @ExcelColumn(name = "退货件数(酒类)", sort = 9)
    private BigDecimal returnQuantityLiquor;
    /**
     * 退货件数(非酒类)
     */
    @ExcelColumn(name = "退货件数(非酒类)", sort = 10)
    private BigDecimal returnQuantityUnLiquor;


    public Integer getCity_Id() {
        return city_Id;
    }

    public void setCity_Id(Integer city_Id) {
        this.city_Id = city_Id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Integer getWarehouse_Id() {
        return warehouse_Id;
    }

    public void setWarehouse_Id(Integer warehouse_Id) {
        this.warehouse_Id = warehouse_Id;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public Integer getStatisticsClass() {
        return statisticsClass;
    }

    public void setStatisticsClass(Integer statisticsClass) {
        this.statisticsClass = statisticsClass;
    }

    public BigDecimal getDeliveryQuantity() {
        return deliveryQuantity;
    }

    public void setDeliveryQuantity(BigDecimal deliveryQuantity) {
        this.deliveryQuantity = deliveryQuantity;
    }

    public BigDecimal getDeliveryAmount() {
        return deliveryAmount;
    }

    public void setDeliveryAmount(BigDecimal deliveryAmount) {
        this.deliveryAmount = deliveryAmount;
    }

    public BigDecimal getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }

    public BigDecimal getReturnQuantity() {
        return returnQuantity;
    }

    public void setReturnQuantity(BigDecimal returnQuantity) {
        this.returnQuantity = returnQuantity;
    }

    public BigDecimal getReturnAmount() {
        return returnAmount;
    }

    public void setReturnAmount(BigDecimal returnAmount) {
        this.returnAmount = returnAmount;
    }

    public BigDecimal getReturnOrderAmount() {
        return returnOrderAmount;
    }

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
