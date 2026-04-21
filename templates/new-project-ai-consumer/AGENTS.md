# Component Library Reading Rules

当项目已安装 `@hbdlzy/ui` 时，开始任何页面开发前必须先读取：

- `node_modules/@hbdlzy/ui/AI-USAGE.md`

读取后必须继续：

1. 读取同目录下的 `package.manifest.json`
2. 按 `package.manifest.json` 中的 `aiReadOrder` 继续读取
3. 建立当前组件和工具清单

读取后必须遵守：

1. 优先复用 `@hbdlzy/ui` 的现有组件和工具，不要重复实现相同能力。
2. 页面图表优先使用 `BaseEChart`，不要重复写 `echarts.init`、`resize`、`dispose`。
3. 导出按钮优先使用 `BaseExportButton`，不要重复写导出 loading 和下载逻辑。
4. 需要渐变色或图形工具时，优先使用 `@hbdlzy/ui` 导出的 `echarts`。
5. 需要样式变量时，优先使用 `companyTokens`。
6. 只有在现有组件无法满足需求时，才新增公共组件。

推荐统一导入方式：

```ts
import { BaseEChart, BaseExportButton, companyTokens, echarts } from '@hbdlzy/ui'
```
