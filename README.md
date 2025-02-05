# AiChatHelper-DeepSeek
> [!WARNING]
> 由于DeepSeek近期遭受大规模网络攻击导致官方API无法访问，所以本项目暂时使用百度智能云API。

AiChatHelper-DeepSeek是一个微信助手 ChatGPT 反向代理项目，它可以使你的微信成为一个DeepSeek。

## 前提条件
1. 一台拥有NodeJS环境的Centos系统服务器

## 部署教程
1. 安装Node与npm
```bash
sudo yum update
sudo yum install epel-release
sudo yum install nodejs
y
sudo yum install npm
y
```

2. Clone并运行
```bash
sudo yum install -y git
git clone https://github.com/xiemu-c/AiChatHelper-DeepSeek.git
cd AiChatHelper-DeepSeek
npm install
yum install screen
screen -S aichathelper-deppseek
node index.js
```
按下 Ctrl + A，然后按下 D 键来分离 screen 会话。这将使程序在后台运行。
当您想再次查看 screen 会话时，可以运行以下命令：
```bash
screen -r aichathelper-deppseek
```

3. 停止运行

<kbd>Ctrl</kbd>+<kbd>C</kbd>

## 使用方法
以下操作都是在“微信助手”ChatGPT中操作：
1. 将你的代理地址填写到“代理地址”栏。（http&#58;&#47;&#47;你的服务器IP:3000）
2. “APIKey”中填写对应的API Key，在“模型”中按下表选择或填写。

| AI      | APIKey | 模型     |
|    :----:   |    :----:   |    :----:   |
| DeepSeek-R1 | 百度智能云 API Key | 手动输入，填写：deepseek-r1 |
| DeepSeek-V3 | 百度智能云 API Key | 手动输入，填写：deepseek-v3 |

## 其他事项
- 有关微信助手ChatGPT相关功能使用，请查看微信助手中的详细使用说明，或者在交流群里交流。

## 特别鸣谢
- 部分代码参考了懒猫提供的Gemini.zip，[懒猫插件交流](https://t.me/maogroup)
- 部分代码参考了GeekinGH的[AiChatHelperNodejs](https://github.com/GeekinGH/AiChatHelperNodejs)
