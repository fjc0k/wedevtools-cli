import fs from 'fs-extra'
import tmp from 'tmp-promise'
import { formatDate } from 'vtils'
import { invoke, readPackageJson } from './utils'

/**
 * 打开项目。
 */
export function open(
  params: {
    /**
     * 项目根目录。
     *
     * @default process.cwd()
     */
    projectRoot?: string,
  } = {},
) {
  params.projectRoot = params.projectRoot || process.cwd()
  if (!fs.existsSync(params.projectRoot)) {
    return Promise.reject(new Error('projectRoot 不存在。'))
  }
  return invoke('open', {
    projectRoot: params.projectRoot!,
  })
}

/**
 * 上传代码。
 *
 * @returns 本次上传的额外信息
 */
export function upload(
  params: {
    /**
     * 项目根目录。
     *
     * @default process.cwd()
     */
    projectRoot?: string,
    /**
     * 版本号。
     *
     * @default require(`${projectRoot}/package.json`).version || formatDate(new Date(), 'yyyy.mm.dd.hh.ii.ss')
     */
    version?: string,
    /**
     * 备注。
     *
     * @default '更新'
     */
    message?: string,
  } = {},
): Promise<{
  /** 代码包大小 */
  size: {
    /** 总大小，单位：KB */
    total: number,
    /** 分包列表 */
    packages: Array<{
      /** 分包名称 */
      name: string,
      /** 分包大小，单位：KB */
      size: number,
    }>,
  },
}> {
  params.projectRoot = params.projectRoot || process.cwd()
  params.message = params.message || '更新'
  params.version = (
    params.version
      || readPackageJson(params.projectRoot).version
      || formatDate(new Date(), 'yyyy.mm.dd.hh.ii.ss')
  )
  if (!fs.existsSync(params.projectRoot)) {
    return Promise.reject(new Error('projectRoot 不存在。'))
  }
  if (params.version.includes('@')) {
    return Promise.reject(new Error('version 不能包含 @ 字符。'))
  }
  return tmp.withFile(file => {
    return invoke('upload', {
      projectRoot: `${params.version}@${params.projectRoot}`,
      uploadDesc: params.message!,
      uploadInfoOutput: file.path,
    }).then(() => {
      return fs.readJSONSync(file.path)
    })
  })
}
