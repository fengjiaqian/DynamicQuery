package com.yijiupi.himalaya.op.model.earningreport.vo;

import com.yijiupi.himalaya.op.util.ExcelColumn;

import java.math.BigDecimal;

/**
 * 配送系数报表
 *
 * @author caohao 2018/1/17
 */
public class ProductSkuInfoReturnVO {
    /**
     * cityId
     */
    private Integer cityId;

    /**
     * skuID
     */
    @ExcelColumn(name = "skuid", sort = 0)
    private Long skuId;
    /**
     * 城市名称
     */
    @ExcelColumn(name = "城市", sort = 1)
    private String cityName;
    /**
     * 产品名称
     */
    @ExcelColumn(name = "产品名称", sort = 2)
    private String productName;
    /**
     * 销售模式
     */
    @ExcelColumn(name = "销售模式", sort = 3)
    private String saleModelName;
    /**
     * 商店名称
     */
    @ExcelColumn(name = "商店名称", sort = 4)
    private String ownerName;

    /**
     * 配送系数-件数
     */
    @ExcelColumn(name = "配送系数(计算件数)", sort = 5)
    private BigDecimal distributionPercent;
    /**
     * 配送系数-工资
     */
    @ExcelColumn(name = "配送系数(计算工资)", sort = 6)
    private BigDecimal distributionPercentForAmount;

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSaleModelName() {
        return saleModelName;
    }

    public void setSaleModelName(String saleModelName) {
        this.saleModelName = saleModelName;
    }

    public BigDecimal getDistributionPercent() {
        return distributionPercent;
    }

    public void setDistributionPercent(BigDecimal distributionPercent) {
        this.distributionPercent = distributionPercent;
    }

    public BigDecimal getDistributionPercentForAmount() {
        return distributionPercentForAmount;
    }

    public void setDistributionPercentForAmount(BigDecimal distributionPercentForAmount) {
        this.distributionPercentForAmount = distributionPercentForAmount;
    }
}
