package com.yijiupi.himalaya.op.model.supplymessage.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * 供应链失败消息返回
 *
 * @author liushuang 2017/9/12
 */
public class RequestErrorTrackingPageVO implements Serializable {
    private String id;
    /**
     * 城市ID
     */
    private Integer city_Id;
    /**
     * 产品线
     */
    private Byte productLine;
    /**
     * 产品线名称
     */
    private String productLineName;
    /**
     * 请求类型
     */
    private String requestType;
    /**
     * 请求类型名称
     */
    private String requestTypeName;
    /**
     * 请求内容
     */
    private String requestContent;
    /**
     * 响应内容
     */
    private String responseContent;
    /**
     * 备注
     */
    private String mark;
    /**
     * 重试次数
     */
    private Integer requestCount;
    /**
     * 状态
     */
    private Integer state;
    /**
     * 创建日期
     */
    private Date createTime;
    /**
     * 创建日期id
     */
    private Integer createUserId;
    /**
     * 最后更新日期
     */
    private Date lastUpdateTime;
    /**
     * 最后更新日期id
     */
    private Integer lastUpdateUserId;

    /**
     * 获取
     *
     * @return id
     */
    public String getId() {
        return this.id;
    }

    /**
     * 设置
     *
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取 城市ID
     *
     * @return city_Id 城市ID
     */
    public Integer getCity_Id() {
        return this.city_Id;
    }

    /**
     * 设置 城市ID
     *
     * @param city_Id 城市ID
     */
    public void setCity_Id(Integer city_Id) {
        this.city_Id = city_Id;
    }

    /**
     * 获取 产品线
     *
     * @return productLine 产品线
     */
    public Byte getProductLine() {
        return this.productLine;
    }

    /**
     * 设置 产品线
     *
     * @param productLine 产品线
     */
    public void setProductLine(Byte productLine) {
        this.productLine = productLine;
    }

    /**
     * 获取 请求类型
     *
     * @return requestType 请求类型
     */
    public String getRequestType() {
        return this.requestType;
    }

    /**
     * 设置 请求类型
     *
     * @param requestType 请求类型
     */
    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    /**
     * 获取 请求类型名称
     *
     * @return requestTypeName 请求类型名称
     */
    public String getRequestTypeName() {
        return this.requestTypeName;
    }

    /**
     * 设置 请求类型名称
     *
     * @param requestTypeName 请求类型名称
     */
    public void setRequestTypeName(String requestTypeName) {
        this.requestTypeName = requestTypeName;
    }

    /**
     * 获取 请求内容
     *
     * @return requestContent 请求内容
     */
    public String getRequestContent() {
        return this.requestContent;
    }

    /**
     * 设置 请求内容
     *
     * @param requestContent 请求内容
     */
    public void setRequestContent(String requestContent) {
        this.requestContent = requestContent;
    }

    /**
     * 获取 响应内容
     *
     * @return responseContent 响应内容
     */
    public String getResponseContent() {
        return this.responseContent;
    }

    /**
     * 设置 响应内容
     *
     * @param responseContent 响应内容
     */
    public void setResponseContent(String responseContent) {
        this.responseContent = responseContent;
    }

    /**
     * 获取 备注
     *
     * @return mark 备注
     */
    public String getMark() {
        return this.mark;
    }

    /**
     * 设置 备注
     *
     * @param mark 备注
     */
    public void setMark(String mark) {
        this.mark = mark;
    }

    /**
     * 获取 重试次数
     *
     * @return requestCount 重试次数
     */
    public Integer getRequestCount() {
        return this.requestCount;
    }

    /**
     * 设置 重试次数
     *
     * @param requestCount 重试次数
     */
    public void setRequestCount(Integer requestCount) {
        this.requestCount = requestCount;
    }

    /**
     * 获取 状态
     *
     * @return state 状态
     */
    public Integer getState() {
        return this.state;
    }

    /**
     * 设置 状态
     *
     * @param state 状态
     */
    public void setState(Integer state) {
        this.state = state;
    }

    /**
     * 获取 创建日期
     *
     * @return createTime 创建日期
     */
    public Date getCreateTime() {
        return this.createTime;
    }

    /**
     * 设置 创建日期
     *
     * @param createTime 创建日期
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取 创建日期id
     *
     * @return createUserId 创建日期id
     */
    public Integer getCreateUserId() {
        return this.createUserId;
    }

    /**
     * 设置 创建日期id
     *
     * @param createUserId 创建日期id
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取 最后更新日期
     *
     * @return lastUpdateTime 最后更新日期
     */
    public Date getLastUpdateTime() {
        return this.lastUpdateTime;
    }

    /**
     * 设置 最后更新日期
     *
     * @param lastUpdateTime 最后更新日期
     */
    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    /**
     * 获取 最后更新日期id
     *
     * @return lastUpdateUserId 最后更新日期id
     */
    public Integer getLastUpdateUserId() {
        return this.lastUpdateUserId;
    }

    /**
     * 设置 最后更新日期id
     *
     * @param lastUpdateUserId 最后更新日期id
     */
    public void setLastUpdateUserId(Integer lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
    }

    /**
     * 获取 产品线名称
     *
     * @return productLineName 产品线名称
     */
    public String getProductLineName() {
        return this.productLineName;
    }

    /**
     * 设置 产品线名称
     *
     * @param productLineName 产品线名称
     */
    public void setProductLineName(String productLineName) {
        this.productLineName = productLineName;
    }

    @Override
    public String toString() {
        return "RequestErrorTrackingPageVO{" +
                "id=" + id +
                ", city_Id=" + city_Id +
                ", productLine=" + productLine +
                ", productLineName='" + productLineName + '\'' +
                ", requestType=" + requestType +
                ", requestTypeName='" + requestTypeName + '\'' +
                ", requestContent='" + requestContent + '\'' +
                ", responseContent='" + responseContent + '\'' +
                ", mark='" + mark + '\'' +
                ", requestCount=" + requestCount +
                ", state=" + state +
                ", createTime=" + createTime +
                ", createUserId=" + createUserId +
                ", lastUpdateTime=" + lastUpdateTime +
                ", lastUpdateUserId=" + lastUpdateUserId +
                '}';
    }
}
