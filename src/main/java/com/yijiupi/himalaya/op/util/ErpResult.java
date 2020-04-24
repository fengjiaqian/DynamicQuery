package com.yijiupi.himalaya.op.util;

import java.io.Serializable;
import java.util.Date;

/**
 * @author: lidengfeng
 * @date 2018/12/6 10:38
 */
public class ErpResult implements Serializable {


        public static String RESULT_SUCCESS = "success";

        public static String RESULT_FAILED = "fail";

        public static String RESULT_ERROR = "error";

        public String serviceTime;

    /**
     * 调用是否成功 1为成功
     */
    public Boolean success;

    /**
     * 错误信息
     */
    public String message;


    public String result;

    public ErpResult() {
    }

    public ErpResult(String serviceTime, Boolean success, String message, String result) {
        this.serviceTime = new Date().toString();
        this.success = success;
        this.message = message;
        this.result = result;
    }

    public static String getResultSuccess() {
        return RESULT_SUCCESS;
    }

    public static void setResultSuccess(String resultSuccess) {
        RESULT_SUCCESS = resultSuccess;
    }

    public static String getResultFailed() {
        return RESULT_FAILED;
    }

    public static void setResultFailed(String resultFailed) {
        RESULT_FAILED = resultFailed;
    }

    public static String getResultError() {
        return RESULT_ERROR;
    }

    public static void setResultError(String resultError) {
        RESULT_ERROR = resultError;
    }

    public String getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(String serviceTime) {
        this.serviceTime = serviceTime;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
