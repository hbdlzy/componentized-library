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

### 全局注册所有组件

业务项目入口推荐这样接入，之后页面里可以直接写 `<BaseTable />`、`<BaseCard />`、`<OutlinedInput />` 等组件：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@hbdlzy/ui/style.css'
import HbdlUI from '@hbdlzy/ui'
import App from './App.vue'

createApp(App)
  .use(ElementPlus, { locale: zhCn })
  .use(HbdlUI)
  .mount('#app')
```

### 按需导入

页面或组合式函数里需要类型、工具或局部注册时，可以继续从统一入口导入：

```ts
import '@hbdlzy/ui/style.css'

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
  companyTokens,
  echarts
} from '@hbdlzy/ui'
```

导入 `@hbdlzy/ui` 后会自动为项目里的按钮启用点击涟漪效果，覆盖原生 `button`、Element Plus `el-button` 以及 radio/checkbox button 形态。局部不需要时，可在按钮或父级元素上添加 `data-hbdl-ripple="false"`。

## 全局点击涟漪

推荐业务项目在入口统一导入：

```ts
import '@hbdlzy/ui'
```

需要显式控制安装时机时，也可以按 Vue 插件使用：

```ts
import { createApp } from 'vue'
import { Ripple } from '@hbdlzy/ui/ripple'
import App from './App.vue'

createApp(App).use(Ripple).mount('#app')
```

## 当前聚合内容

- 设计令牌：`@hbdlzy/tokens`
- 基础组件：`@hbdlzy/ui-core`
- 业务域组件：`@hbdlzy/ui-energy`

## 当前可直接使用的组件与工具

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
- `companyTokens`
- `Ripple`
- `installRipple`
- `uninstallRipple`

## 详细文档入口

- 统一 AI 读取说明：[AI-USAGE.md](./AI-USAGE.md)
- 统一清单：[package.manifest.json](./package.manifest.json)
- `ui-core` 文档：[../ui-core/README.md](../ui-core/README.md)
- `BaseTable` 文档：[../ui-core/src/components/BaseTable/README.md](../ui-core/src/components/BaseTable/README.md)
- `BaseCard` 文档：[../ui-core/src/components/BaseCard/README.md](../ui-core/src/components/BaseCard/README.md)
- `BaseEChart` 文档：[../ui-core/src/components/BaseEChart/README.md](../ui-core/src/components/BaseEChart/README.md)
- `BaseExportButton` 文档：[../ui-core/src/components/BaseExportButton/README.md](../ui-core/src/components/BaseExportButton/README.md)
- `SvgIcon` 文档：[../ui-core/src/components/SvgIcon/README.md](../ui-core/src/components/SvgIcon/README.md)
- `OutlinedInput` 文档：[../ui-core/src/components/OutlinedInput/README.md](../ui-core/src/components/OutlinedInput/README.md)
- `OutlinedSelect` 文档：[../ui-core/src/components/OutlinedSelect/README.md](../ui-core/src/components/OutlinedSelect/README.md)
- `OutlinedDatePicker` 文档：[../ui-core/src/components/OutlinedDatePicker/README.md](../ui-core/src/components/OutlinedDatePicker/README.md)
- `OutlinedDateTimePicker` 文档：[../ui-core/src/components/OutlinedDateTimePicker/README.md](../ui-core/src/components/OutlinedDateTimePicker/README.md)
- `OutlinedTimePicker` 文档：[../ui-core/src/components/OutlinedTimePicker/README.md](../ui-core/src/components/OutlinedTimePicker/README.md)
- `OutlinedCascader` 文档：[../ui-core/src/components/OutlinedCascader/README.md](../ui-core/src/components/OutlinedCascader/README.md)
- `OutlinedTreeSelect` 文档：[../ui-core/src/components/OutlinedTreeSelect/README.md](../ui-core/src/components/OutlinedTreeSelect/README.md)
- `Ripple` 文档：[../ui-core/src/ripple/README.md](../ui-core/src/ripple/README.md)

## AI 使用指令

在新项目中，可以直接对 AI 使用这句固定指令：

```text
本项目使用 @hbdlzy/ui 组件库。开始实现前，请先读取 node_modules/@hbdlzy/ui/AI-USAGE.md，并按其中规则建立组件清单。后续优先复用已有公共组件和工具，新增页面默认从 @hbdlzy/ui 导入。
```

## 说明

- 该包内部依赖 `@hbdlzy/tokens`、`@hbdlzy/ui-core`、`@hbdlzy/ui-energy`
- 推荐在应用入口显式导入 `@hbdlzy/ui/style.css`，统一加载设计变量和基础组件样式
- 新项目中如果希望 AI 能稳定复用组件，优先让它先读 `package.manifest.json` 和 `AI-USAGE.md`
