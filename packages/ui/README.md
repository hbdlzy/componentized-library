# @hbdlzy/ui

`@hbdlzy/ui` 是组件库的统一安装入口包。

## 适用场景

- 希望业务项目只安装一个包
- 希望后续新增组件时不再增加安装命令
- 希望统一从一个入口导入组件和工具

## 安装

```bash
npm install @hbdlzy/ui
```

## 使用方式

```ts
import { BaseExportButton, companyTokens } from '@hbdlzy/ui'
```

## 说明

- 该包内部依赖 `@hbdlzy/tokens`、`@hbdlzy/ui-core`、`@hbdlzy/ui-energy`
- 导入 `@hbdlzy/ui` 时会自动加载设计变量样式
