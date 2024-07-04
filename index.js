#!/usr/bin/env node

// 使用Node开发命令工具所执行的 JavaScript 脚本必须在顶部加入以上声明
// console.log('allan-cli 脚手架工具')

const program = require('commander')
const download = require('download-git-repo')
const handlebar = require('handlebars')
const inquirer = require('inquirer')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const templates = {
  'vite-vue3-xiaoe': {
    url: 'https://github.com/mapengfei47/tpl-vite-vue3-xiaoe',
    downloadUrl: 'https://github.com:mapengfei47/tpl-vite-vue3-xiaoe#main',
    description: 'Vite + Vue3，集成小鹅通模版服务 + senseUI的业务模版'
  },
  'vue-cli-vue2': {
    url: 'https://github.com/mapengfei47/tml-vue-cli-vue2',
    downloadUrl: 'https://github.com:mapengfei47/tml-vue-cli-vue2#main',
    description: 'Vue-cli + Vue2模版'
  },
  'vue-cli-vue3': {
    url: 'https://github.com/mapengfei47/tml-vue-cli-vue3',
    downloadUrl: 'https://github.com:mapengfei47/tml-vue-cli-vue2#main',
    description: 'Vue-cli + Vue3模版'
  },
  'vite-vue2': {
    url: 'https://github.com/mapengfei47/tml-vite-vue2',
    downloadUrl: 'https://github.com:mapengfei47/tml-vite-vue2#main',
    description: 'Vite + Vue2模版'
  },
  'vite-vue3': {
    url: 'https://github.com/mapengfei47/tml-vite-vue3',
    downloadUrl: 'https://github.com:mapengfei47/tml-vite-vue3#main',
    description: 'Vite + Vue3模版'
  },
}

// 1. 获取用户输入命令
// 原生获取命令行参数的方式
// console.log(process.argv)

// 2. 根据不同的命令执行不同的功能
program
  .version('0.1.0') // -v 或者 --version 的时候输出版本号

program
  .command('init <templateName> <projectName>')
  .description('初始化项目模版')
  .action(function(templateName,projectName){
    // 根据模版名下载对应的模版到本地并起名未对应的项目名称
    // 下载之前做loading提示
    const spinner = ora('正在下载模版...').start()

    const { downloadUrl }  =  templates[templateName]
    download(downloadUrl,projectName ,{ clone: true }, (err) => {
      if(err){
        spinner.fail()  // 下载失败提示
        console.log(logSymbols.error, chalk.red('初始化模版失败！'))
        return
      }
        spinner.succeed() // 下载成功提示
        // 把项目下的 package.json 文件读出来
        // 使用向导的方式采集用户输入的值
        // 使用模版引擎把用户输入的数据解析到 package.json 文件中
        // 解析完毕，把解析之后的结果重新写入 package.json 文件中

        inquirer.prompt([{
          type: 'input',
          name: 'name',
          message: '请输入项目名称'
        },
        {
          type: 'input',
          name: 'description',
          message: '请输入项目简介'
        },
        {
          type: 'input',
          name: 'author',
          message: '请输入作者名称'
        }]).then(answer => {
          console.log(answer)
          // 把采集到到用户数据解析替换到 package.json 中去
          const packagePath = `${projectName}/package.json`
          const packageContent = fs.readFileSync(packagePath,'utf8')
          const packageResult = handlebar.compile(packageContent)(answer)
          fs.writeFileSync(packagePath,packageResult)
          console.log(logSymbols.success ,chalk.yellow('初始化模版成功！'))
        })

    })
  })

program
  .command('list')
  .description('查看所有可用模版')
  .action(() => {
    for (const key in templates) {
        console.log(
          `${key} ${templates[key].description}`
        )
      }
    })

  program.parse(process.argv)

