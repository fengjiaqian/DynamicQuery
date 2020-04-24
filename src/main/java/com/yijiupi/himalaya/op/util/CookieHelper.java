package com.yijiupi.himalaya.op.util;

import com.yijiupi.himalaya.base.utils.AssertUtils;
import com.yijiupi.himalaya.op.WebConstants;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

public class CookieHelper {
    private HttpServletResponse response;
    private HttpServletRequest request;
    private List<Cookie> cookies;

    public CookieHelper(HttpServletRequest request, HttpServletResponse response) {
        this.setRequest(request);
        this.setResponse(response);
    }

    public CookieHelper(HttpServletRequest request) {
        this.setRequest(request);
    }

    private void setRequest(HttpServletRequest request) {
        AssertUtils.notNull(request, "request should not be null");

        this.request = request;
    }

    private void setResponse(HttpServletResponse response) {
        AssertUtils.notNull(response, "response should not be null");

        this.response = response;
    }

    private List<Cookie> getAll() {
        if (cookies == null) {
            Cookie[] array = request.getCookies();
            if (array == null)
                return null;
            cookies = new ArrayList<>(array.length);
            for (int i = 0, len = array.length; i < len; i++) {
                cookies.add((Cookie) array[i].clone());
            }
        }
        return cookies;
    }

    public Cookie getCookie(String name) {
        List<Cookie> all = getAll();
        if (all == null)
            return null;
        Iterator<Cookie> iter = all.iterator();
        while (iter.hasNext()) {
            Cookie ck = iter.next();
            if (ck.getName().equals(name)) {
                return ck;
            }
        }
        return null;
    }

    public void addCookie(Cookie c) {
        if (c != null) {
            response.addCookie(c);
        }
    }

    public void addCookie(String name, String value) {
        addCookie(create(name, value));
    }

    public void add(String name, String value, Integer maxAge) {
        addCookie(create(name, value, maxAge));
    }

    private Cookie create(String name, String value) {
        return new Cookie(name, value);
    }

    private Cookie create(String name, String value, int maxAge) {
        Cookie sc = create(name, value);
        sc.setMaxAge(maxAge);
        return sc;
    }

    public void deleteCookie(String name) {
        Cookie c = getCookie(name);
        if (c != null) {
            c.setMaxAge(0);
            addCookie(c);
        }
    }

    /**
     * 获取易酒批专有 含通信标识 的 cookie
     *
     * @param create 不存在，是否重新创建
     * @return Cookie
     */
    public Cookie getYjpCookie(boolean create) {
        Cookie cookie = getCookie(WebConstants.YJP_COOKIE_ID);
        if (null == cookie && create) {
            String yjpID;
            Cookie defaultCookie = getCookie("JSESSIONID");
            if (null == defaultCookie) {
                yjpID = UUID.randomUUID().toString().replaceAll("-", "");
            } else {
                // 延用容器的通信会话标识
                yjpID = defaultCookie.getValue();
            }

            cookie = new Cookie(WebConstants.YJP_COOKIE_ID, yjpID);
            cookie.setPath("/");
            cookie.setHttpOnly(true);

            addCookie(cookie);
        }

        return cookie;
    }

    @Override
    public String toString() {
        List<Cookie> all = getAll();
        if (all == null)
            return super.toString();
        StringBuilder out = new StringBuilder();
        out.append('[');
        for (int i = 0; i < all.size(); i++) {
            if (i != 0)
                out.append(", ");
            Cookie c = all.get(i);
            out.append(c.getName());
            out.append('=');
            out.append(c.getValue());
        }
        out.append(']');
        return out.toString();
    }
    public static String buildUserInfoKey(String sessionID){
        return "st:ui:" + sessionID;
    }
}
