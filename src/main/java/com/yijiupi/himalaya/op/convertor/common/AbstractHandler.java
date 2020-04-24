/**
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.convertor.common;

/**
 * 修饰器抽象类
 *
 * @author bjw
 * @since 2016年11月30日 上午10:29:24
 */
public class AbstractHandler<S, D> {

    public void convert(S src, D dest) {
    }

    public boolean filter(S item) {
        return null != item;
    }

}
