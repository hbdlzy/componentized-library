# @hbdlzy/ui-core

`@hbdlzy/ui-core` 负责沉淀跨项目复用的基础 UI 组件和无业务依赖的前端工具。

## 当前内容

- `BaseTable`
- `BaseCard`
- `BaseEChart`
- `BaseExportButton`
- `echarts`
- `exportExcel`

## 使用方式

```ts
import { BaseTable, BaseCard, BaseEChart, BaseExportButton, echarts, exportExcel } from '@hbdlzy/ui-core'
```

## 详细文档

- `BaseTable`: [src/components/BaseTable/README.md](./src/components/BaseTable/README.md)
- `BaseCard`: [src/components/BaseCard/README.md](./src/components/BaseCard/README.md)
- `BaseEChart`: [src/components/BaseEChart/README.md](./src/components/BaseEChart/README.md)
- `BaseExportButton`: [src/components/BaseExportButton/README.md](./src/components/BaseExportButton/README.md)
- AI 清单: [components.manifest.json](./components.manifest.json)

## 当前导出能力

- 组件
  - `BaseTable`
  - `BaseCard`
  - `BaseEChart`
  - `BaseExportButton`
- 工具
  - `echarts`
  - `exportExcel`

## 设计原则

- 只做基础 UI 和交互
- 不直接依赖接口、路由、store
- 每个组件必须配套 README 和 AI manifest
