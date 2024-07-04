# Allan-cli

开源脚手架 正常使用

```bash
npm install vue-cli -g
vue init projectName
vue list
vue --help
```



## 初始化

~~~bash
mkdir allan-cli
cd allan-cli
npm init -y
~~~

新建 `index.js` 并写入以下内容

~~~js
#!/usr/bin/env node

// 使用Node开发命令工具所执行的 JavaScript 脚本必须在顶部加入以上声明
console.log('allan-cli 脚手架工具')
~~~

配置 `package.json` 中的 `bash` 字段

~~~json
{
  "name": "allan-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bin": {
    "allan": "index.js"
  }
}
~~~

执行在项目目录下执行 `npm link` 链接命令到全局

新开终端，执行 `bin` 中配置的命令

例如这里：

```bash
allan
```

输出如下

~~~bash
allan-cli 脚手架工具
~~~



## 命令行工具参数设计

~~~bash
allan --help 查看使用帮助
allan -V --version 查看工具的版本号
allan list 列出所有可使用的模版
allan init <template-name> <project-name> 基础指定的模版进行项目初始化
~~~



## 处理命令行

安装

~~~bash
npm install commander
~~~

~~~js
#!/usr/bin/env node

const program = require('commander')

program
  .version('0.1.0') // -v 或者 --version 的时候输出版本号

program
  .command('init  <templateName> <projectName>')
  .description('初始化项目模版')
  .action(function(templateName,projectName){
    // 根据模版名下载对应的模版到本地并起名未对应的项目名称
      console.log(templateName,projectName)
  })

program
  .command('list')
  .description('查看所有可用模版')
  .action(() => {
    console.log(
      `
      a a模版
      b b模版
      c c模版`
    )
  })

program.parse(process.argv)
~~~

## 下载模版

安装

~~~bash
npm install download-git-repo
~~~

使用

~~~bash
const download = require('download-git-repo')

download(downloadUrl,projectName ,{ clone: true }, (err) => {
      if(err){
        console.log('下载失败')
      }else{
        console.log('下载成功')
      }
    })
~~~

## 问答交互

安装

~~~bash
npm i inquirer
~~~

使用





## 视觉美化

安装

```bash
npm i ora
```

```js
const ora = require('ora')
const spinner = ora('正在下载模版...')

// 开始下载
spinner.start()

// 下载失败调用
spinner.fail()

//下载成功调用
spinner.succeed()
```

Chalk 美化颜色

Log-symbols 美化logo图标



## 把工具发布到 npm

~~~bash
npm install allan-cli -g
~~~

1. 打开 `npmjs` 官网
2. 注册一个 npm 账号
   1. 账号：mapengfei
   2. 密码：fly0911031200@
3. 在 npm 检索是否有包名重复
4. 将 `package.json` 中的 `name` 修改为发布到 npm 上面的包名（和本地项目名无关）
5. 打开控制台执行 `npm login`（在控制台登陆npm）
   1. 执行前，重置 npm 源 `npm config set registry https://registry.npmjs.org/`
6. 登陆成功之后，在项目下执行 `npm publish` 发布
