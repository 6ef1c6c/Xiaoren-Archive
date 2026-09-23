---
title: Linux/windows 下让 RS-Key 正确识别 CCID
date: 2026-09-23 17:54:22
tags:
---

你们好呀 我是小忍 RS-Key项目是一个为树莓派pico 2所制作的硬件安全密钥固件 但是呢其中有一部分功能依赖于CCID去通信 在绝大多数的linux系统中可能会无法识别到这个ccid设备 下面是解决方法

首先需要安装ccid的软件包 以arch linux系统为例
我们需要在终端中执行 sudo pacman -S ccid pcsclite pcsc-tools 来安装这三个必须的软件包
安装完成后我们需要修改白名单,因为ccid默认只添加了Yubico、Gemalto、Feitian等的VID和PID 而RS-Key的默认构建中的PID和VID是1209:0001 不在名单之中 所以会导致识别不到设备
我们需要修改/usr/lib/pcsc/drivers/ifd-ccid.bundle/Contents/Info.plist这个文件
sudo nano /usr/lib/pcsc/drivers/ifd-ccid.bundle/Contents/Info.plist

我们按Ctrl F去搜索<key>ifdVendorID</key> 添加<string>0x1209</string> (0x1209为设备的VID 可以去picoforge软件中查看 PID同样)
然后搜索<key>ifdProductID</key> 添加<string>0x0001</string>
搜索<key>ifdFriendlyName</key> 添加<string>RS-Key Security Key</string>

示例
        <key>ifdVendorID</key>
        <array>
                <string>0x1209</string>

剩下两个同样如此 然后我们需要开启服务并设置为开机自启动
# 启动服务
sudo systemctl restart pcscd
# 设置开机自启动服务
sudo systemctl enable pcscd.socket
这样就可以识别到设备了

接下来是windows的解决方法
windows的解决方法非常简单 只需要启动一个服务就可以了
按win+R 输入services.msc回车
在里面找到Smart Card 双击将启动类型改为自动 然后点击启动即可
