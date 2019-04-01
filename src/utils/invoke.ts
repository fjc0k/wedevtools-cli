import { execSync } from 'child_process'
import { findCliPath } from './findCliPath'
import { paramCase } from 'change-case'

export interface CommandParams {
  /** 打开项目 */
  open: {
    /** 要打开的项目的绝对路径 */
    projectRoot: string,
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
    projectRoot: string,
    /** 格式：[format[@path]]，指定二维码输出形式，format 可选值包括 terminal（命令行输出）, base64, image。如果有填 path，表示结果输出到指定路径的文件中。如果没填 path，表示将结果输出到命令行。不使用此选项或使用了但没有填 format 的话则默认为命令行打印 */
    previewQrOutput: string,
    /** 指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息 */
    previewInfoOutput: string,
    /** 这是一个 json 字符串，以指定自定义编译条件，json 条件可指定两个字段，pathName 表示打开的页面，不填表示首页，query 表示页面参数 */
    compileCondition: string,
  },
  /** 自动预览 */
  autoPreview: {
    /** 指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。 */
    autoPreviewInfoOutput: string,
  },
  /** 上传 */
  upload: {
    /** 格式：version@project_root。version 指定版本号，project_root 指定项目根路径 */
    projectRoot: string,
    /** 上传代码时的备注 */
    uploadDesc: string,
    /** 指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息 */
    uploadInfoOutput: string,
  },
  /** 构建 npm */
  buildNpm: {
    /** 项目根目录 */
    projectRoot: string,
    /** 手动指定编译类型，用于指定走 miniprogramRoot 还是 pluginRoot，优先级比 project.config.json 中的高 */
    buildNpmCompileType: 'miniprogram' | 'plugin',
  },
  /** 自动化测试 */
  test: {
    /** 项目根目录 */
    projectRoot: string,
  },
  /** 关闭当前项目窗口 */
  close: {
    /** 项目根目录 */
    projectRoot: string,
  },
  /** 关闭开发者工具 */
  quit: never,
}

export type CommandName = keyof CommandParams

export function invoke<T extends CommandName>(commandName: T, params: CommandParams[T]): Promise<any> {
  return findCliPath().then(cliPath => {
    const { projectRoot } = params as any
    execSync(
      [
        `"${cliPath}"`,
        `--${paramCase(commandName)}${projectRoot ? ` "${projectRoot}"` : ''}`,
        ...Object.keys(params).reduce<string[]>(
          (cmd, key) => {
            const value = (params as any)[key]
            if (key !== 'projectRoot' && value != null) {
              cmd.push(`--${paramCase(key)} "${value}"`)
            }
            return cmd
          },
          [],
        ),
      ].join(' '),
    )
  })
}
