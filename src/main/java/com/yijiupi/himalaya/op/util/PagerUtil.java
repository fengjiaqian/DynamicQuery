package com.yijiupi.himalaya.op.util;

import com.yijiupi.himalaya.base.search.Pager;

/**
 * create by liushuang Date:2017/8/9 Time:21:32
 * 创建pager对象.
 */
public class PagerUtil {

    public static Pager initPager(Integer pageIndex, Integer pageSize, Integer totalCount) {
        return new Pager(pageIndex <= 0 ? 1 : pageIndex, pageSize <= 0 ? 20 : pageSize, 
        		totalCount == null ? 0 : totalCount);
    }
}
