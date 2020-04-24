package com.yijiupi.himalaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * 供应链后台,启动类
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.yijiupi.himalaya")
public class SupplychainOpWebApp extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(SupplychainOpWebApp.class, args);
    }
}
