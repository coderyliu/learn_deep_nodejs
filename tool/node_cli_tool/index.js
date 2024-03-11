#!/usr/bin/env node

const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// console.log(process.platform)//win32

// 模块定义的版本号
program.version(require('./package.json').version)

// 添加其他的选项，帮助选项
helpOptions()

// 创建其它指令
createCommands()

program.parse(process.argV)