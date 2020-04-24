package com.yijiupi.himalaya.op.web;

import com.yijiupi.himalaya.op.web.argresolver.UserInfoArgumentResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * MVC配置. Created by Lifeng on 2016/10/22.
 */
@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
    @Autowired
    private UserInfoArgumentResolver userInfoArgumentResolver;

    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(userInfoArgumentResolver);
        super.addArgumentResolvers(argumentResolvers);
    }

//    @Bean
//    FilterRegistrationBean yjpIdFilter() {
//
//        FilterRegistrationBean yjpIdFilterBean = new FilterRegistrationBean();
//        yjpIdFilterBean.setName("yjpIdFilter");
//        yjpIdFilterBean.setUrlPatterns(Collections.singleton("/*"));
//        yjpIdFilterBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        yjpIdFilterBean.setFilter(new OncePerRequestFilter() {
//
//            private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//            @Override
//            protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws IOException, ServletException {
//                final Cookie cookie = WebUtils.getCookie(httpServletRequest, WebConstants.YJP_COOKIE_ID);
//                String currentId;
//                if (cookie == null) {
//                    final String yjpid = UUID.randomUUID().toString().replaceAll("-", "");
//                    final Cookie yjpidCookie = new Cookie(WebConstants.YJP_COOKIE_ID, yjpid);
//                    yjpidCookie.setHttpOnly(true);
//                    yjpidCookie.setPath("/");
//                    httpServletResponse.addCookie(yjpidCookie);
//                    logger.info("创建会话：" + yjpid);
//                    currentId = yjpid;
//                } else {
//                    currentId = cookie.getValue();
//                }
//                String uri = httpServletRequest.getRequestURI();
//                String requestMethod = httpServletRequest.getMethod();
//                // 没有登录，强制返回登录页
//                if (uri.endsWith("/index.html")) {
//                    if (!redisTemplate.hasKey(CookieHelper.buildUserInfoKey(currentId))) {
//                        httpServletResponse.sendRedirect("/templates/login.html");
//                        return;
//                    }
//                }
//                else if (uri.indexOf("/user/userLogin") > -1 && requestMethod.equalsIgnoreCase("GET")) {
//                    httpServletResponse.sendRedirect("/templates/login.html");
//                    return;
//                }
//                filterChain.doFilter(httpServletRequest, httpServletResponse);
//            }
//        });
//
//        return yjpIdFilterBean;
//
//    }
}
