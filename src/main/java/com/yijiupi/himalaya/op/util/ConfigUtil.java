/**
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.yijiupi.himalaya.op.util;

import com.google.gson.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.Date;


@Component
public class ConfigUtil {

    public static final Gson gsonDateTimeFormat = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm:ss").create();

    public static final Gson gson = getGson();


    public static String tradingAPIUrl;

    @Value("${inventory.tradingAPIUrl}")
    public void settradingAPIUrl(String url){
        tradingAPIUrl = url;
    }


    public static String erpAPIUrl;

    @Value("${inventory.erpAPIUrl}")
    public void seterpAPIUrl(String url){
        erpAPIUrl = url;
    }

    //  解决日期转换问题."{\"createTime\": 1471919170000}";
    private static Gson getGson() {
        GsonBuilder builder = new GsonBuilder();

        // Register an adapter to manage the date types as long values
        builder.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
            public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                return new Date(json.getAsJsonPrimitive().getAsLong());
            }
        });

        return builder.create();
    }
}
