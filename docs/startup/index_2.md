
# 约房宝- 极速科技
- 预约租房，无中介费.
## 参考竞品
- 有宅租房
- 海居租房
- 优区生活
- boss直聘---以这个为租房模板

## AI使用
- UI设计：妙多https://www.motiff.com/

## 部署方案
- 本地打包镜像
- 推送到阿里云镜像源
- 将yaml配置文件的yaml配置文件增加image地址为阿里云镜像地址
- 将配置文件添加到1panel中进行运行
- 在1panel上手动安装mysql和redis
- 管理后台由于是给内部使用的，所以建议部署在本地连接线上mysql和redis，这样不消耗服务器资源,需要关注本地变化不影响线上数据变化.
- 使用 Certbot解决https证书的问题。
### 打包本地镜像：
docker build -t docker-compose-web:latest .
docker tag docker-compose-web:latest gongzongxin/docker-deploy:latest

# 确认一下
docker images | grep gongzongxin/docker-deploy

# 推送
docker push gongzongxin/docker-deploy


# 使用阿里云ACK镜像仓库
网址：https://cr.console.aliyun.com/cn-hangzhou/instance/repositories
docker login --username=2550950527@qq.com crpi-bca0ftwzmuelyep2.cn-hangzhou.personal.cr.aliyuncs.com

docker tag 387995ea0f4f crpi-bca0ftwzmuelyep2.cn-hangzhou.personal.cr.aliyuncs.com/stefansky/fast-web:1.0.0
docker push crpi-bca0ftwzmuelyep2.cn-hangzhou.personal.cr.aliyuncs.com/stefansky/fast-web:1.0.0



docker tag 13a4b2e03d1f crpi-bca0ftwzmuelyep2.cn-hangzhou.personal.cr.aliyuncs.com/stefansky/fast-service:1.0.0
docker push crpi-bca0ftwzmuelyep2.cn-hangzhou.personal.cr.aliyuncs.com/stefansky/fast-service:1.0.0




# 项目架构

- 1.管理后台 
- 2.商家端和用户端小程序

```

[用户端小程序]       [商家端小程序]
       |                     |
       |                     |
       +--------+------------+
                |
          [Kong API 网关]  或者 APISIX 网关+OpenResty
                |
       +--------+--------+
       |                 |
 [用户服务实例]   [商家服务实例]
       |                 |
       +--------+--------+
                |
        [MySQL 数据库]
        [Redis 缓存服务]
                |
            [Nginx 网关]
                |
        +--------+------------+
        |                     |
        |                     |
    [管理后台前端]       [管理后台服务端]
```

# 公司管理
公司管理分为目标、管人和管事，管人和管事需要分开。(类似于政委和团长)
管人：需要关注个人成长，个人诉求，个人能力
管事: 需要关注：时间周期、参与人员、工作内容、工作目标，完成情况，未完成情况，项目责任人
