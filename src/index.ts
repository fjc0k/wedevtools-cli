import tmp from 'tmp-promise'
import fs from 'fs-extra'
import { invoke } from './utils'

/**
 * 打开开发者工具。
 *
 * @param [projectRoot=process.cwd()] 项目目录，默认当前目录
 * @returns Promise<any>
 */
export function open(projectRoot: string = process.cwd()): Promise<any> {
  return invoke({
    type: 'open',
    data: { projectRoot },
  })
}

/**
 * 上传代码。
 *
 * @param version 版本
 * @param message 版本备注
 * @param [projectRoot=process.cwd()] 项目目录，默认当前目录
 * @returns Promise<any>
 */
export function upload(version: string, message: string, projectRoot: string = process.cwd()): Promise<any> {
  return tmp.withFile(file => {
    return invoke({
      type: 'upload',
      data: {
        projectRoot: `${version}@${projectRoot}`,
        uploadDesc: message,
        uploadInfoOutput: file.path,
      },
    }).then(() => {
      return fs.readJSONSync(file.path)
    })
  })
}

open('D:\\__projects__\\__timeline__\\orion')
