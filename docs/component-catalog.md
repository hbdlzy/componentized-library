# Component Catalog

这个文档是当前组件库的人类总汇总入口，适合在接入新项目前快速浏览。

## 安装方式

推荐统一入口：

```bash
npm install @hbdlzy/ui
```

推荐导入：

```ts
import { BaseTable, BaseCard, BaseEChart, BaseExportButton, companyTokens, echarts } from '@hbdlzy/ui'
```

## 包分层

- `@hbdlzy/tokens`
  负责设计令牌和样式变量
- `@hbdlzy/ui-core`
  负责跨项目复用的基础组件和前端工具
- `@hbdlzy/ui-energy`
  负责储能业务域公共组件
- `@hbdlzy/ui`
  统一安装和统一导出入口

## 当前组件与工具汇总

### `@hbdlzy/tokens`

- 说明文档：[packages/tokens/README.md](../packages/tokens/README.md)
- 机器清单：[packages/tokens/package.manifest.json](../packages/tokens/package.manifest.json)
- 当前导出：
  - `companyTokens`
  - `@hbdlzy/tokens/theme.css`

### `@hbdlzy/ui-core`

- 说明文档：[packages/ui-core/README.md](../packages/ui-core/README.md)
- 机器清单：[packages/ui-core/components.manifest.json](../packages/ui-core/components.manifest.json)

当前组件：

- `BaseTable`
  详细文档：[packages/ui-core/src/components/BaseTable/README.md](../packages/ui-core/src/components/BaseTable/README.md)
  用途：统一封装分页、远程请求、勾选列、操作列和常见列渲染能力
- `BaseCard`
  详细文档：[packages/ui-core/src/components/BaseCard/README.md](../packages/ui-core/src/components/BaseCard/README.md)
  用途：统一封装卡片容器、标题区、右侧信息区和导出触发区
- `BaseEChart`
  详细文档：[packages/ui-core/src/components/BaseEChart/README.md](../packages/ui-core/src/components/BaseEChart/README.md)
  用途：统一封装 ECharts 的生命周期、自动 resize 和实例暴露
- `BaseExportButton`
  详细文档：[packages/ui-core/src/components/BaseExportButton/README.md](../packages/ui-core/src/components/BaseExportButton/README.md)
  用途：统一封装前端 Excel 导出和后端文件下载按钮

当前工具：

- `echarts`
  用途：统一导出的 echarts 对象，给页面层直接调用 `graphic` 等能力
- `exportExcel`
  用途：纯前端 Excel 导出工具

### `@hbdlzy/ui-energy`

- 说明文档：[packages/ui-energy/README.md](../packages/ui-energy/README.md)
- 机器清单：[packages/ui-energy/components.manifest.json](../packages/ui-energy/components.manifest.json)
- 当前状态：暂无已落地组件，保留储能业务域扩展位

### `@hbdlzy/ui`

- 说明文档：[packages/ui/README.md](../packages/ui/README.md)
- AI 指引：[packages/ui/AI-USAGE.md](../packages/ui/AI-USAGE.md)
- 机器清单：[packages/ui/package.manifest.json](../packages/ui/package.manifest.json)
- 用途：统一安装、统一导出、统一给 AI 读取

## 后续新增组件时的模板入口

- 编写规范：[component-authoring-guide.md](./component-authoring-guide.md)
- README 模板：[../templates/component-authoring/README.template.md](../templates/component-authoring/README.template.md)
- manifest 条目模板：[../templates/component-authoring/component-manifest-item.template.json](../templates/component-authoring/component-manifest-item.template.json)
- 自检清单：[../templates/component-authoring/component-checklist.md](../templates/component-authoring/component-checklist.md)

## 推荐读取顺序

如果是人：

1. 先看 [packages/ui/README.md](../packages/ui/README.md)
2. 再看 [packages/ui-core/README.md](../packages/ui-core/README.md)
3. 最后按需看具体组件 README

如果是 AI：

1. 先读 [packages/ui/package.manifest.json](../packages/ui/package.manifest.json)
2. 再读 [packages/ui/AI-USAGE.md](../packages/ui/AI-USAGE.md)
3. 再读 `ui-core` 的 manifest 和组件 README
