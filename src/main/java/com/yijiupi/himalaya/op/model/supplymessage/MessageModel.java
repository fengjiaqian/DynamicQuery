package com.yijiupi.himalaya.op.model.supplymessage;

/**
 * 失败消息处理封装模型
 *
 * @author liushuang 2017/9/12
 */
public class MessageModel {
    private String id;
    /**
     * 用户id
     */
    private Integer userId;

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
     * 获取 用户id
     *
     * @return userId 用户id
     */
    public Integer getUserId() {
        return this.userId;
    }

    /**
     * 设置 用户id
     *
     * @param userId 用户id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "MessageModel{" +
                "id=" + id +
                ", userId=" + userId +
                '}';
    }
}
