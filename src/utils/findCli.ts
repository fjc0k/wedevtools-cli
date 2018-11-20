import { execSync } from 'child_process'
import fs from 'fs-extra'
import Registry from 'winreg'

export default function findCli(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    switch (process.platform) {
      case 'win32':
        execSync('chcp 65001')
        new Registry({
          hive: Registry.HKLM,
          key: '\\SOFTWARE\\Wow6432Node\\Tencent\\微信web开发者工具',
        })
          .values((err, items) => {
            if (!err && items && items[0] && items[0].value) {
              resolve(items[0].value)
            } else {
              reject(new Error('请先安装微信web开发者工具。'))
            }
          })
        break
      case 'darwin':
        resolve('/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli')
        break
      default:
        reject(new Error('当前环境不支持本工具。'))
        break
    }
  }).then(cli => {
    if (!fs.existsSync(cli)) {
      return Promise.reject(new Error('请先安装微信web开发者工具。'))
    }
    return Promise.resolve(cli)
  })
}
