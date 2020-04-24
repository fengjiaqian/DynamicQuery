/**
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.convertor.common;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 对象和列表对象 转换类基类
 *
 * @param <S> 待转对象类型
 * @param <D> 预转对象类型
 * @author bjw
 * @since 2016年11月23日 上午10:16:55
 */
public abstract class Convertor<S, D> {

    /**
     * 额外转换程序
     */
    private AbstractHandler<S, D> handler = new AbstractHandler<S, D>();

    public void setHandler(AbstractHandler<S, D> handler) {
        this.handler = handler;
    }

    /**
     * 单个对象转换
     *
     * @param src 待转对象
     * @return 转换后的对象
     */
    public abstract D convert(S src);

    /**
     * 集合转换
     *
     * @param mList 待转对象集合
     * @return 转换后的对象集合
     */
    public List<D> convert(List<S> mList) {
        List<D> nList = null;
        if (mList != null) {
            Stream<S> stream = mList.stream();

            nList = stream.filter((src) -> {

                return handler.filter(src);

            }).map((src) -> {

                D dest = convert(src);

                handler.convert(src, dest);

                return dest;
            }).collect(Collectors.toList());
        }
        return nList;
    }

}
