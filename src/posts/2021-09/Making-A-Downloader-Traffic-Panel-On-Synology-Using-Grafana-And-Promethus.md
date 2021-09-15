---
title:             "利用Grafana和Promethus在群晖搭建BT下载器流量统计面板"
date:              2021-09-15
tags:              Grafana Promethus Synology qBittorrent Deluge Transmision
---

本文将教你如何用Grafana和Promethus搭配订制的exporter在群晖搭建一个用于统计qBittorrent/Deluge/Transmission流量的面板，最终效果如下：

![](./img/CleanShot%202021-09-15%20at%2011.39.21@2x.jpg)

## 准备工作

1. 请准备一台群晖，安装/开启docker
2. 准备个文本编辑器用于编辑配置文件
3. 准备好你所有下载的用户名/密码并确保可联通

## 准备配置文件

新建一个文本并取名为`config.yml`，并按下图输入你下载器的登陆信息，现在支持`qBittorrent`/`Deluge`/`Transmission`

![](./img/config.jpg)

然后将此文件上传到群晖，建议上传到docker这个共享文件夹内

![](./img/CleanShot%202021-09-15%20at%2010.57.58@2x.jpg)

## Docker安装并启动downloader-exporter

在群晖Docker的`映像`页面，选择新增一个映像，URL输入`https://hub.docker.com/r/leishi1313/downloader-exporter`

![](./img/CleanShot%202021-09-15%20at%2010.51.43@2x.jpg)

完成下载后你的Docker页面应该像这样

![](./img/CleanShot%202021-09-15%20at%2010.53.14@2x.jpg)

选中映像并点击启动，选择`高级设置` -> `存储空间` -> `添加文件`

![](./img/CleanShot%202021-09-15%20at%2010.54.32@2x.jpg)

讲刚才添加的配置文件挂载到`/config/config.yml`上

![](./img/CleanShot%202021-09-15%20at%2010.59.38@2x.jpg)

在`端口设置`页面，本地端口填上`9000`（或者你自己喜欢的端口）

![](./img/CleanShot%202021-09-15%20at%2011.01.55@2x.jpg)

准备就绪，一路下一步，然后到`群晖IP:9000`确认下是否有如下页面

![](./img/CleanShot%202021-09-15%20at%2011.04.52@2x.jpg)

## Docker安装Prometheus

### 准备配置文件

新建一个文本并取名为`prometheus.yml`，并按下图输入你上一步的IP+端口

![](./img/prometheus.jpg)

然后将此文件上传到群晖，名为docker的这个共享文件夹内（**重要**）

![](./img/CleanShot%202021-09-15%20at%2011.19.33@2x.jpg)

### Docker

同样的，在群晖Docker的`映像`页面，选择新增一个映像，URL输入`https://hub.docker.com/r/prom/prometheus`，现在你的映像这一栏应该至少有2个映像

![](./img/CleanShot%202021-09-15%20at%2011.09.04@2x.jpg)

同样，在高级设置把刚才的配置文件挂载到`/etc/prometheus/prometheus.yml`这个地址

![](./img/CleanShot%202021-09-15%20at%2011.20.40@2x.jpg)

别忘了在端口设置同样把`9090`映射出来，然后浏览器去到`群晖IP:9090`，看到如下页面并且状态是`UP`就算成功

![](./img/CleanShot%202021-09-15%20at%2011.21.37@2x.jpg)

## Docker安装Grafana

如上2步，我们再添加一个映像，这次的URL输入`https://hub.docker.com/r/grafana/grafana`，现在你应该有至少3个映像，放心，这是最后一个了

![](./img/CleanShot%202021-09-15%20at%2011.22.51@2x.jpg)

然后在高级设置，把`3000`映射到本地即可

![](./img/CleanShot%202021-09-15%20at%2011.23.42@2x.jpg)

启动映像，浏览器去到`群晖IP:3000`看看面板有没有正确启动，用`admin`/`admin`作为用户名密码登录

![](./img/CleanShot%202021-09-15%20at%2011.24.22@2x.jpg)

## 配置面板

### 配置数据源

在面板的设置选项，点击`Data sources`

![](./img/CleanShot%202021-09-15%20at%2011.27.28@2x.jpg)

添加我们刚才启动的`Prometheus`作为数据源

![](./img/CleanShot%202021-09-15%20at%2011.28.06@2x.jpg)

填写`群晖IP:9090`作为数据源地址

![](./img/CleanShot%202021-09-15%20at%2011.30.00@2x.jpg)

在最后测试并保存此数据源

![](./img/CleanShot%202021-09-15%20at%2011.30.29@2x.jpg)

### 新建面板

终于到了最激动人心的步骤了，我们回到主页点击`+`号，选择`Import`

![](./img/CleanShot%202021-09-15%20at%2011.25.13@2x.jpg)

在`Import via grafana.com`选项，输入`15006`

![](./img/CleanShot%202021-09-15%20at%2011.26.34@2x.jpg)

然后配置下面板的名称，选择刚才添加的数据源

![](./img/CleanShot%202021-09-15%20at%2011.33.28@2x.jpg)

然后，就没有然后了，如果所有步骤确认无误，你应该可以看到所有的数据了

![](./img/CleanShot%202021-09-15%20at%2011.34.45@2x.jpg)

## 常见问题

### 我的下载器太多了，获取一次数据要10秒钟以上，怎么办？

在downloader-exporter的高级设置页面里，在`环境`这个页面，把`USE_MULTI_PORTS`设为`true`

![](./img/CleanShot%202021-09-15%20at%2014.07.47@2x.jpg)

然后根据你下载的数量，开放同样多的端口，从`9000`开始

![](./img/CleanShot%202021-09-15%20at%2014.07.23@2x.jpg)

然后修改`prometheus.yml`，把所有的IP:端口都写进去

![](./img/prometheus2.png)

然后重新创建downloader-exporter，重新启动Prometheus，数据的获取应该不会再慢了
