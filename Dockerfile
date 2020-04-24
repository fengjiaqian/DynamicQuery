FROM 197.255.20.20:50000/yjp/tomcat8

# 作者信息
MAINTAINER peter.fung@hotmail.com

RUN mkdir /root/app && ln -s /opt/tomcat8/webapps/ROOT /root/app

# 将war包复制到/root/app/ROOT下
ADD *.war /root/app/ROOT

WORKDIR /root/app/ROOT

# 解压war到当前目录，并删除war包
RUN jar xf *.war && rm -rf *.war

ENV APP_DIR ROOT

# 挂载卷
VOLUME ["/root/app/ROOT/WEB-INF/classes", "/root/logs"]

# 暴露端口号(不变)
EXPOSE 8080

ENTRYPOINT ["sh", "/root/run.sh"]
