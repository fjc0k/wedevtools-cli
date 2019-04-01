#!/usr/bin/env node
import * as devtools from '.'
import cli from 'commander'
import consola from 'consola'

cli
  .version(require('../package.json').version)

cli
  .command('open [projectRoot]')
  .description('打开项目，默认打开当前项目')
  .action((projectRoot: string) => {
    consola.start('打开项目中...')
    devtools
      .open({ projectRoot })
      .then(() => {
        consola.success('已打开项目')
      })
      .catch(consola.error)
  })

cli
  .command('upload [projectRoot]')
  .description('上传代码，默认上传当前项目')
  .option('-v, --version [version]', '版本号，默认值：项目根目录下 package.json 里 version 字段的值，若 package.json 不存在，则根据当前时间自动生成')
  .option('-m, --message [message]', '备注，默认值：更新')
  .action((projectRoot: string, { version, message }: Record<string, string | undefined>) => {
    version = typeof version === 'string' ? version : undefined
    consola.start('上传代码中...')
    devtools.upload({
      projectRoot,
      version,
      message,
    })
      .then(res => {
        consola.success('代码上传完成')
        consola.info(`代码包总大小：${res.size.total} KB`)
      })
      .catch(consola.error)
  })

cli
  .parse(process.argv)
