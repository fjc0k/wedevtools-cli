import regedit from 'regedit'

const getRegValue = (path: string): Promise<any> => {
  return new Promise(resolve => {
    try {
      regedit.list(path, (err, result) => {
        resolve(err ? null : result[path].values)
      })
    } catch (e) {
      resolve()
    }
  })
}

Promise.all([
  'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\微信web开发者工具',
  'HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\微信web开发者工具'
].map(getRegValue)).then(values => {
  const value = values.filter(value => !!value)[0]
  console.log('====>', value.UninstallString.value)
})