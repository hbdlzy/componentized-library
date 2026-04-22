# Vue Vite npmjs Consumer Template

这是一个给业务项目使用的 npmjs 接入模板。

## 使用方法

1. 将当前目录下的 [package.json](./package.json) 中的依赖项合并到业务项目自己的 `package.json`
2. 执行 `npm install` 或 `pnpm install`

## 最小接入示例

```ts
import '@hbdlzy/ui/style.css'
import { BaseTable } from '@hbdlzy/ui'
```

## 说明

- 这个模板适用于已经发布到 npmjs 的版本
- 公开包安装时不再需要项目级 `.npmrc`
- 推荐统一安装 `@hbdlzy/ui`
- 推荐在应用入口显式导入 `@hbdlzy/ui/style.css`
