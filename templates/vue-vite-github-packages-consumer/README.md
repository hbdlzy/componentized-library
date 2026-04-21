# Vue Vite GitHub Packages Consumer Template

这是一个给业务项目使用的 GitHub Packages 接入模板。

## 使用方法

1. 将当前目录下的 [package.json](./package.json) 中的依赖项合并到业务项目自己的 `package.json`
2. 将当前目录下的 [.npmrc.example](./.npmrc.example) 复制为业务项目根目录的 `.npmrc`
3. 将 `GITHUB_PACKAGES_TOKEN` 配置到本地环境变量或 CI 环境变量
4. 执行 `npm install` 或 `pnpm install`

## 说明

- 这个模板适用于已经发布到 GitHub Packages 的版本
- 如果包版本号升级，请同步更新依赖版本范围
- 推荐统一安装 `@hbdlzy/ui`
