package com.yijiupi.himalaya.op.util;

import java.io.Serializable;

/**
 * @author: lidengfeng
 * @date 2018/12/6 10:40
 */
public class ErpRoResult<T>  extends ErpResult implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 2214132506418003873L;

	public ErpRoResult(String serviceTime, Boolean success, String message, String result) {
        super(serviceTime, success, message, result);
    }
	public ErpRoResult() {

	}

    public T data ;

    /**
     * 总数
     */
    public Integer totalCount;

    public ErpRoResult(String serviceTime, Boolean success, String message, String result, T data, Integer totalCount) {
        super(serviceTime, success, message, result);
        this.data = data;
        this.totalCount = totalCount;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

}
