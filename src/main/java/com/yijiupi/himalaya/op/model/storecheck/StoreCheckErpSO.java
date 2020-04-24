/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */

package com.yijiupi.himalaya.op.model.storecheck;


import java.io.Serializable;

public class StoreCheckErpSO implements Serializable{

    /**
     * 城市id
     */
    private Integer cityId;

    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 结束时间
     */
    private String endTime;

    /**
     * 状态
     */
    private Integer state;

    /**
     * 仓库id
     */
    private Integer warehouseId;

    /**
     * 分页大小
     */
    private Integer pageSize;

    /**
     * 当前页
     */
    private Integer pageIndex;

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }
}
