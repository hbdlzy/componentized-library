# @hbdlzy/ui-core

`@hbdlzy/ui-core` 负责沉淀跨项目复用的基础 UI 组件和无业务依赖的前端工具。

## 当前内容

- `BaseTable`
- `BaseCard`
- `BaseEChart`
- `BaseExportButton`
- `SvgIcon`
- `OutlinedInput`
- `OutlinedSelect`
- `OutlinedDatePicker`
- `OutlinedDateTimePicker`
- `OutlinedTimePicker`
- `OutlinedCascader`
- `OutlinedTreeSelect`
- `echarts`
- `exportExcel`
- `Ripple`
- 全局点击涟漪：导入包入口后自动启用，覆盖原生 `button`、Element Plus `el-button` 以及 radio/checkbox button 形态

## 使用方式

### 全局注册

只使用核心包时，可以按 Vue 插件注册所有 `ui-core` 组件：

```ts
import { createApp } from 'vue'
import HbdlUICore from '@hbdlzy/ui-core'
import App from './App.vue'

createApp(App).use(HbdlUICore).mount('#app')
```

### 按需导入

```ts
import {
  BaseTable,
  BaseCard,
  BaseEChart,
  BaseExportButton,
  SvgIcon,
  OutlinedInput,
  OutlinedSelect,
  OutlinedDatePicker,
  OutlinedDateTimePicker,
  OutlinedTimePicker,
  OutlinedCascader,
  OutlinedTreeSelect,
  Ripple,
  installRipple,
  uninstallRipple,
  echarts,
  exportExcel
} from '@hbdlzy/ui-core'
```

全局点击涟漪会在导入 `@hbdlzy/ui-core` 时自动安装；如某个按钮不需要水波纹，可在按钮或父级元素上添加 `data-hbdl-ripple="false"`。

如果业务项目希望显式控制安装时机，也可以使用插件或细粒度入口：

```ts
import { createApp } from 'vue'
import { Ripple } from '@hbdlzy/ui-core/ripple'
import App from './App.vue'

createApp(App).use(Ripple).mount('#app')
```

## 详细文档

- `Ripple`: [src/ripple/README.md](./src/ripple/README.md)
- `BaseTable`: [src/components/BaseTable/README.md](./src/components/BaseTable/README.md)
- `BaseCard`: [src/components/BaseCard/README.md](./src/components/BaseCard/README.md)
- `BaseEChart`: [src/components/BaseEChart/README.md](./src/components/BaseEChart/README.md)
- `BaseExportButton`: [src/components/BaseExportButton/README.md](./src/components/BaseExportButton/README.md)
- `SvgIcon`: [src/components/SvgIcon/README.md](./src/components/SvgIcon/README.md)
- `OutlinedInput`: [src/components/OutlinedInput/README.md](./src/components/OutlinedInput/README.md)
- `OutlinedSelect`: [src/components/OutlinedSelect/README.md](./src/components/OutlinedSelect/README.md)
- `OutlinedDatePicker`: [src/components/OutlinedDatePicker/README.md](./src/components/OutlinedDatePicker/README.md)
- `OutlinedDateTimePicker`: [src/components/OutlinedDateTimePicker/README.md](./src/components/OutlinedDateTimePicker/README.md)
- `OutlinedTimePicker`: [src/components/OutlinedTimePicker/README.md](./src/components/OutlinedTimePicker/README.md)
- `OutlinedCascader`: [src/components/OutlinedCascader/README.md](./src/components/OutlinedCascader/README.md)
- `OutlinedTreeSelect`: [src/components/OutlinedTreeSelect/README.md](./src/components/OutlinedTreeSelect/README.md)
- AI 清单: [components.manifest.json](./components.manifest.json)

## 当前导出能力

- 组件
  - `BaseTable`
  - `BaseCard`
  - `BaseEChart`
  - `BaseExportButton`
  - `SvgIcon`
  - `OutlinedInput`
  - `OutlinedSelect`
  - `OutlinedDatePicker`
  - `OutlinedDateTimePicker`
  - `OutlinedTimePicker`
  - `OutlinedCascader`
  - `OutlinedTreeSelect`
- 工具
  - `echarts`
  - `exportExcel`
  - `Ripple`
  - `installRipple`
  - `uninstallRipple`

## 设计原则

- 只做基础 UI 和交互
- 不直接依赖接口、路由、store
- 每个组件必须配套 README 和 AI manifest
