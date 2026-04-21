# AI Usage Guide

这个文件是安装了 `@hbdlzy/ui` 的项目里，给 AI 读取组件库的唯一入口文件。

## 你应该怎么使用这个文件

在新项目里，不需要再让 AI 手动读取一长串文件。
只需要让 AI 先读取这一个文件：

```text
node_modules/@hbdlzy/ui/AI-USAGE.md
```

然后 AI 必须继续执行：

1. 读取同目录下的 `package.manifest.json`
2. 按 `package.manifest.json` 里的 `aiReadOrder` 继续读取其他文档
3. 建立当前公共组件、工具和导入方式清单
4. 后续实现时优先复用现有组件，不要重复实现相同能力

## 单文件入口规则

以后无论组件库新增多少组件，你给 AI 的外部指令都尽量保持不变。
只保留这句就够了：

```text
本项目使用 @hbdlzy/ui 组件库。开始实现前，请先读取 node_modules/@hbdlzy/ui/AI-USAGE.md，并按其中规则建立组件清单。后续优先复用已有公共组件和工具，新增页面默认从 @hbdlzy/ui 导入。
```

## 读取完成后的工作方式

- 先建立“已存在组件/工具”清单
- 新增页面或功能时，优先判断是否可以使用：
  - `BaseTable`
  - `BaseCard`
  - `BaseEChart`
  - `BaseExportButton`
  - `echarts`
  - `exportExcel`
  - `companyTokens`
- 只有当现有组件无法满足需求时，才考虑新增公共组件

## 导入约定

优先统一从 `@hbdlzy/ui` 导入：

```ts
import { BaseTable, BaseCard, BaseEChart, BaseExportButton, companyTokens, echarts } from '@hbdlzy/ui'
```

## 复用规则

- 不要在页面里重复写通用表格的分页、操作列、远程请求承接和勾选暴露逻辑，优先使用 `BaseTable`
- 不要在页面里重复写 ECharts 初始化、resize、dispose 逻辑，优先使用 `BaseEChart`
- 不要在页面里重复写卡片外层容器、标题区、右侧时间和导出触发区，优先使用 `BaseCard`
- 不要在页面里重复写导出按钮 loading、成功失败提示和文件下载逻辑，优先使用 `BaseExportButton`
- 需要渐变色、图形工具时，优先使用统一导出的 `echarts`
- 需要主题变量时，优先使用 `companyTokens`

## 维护组件库时

如果当前任务不是用组件，而是新增组件或维护组件库，请继续读取：

- `../docs/component-authoring-guide.md`
- `../templates/component-authoring/README.template.md`
- `../templates/component-authoring/component-manifest-item.template.json`
- `../templates/component-authoring/component-checklist.md`
