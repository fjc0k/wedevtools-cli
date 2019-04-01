# wedevtools-cli

微信开发者工具的命令行调用。

## 安装

```bash
# yarn
yarn add wedevtools-cli -D

# 或，npm
npm i wedevtools-cli -D
```

## 使用

- **`wedevtools open [projectRoot]`**: 打开项目。

  - **`projectRoot`**: 要打开的项目目录，默认当前项目。

- **`wedevtools upload [projectRoot] [options]`**: 上传代码。

  - **`projectRoot`**: 要打开的项目目录，默认当前项目。

  - **`options`**:

    - **`-v, --version [version]`**: 版本号，默认值：项目根目录下 package.json 里 version 字段的值，若 package.json 不存在，则根据当前时间自动生成。

    - **`-m, --message [message]`**: 备注，默认值：更新。

## 许可

MIT
