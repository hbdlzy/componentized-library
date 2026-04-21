# Vue Vite Consumer Template

这是一个给业务项目使用的接入模板，用来避免团队成员反复手写很长的 `pnpm add` 命令。

## 适用场景

- 现有 Vue 3 + Vite 项目接入组件库
- 新建业务项目时直接复制依赖配置
- 当前阶段只通过 Gitee Git 仓库分发公共包

## 使用方法

1. 将当前目录下的 [package.json](./package.json) 里的依赖项合并到业务项目自己的 `package.json`
2. 保留业务项目原有的名称、脚本和其他依赖
3. 执行 `pnpm install`

## 最小接入示例

```ts
import '@hbdlzy/tokens'
import { BaseExportButton } from '@hbdlzy/ui-core'
```

## 说明

- 这里使用的是 Gitee Git 子目录依赖
- 如果后续切到 npm 兼容仓库，可以把这些 Git 地址替换成正常版本号
