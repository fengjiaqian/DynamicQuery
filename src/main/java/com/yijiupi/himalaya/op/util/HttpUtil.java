package com.yijiupi.himalaya.op.util;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.conn.ssl.X509HostnameVerifier;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.security.GeneralSecurityException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;


/**
 * <p>Title:HttpUtil</p>
 * <p>Description:http框架请求工具</p>
 */
public class HttpUtil {
    /**
     * LOGGE日志
     */
    private final static Logger LOGGER = LoggerFactory.getLogger(HttpUtil.class);

    // 设置请求和传输超时时间
    private static RequestConfig requestConfig = RequestConfig.custom()
            .setSocketTimeout(20000).setConnectTimeout(20000).build();

    public static String httpGet(String url) {
        return HttpUtil.httpGet(url, new TypeToken<String>() {
        }.getType());
    }

    public static String httpPost(String url, String strParam) {
        return HttpUtil.httpPost(url, strParam, new TypeToken<String>() {
        }.getType());
    }

    /**
     * post请求传输json参数
     */
    public static <T> T httpPost(String url, String jsonParam, Type typeOfT) {
        T returnData = null;
        // post请求返回结果
        String str = sendPost(url, jsonParam, typeOfT);
        LOGGER.info(String.format("Url：%s，Param：%s，Result：%s", url, jsonParam, str));
        returnData = ConfigUtil.gsonDateTimeFormat.fromJson(str, typeOfT);
        return returnData;
    }

    /**
     * post请求传输json参数
     */
    public static <T> T httpPost1(String url, String jsonParam, Type typeOfT) {
        T returnData = null;
        // post请求返回结果
        String str = sendPost(url, jsonParam, typeOfT);
        LOGGER.info(String.format("Url：%s，Param：%s，Result：%s", url, jsonParam, str));
        returnData = ConfigUtil.gson.fromJson(str, typeOfT);
        return returnData;
    }

    /**
     * 发送get请求
     */
    public static <T> T httpGet(String url, Type typeOfT) {
        // get请求返回结果
        T returnData = null;
        String str = "";
        str = sendGet(url, typeOfT);
        LOGGER.info(String.format("Url：%s，Result：%s", url, str));
        returnData = ConfigUtil.gsonDateTimeFormat.fromJson(str, typeOfT);
        return returnData;
    }

    public static <T> T httpGet(String url, Type typeOfT, Gson gson) {
        // get请求返回结果
        T returnData = null;
        String str = "";
        str = sendGet(url, typeOfT);
        LOGGER.info(String.format("Url：%s，Result：%s", url, str));
        returnData = gson.fromJson(str, typeOfT);
        return returnData;
    }

    public static <T> T httpPost(String url, String jsonParam, Type typeOfT, Gson gson) {
        T returnData = null;
        // post请求返回结果
        String str = sendPost(url, jsonParam, typeOfT);
        returnData = gson.fromJson(str, typeOfT);
        return returnData;
    }

    private static String sendGet(String url, Type typeOfT) {
        String str = "";
        CloseableHttpClient client = null;
        // get请求返回结果
        if (url.startsWith("https")) {
            SSLConnectionSocketFactory sslConnSocketFactory = createSSLConnSocketFactory();
            client = HttpClients.custom().setSSLSocketFactory(createSSLConnSocketFactory()).
                    setDefaultRequestConfig(requestConfig).build();
        } else {
            client = HttpClients.createDefault();
        }
        // 发送get请求
        HttpGet request = new HttpGet(url);
        request.setConfig(requestConfig);
        try {
            url = URLDecoder.decode(url, "UTF-8");
            CloseableHttpResponse response = client.execute(request);

            //请求发送成功，并得到响应
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                //读取服务器返回过来的json字符串数据
                HttpEntity entity = response.getEntity();
                str = EntityUtils.toString(entity, "utf-8");
                //把json字符串转换成json对象
            } else {
                LOGGER.error("get请求提交失败:" + url);
            }
        } catch (IOException e) {
            LOGGER.error("get请求提交失败:" + url, e);
        } finally {
            request.releaseConnection();
            try {
                client.close();
            } catch (IOException e) {
            }
        }
        return str;
    }

    private static String sendPost(String url, String jsonParam, Type typeOfT) {
        CloseableHttpClient client = null;
        String str = "";
        if (url.startsWith("https")) {
            SSLConnectionSocketFactory sslConnSocketFactory = createSSLConnSocketFactory();
            client = HttpClients.custom().setSSLSocketFactory(createSSLConnSocketFactory()).
                    setDefaultRequestConfig(requestConfig).build();
        } else {
            client = HttpClients.createDefault();
        }
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        try {
            if (jsonParam != null) {
                // 解决中文乱码问题
                StringEntity entity = new StringEntity(jsonParam,
                        "utf-8");
                entity.setContentEncoding("UTF-8");
                entity.setContentType("application/json");
                httpPost.setEntity(entity);
            }
            url = URLDecoder.decode(url, "UTF-8");
            CloseableHttpResponse result = client.execute(httpPost);
            //请求发送成功，并得到响应
            if (result.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                try {
                    //读取服务器返回过来的json字符串数据
                    str = EntityUtils.toString(result.getEntity(), "utf-8");
                } catch (Exception e) {
                    LOGGER.error("post请求提交失败:" + url, e);
                }
            }
        } catch (IOException e) {
            LOGGER.error("post请求提交失败:" + url, e);
        } finally {
            httpPost.releaseConnection();
            try {
                client.close();
            } catch (IOException e) {
            }
        }
        return str;
    }

    private static SSLConnectionSocketFactory createSSLConnSocketFactory() {
        SSLConnectionSocketFactory sslsf = null;
        try {
            SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {

                public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    return true;
                }
            }).build();
            sslsf = new SSLConnectionSocketFactory(sslContext, new X509HostnameVerifier() {

                @Override
                public boolean verify(String arg0, SSLSession arg1) {
                    return true;
                }

                @Override
                public void verify(String host, SSLSocket ssl) throws IOException {
                }

                @Override
                public void verify(String host, X509Certificate cert) throws SSLException {
                }

                @Override
                public void verify(String host, String[] cns, String[] subjectAlts) throws SSLException {
                }
            });
        } catch (GeneralSecurityException e) {
        }
        return sslsf;
    }
}
