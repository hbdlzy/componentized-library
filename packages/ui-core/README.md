# @hbdlzy/ui-core

`@hbdlzy/ui-core` 负责沉淀跨项目复用的基础 UI 组件和无业务依赖的前端工具。

## 当前内容

- `BaseExportButton`
- `exportExcel`

## 使用方式

```ts
import { BaseExportButton, exportExcel } from '@hbdlzy/ui-core'
```

## 设计原则

- 只做基础 UI 和交互
- 不直接依赖接口、路由、store
- 每个组件必须配套 README 和 AI manifest
