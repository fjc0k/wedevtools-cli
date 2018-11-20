import { execSync } from 'child_process'
import { paramCase } from 'change-case'
import findCli from './findCli'

export interface InvokeData {
  /** 启动 */
  open: {
    /** 要打开的项目的绝对路径 */
    '': string,
  },
  /** 登录 */
  login: {
    /** 格式：[format[@path]]，指定二维码输出形式，format 可选值包括 terminal（命令行输出）, base64, image。如果有填 path，表示结果输出到指定路径的文件中。如果没填 path，表示将结果输出到命令行。不使用此选项或使用了但没有填 format 的话则默认为命令行打印 */
    loginQrOutput: string,
    /** 输出登录结果到指定文件 */
    loginResultOutput: string,
  },
  /** 预览 */
  preview: {
    /** 项目根路径 */
    '': string,
    /** 格式：[format[@path]]，指定二维码输出形式，format 可选值包括 terminal（命令行输出）, base64, image。如果有填 path，表示结果输出到指定路径的文件中。如果没填 path，表示将结果输出到命令行。不使用此选项或使用了但没有填 format 的话则默认为命令行打印 */
    previewQrOutput: string,
    /** 指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息 */
    previewInfoOutput: string,
    /** 这是一个 json 字符串，以指定自定义编译条件，json 条件可指定两个字段，pathName 表示打开的页面，不填表示首页，query 表示页面参数 */
    compileCondition: string,
  },
  /** 上传 */
  upload: {
    /** 格式：version@project_root。version 指定版本号，project_root 指定项目根路径 */
    '': string,
    /** 上传代码时的备注 */
    uploadDesc: string,
    /** 指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息 */
    uploadInfoOutput: string,
  },
  /** 构建 npm */
  buildNpm: {
    /** 项目根目录 */
    '': string,
    /** 手动指定编译类型，用于指定走 miniprogramRoot 还是 pluginRoot，优先级比 project.config.json 中的高 */
    buildNpmCompileType: 'miniprogram' | 'plugin',
  },
  /** 自动化测试 */
  test: {
    /** 项目根目录 */
    '': string,
  },
}

export default function invoke<T extends keyof InvokeData>(options: { type: T, data: InvokeData[T] }): any {
  findCli()
    .then(cli => {
      const value = (options.data as any)['']
      execSync([
        `"${cli}"`,
        `--${paramCase(options.type)}${value ? ` "${value}"` : ''}`,
        ...Object.keys(options.data).reduce((res, key) => {
          if (key !== '') {
            res.push(`--${paramCase(key)} "${(options.data as any)[key]}"`)
          }
          return res
        }, []),
      ].join(' '))
    })
    .catch((e: Error) => {
      throw e
    })
}

invoke({
  type: 'open',
  data: {
    '': '',
  },
})
