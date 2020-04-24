package com.yijiupi.himalaya.op.model.order.dto;

import java.io.Serializable;

/**
 * @date 2018/12/25 20:20
 */
public class SynContentConfigQuery implements Serializable {

    /**
     * 仓库id
     */
    private String storehouseId;

    /**
     * 同步申请单
     */
    private Boolean synApply;


    /**
     * 同步入库单
     */
    private Boolean synInStock;



    /**
     * 获取 仓库id
     * @return
     */
    public String getStorehouseId() {
        return storehouseId;
    }

    /**
     * 设置 仓库id
     * @param storehouseId
     */
    public void setStorehouseId(String storehouseId) {
        this.storehouseId = storehouseId;
    }

    /**
     * 获取 同步申请单
     * @return
     */
    public Boolean getSynApply() {
        return synApply;
    }

    /**
     * 设置 同步申请单
     * @param synApply
     */
    public void setSynApply(Boolean synApply) {
        this.synApply = synApply;
    }

    /**
     * 获取 同步入库单
     * @return
     */
    public Boolean getSynInStock() {
        return synInStock;
    }

    /**
     * 设置 同步入库单
     * @param synInStock
     */
    public void setSynInStock(Boolean synInStock) {
        this.synInStock = synInStock;
    }
}
