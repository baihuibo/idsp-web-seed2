# idsp-web-seed2 介绍
这是一个开发项目种子,里面已经配置好了开发所需的目录结构、
打包工具以及测试工具等一些简单的样例代码

# 安装
你必须拥有一个nodejs环境

然后在全局安装基础依赖部件 `webpack`:
```bash
npm install webpack -g
```

然后下载此项目:
```bash
cd your/project/webapp
git clone https://github.com/baihuibo/idsp-web-seed2.git .
```

它会自动创建好目录结构

# 开始使用

安装项目开发依赖模块后

启用 `webpack` 编译即可立刻开始开发工作

```bash
npm install
webpack --watch
```

`--watch` 命令用来表示是否启用监听模式来实时编译打包

# 测试

此项目已加入单元测试支持
```bash
npm test
```
