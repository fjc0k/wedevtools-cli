import fs from 'fs-extra'
import path from 'path'

export function readPackageJson(projectRoot: string = process.cwd()): { name?: string, version?: string } {
  const packageJsonPath = path.join(projectRoot, 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    return fs.readJSONSync(packageJsonPath)
  }
  return {}
}
